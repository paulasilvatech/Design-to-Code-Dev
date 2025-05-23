// Design-to-Code Workshop - Azure AI Design Analyzer Template
// This TypeScript class implements the AI-powered design analysis functionality

import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { DocumentAnalysisClient } from '@azure/ai-form-recognizer';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { ApiKeyCredentials } from '@azure/ms-rest-js';
import { azureConfig, AzureAIConfig } from './azure-ai-config';

export interface DesignAnalysisResult {
  visual: {
    objects: any[];
    colors: any;
    tags: string[];
    ui: any;
    confidence: number;
  };
  layout: {
    structure: any;
    grid: any;
    hierarchy: any;
    confidence: number;
  };
  semantic: {
    intent: string;
    components: any[];
    relationships: any[];
    suggestions: string[];
    confidence: number;
  };
  metadata: {
    timestamp: string;
    processingTime: number;
    imageFormat: string;
    dimensions: { width: number; height: number };
  };
}

export interface ComponentDefinition {
  type: string;
  name: string;
  properties: Record<string, any>;
  styles: Record<string, any>;
  children?: ComponentDefinition[];
  position: { x: number; y: number; width: number; height: number };
}

export interface ImageData {
  buffer: Buffer;
  format: string;
  width: number;
  height: number;
}

export class AzureAIDesignAnalyzer {
  private visionClient: ComputerVisionClient;
  private formClient: DocumentAnalysisClient;
  private openaiClient: OpenAIClient;
  private config: AzureAIConfig;

  constructor() {
    this.initializeClients();
  }

  /**
   * Initialize Azure AI service clients
   */
  private async initializeClients(): Promise<void> {
    const config = await azureConfig.getConfig();
    this.config = config;
    
    // Initialize Computer Vision
    this.visionClient = new ComputerVisionClient(
      new ApiKeyCredentials({ 
        inHeader: { 'Ocp-Apim-Subscription-Key': config.computerVision.key } 
      }),
      config.computerVision.endpoint
    );
    
    // Initialize Form Recognizer
    this.formClient = new DocumentAnalysisClient(
      config.formRecognizer.endpoint,
      new AzureKeyCredential(config.formRecognizer.key)
    );
    
    // Initialize OpenAI
    if (config.openai.endpoint) {
      // Azure OpenAI
      this.openaiClient = new OpenAIClient(
        config.openai.endpoint,
        new AzureKeyCredential(config.openai.key)
      );
    } else {
      // Regular OpenAI API
      this.openaiClient = new OpenAIClient(config.openai.key);
    }
  }

  /**
   * Analyze a design image and return comprehensive analysis
   */
  public async analyzeDesign(imageData: ImageData): Promise<DesignAnalysisResult> {
    const startTime = Date.now();
    
    console.log('🔍 Starting comprehensive design analysis...');
    
    try {
      // Run all analyses in parallel for better performance
      const [visualAnalysis, layoutAnalysis, semanticAnalysis] = await Promise.all([
        this.runComputerVisionAnalysis(imageData),
        this.runLayoutAnalysis(imageData),
        this.runSemanticAnalysis(imageData),
      ]);

      const processingTime = Date.now() - startTime;

      const result: DesignAnalysisResult = {
        visual: visualAnalysis,
        layout: layoutAnalysis,
        semantic: semanticAnalysis,
        metadata: {
          timestamp: new Date().toISOString(),
          processingTime,
          imageFormat: imageData.format,
          dimensions: { width: imageData.width, height: imageData.height },
        },
      };

      console.log(`✅ Analysis completed in ${processingTime}ms`);
      return result;
      
    } catch (error) {
      console.error('❌ Analysis failed:', error);
      throw new Error(`Design analysis failed: ${error.message}`);
    }
  }

  /**
   * Convert image buffer to stream for Azure services
   */
  private bufferToStream(buffer: Buffer): NodeJS.ReadableStream {
    const { Readable } = require('stream');
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  /**
   * Prepare image data from various input formats
   */
  public prepareImageData(input: Buffer | string, format: string = 'png'): ImageData {
    let buffer: Buffer;
    
    if (typeof input === 'string') {
      // Convert base64 or file path to buffer
      if (input.startsWith('data:')) {
        // Base64 data URL
        const base64Data = input.split(',')[1];
        buffer = Buffer.from(base64Data, 'base64');
      } else {
        // File path
        const fs = require('fs');
        buffer = fs.readFileSync(input);
      }
    } else {
      buffer = input;
    }

    // TODO: Extract actual dimensions from image
    // For now, using placeholder values
    return {
      buffer,
      format,
      width: 1200,
      height: 800,
    };
  }
  
  /**
   * Run Computer Vision analysis
   */
  private async runComputerVisionAnalysis(imageData: ImageData): Promise<any> {
    console.log('  📸 Running Computer Vision analysis...');
    
    try {
      const result = await this.visionClient.analyzeImageInStream(
        this.bufferToStream(imageData.buffer),
        {
          visualFeatures: [
            'Objects',
            'Tags',
            'Color',
            'Categories',
          ],
        }
      );

      // Extract UI-specific insights
      const uiAnalysis = this.extractUIInsights(result);

      return {
        objects: result.objects || [],
        colors: result.color,
        tags: result.tags?.map(tag => tag.name) || [],
        ui: uiAnalysis,
        confidence: result.metadata?.confidence || 0.8
      };
      
    } catch (error) {
      console.error('Computer Vision error:', error);
      return this.getDefaultVisionAnalysis();
    }
  }
  
  /**
   * Run Form Recognizer for layout analysis
   */
  private async runLayoutAnalysis(imageData: ImageData): Promise<any> {
    console.log('  📐 Running layout analysis...');
    
    try {
      const poller = await this.formClient.beginAnalyzeDocument(
        'prebuilt-layout',
        this.bufferToStream(imageData.buffer)
      );
      
      const result = await poller.pollUntilDone();
      
      // Extract layout structure
      const layoutStructure = this.extractLayoutStructure(result);

      return {
        structure: layoutStructure,
        confidence: 0.85
      };
      
    } catch (error) {
      console.error('Form Recognizer error:', error);
      return this.getDefaultLayoutAnalysis();
    }
  }
  
  /**
   * Run semantic analysis using GPT-4 Vision
   */
  private async runSemanticAnalysis(imageData: ImageData): Promise<any> {
    console.log('  🧠 Running semantic analysis...');
    
    try {
      const base64Image = imageData.buffer.toString('base64');
      const imageUrl = `data:image/${imageData.format};base64,${base64Image}`;

      const prompt = `Analyze this UI design image and provide:
1. Overall design intent and purpose
2. List of UI components identified
3. Component relationships and hierarchy
4. Design pattern suggestions
5. Accessibility considerations

Respond in JSON format with these fields:
{
  "intent": "description of design purpose",
  "components": [{"type": "button", "name": "primary-cta", "properties": {...}}],
  "relationships": [{"parent": "container", "child": "button", "relationship": "contains"}],
  "suggestions": ["improvement suggestions"]
}`;

      const response = await this.openaiClient.getChatCompletions(
        this.config.openai.deploymentName,
        [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', imageUrl: { url: imageUrl } }
            ]
          }
        ],
        {
          maxTokens: 1000,
          temperature: 0.3,
        }
      );

      const content = response.choices[0]?.message?.content;
      if (content) {
        try {
          const parsed = JSON.parse(content);
          return { ...parsed, confidence: 0.9 };
        } catch {
          // Fallback if JSON parsing fails
          return this.parseSemanticResponse(content);
        }
      }
      
      return this.getDefaultGPTAnalysis();
      
    } catch (error) {
      console.error('GPT-4 Vision error:', error);
      return this.getDefaultGPTAnalysis();
    }
  }
  
  /**
   * Extract UI-specific insights from Computer Vision results
   */
  private extractUIInsights(visionResult: any): any {
    const insights = {
      elements: [],
      patterns: [],
      colorScheme: null,
    };

    // Analyze objects for UI elements
    if (visionResult.objects) {
      visionResult.objects.forEach(obj => {
        if (this.isUIElement(obj.object)) {
          insights.elements.push(this.mapToUIElement(obj));
        }
      });
    }

    // Analyze color scheme
    if (visionResult.color) {
      insights.colorScheme = {
        dominant: visionResult.color.dominantColorForeground,
        background: visionResult.color.dominantColorBackground,
        accent: visionResult.color.accentColor,
      };
    }

    return insights;
  }

  /**
   * Check if an object represents a UI element
   */
  private isUIElement(objectName: string): boolean {
    const uiElements = [
      'button', 'text', 'input', 'image', 'icon', 'menu', 'navigation',
      'card', 'container', 'form', 'list', 'table', 'chart'
    ];
    
    return uiElements.some(element => 
      objectName.toLowerCase().includes(element)
    );
  }

  /**
   * Map Computer Vision object to UI element
   */
  private mapToUIElement(obj: any): any {
    const rectangle = obj.rectangle;
    const type = this.inferUIElementType(obj.object);
    
    return {
      type,
      confidence: obj.confidence,
      bounds: rectangle,
      properties: this.inferProperties(type, rectangle)
    };
  }

  /**
   * Infer UI element type from object name
   */
  private inferUIElementType(objectName: string): string {
    const name = objectName.toLowerCase();
    
    if (name.includes('button')) return 'button';
    if (name.includes('text')) return 'text';
    if (name.includes('input') || name.includes('field')) return 'input';
    if (name.includes('image') || name.includes('picture')) return 'image';
    if (name.includes('icon')) return 'icon';
    if (name.includes('menu') || name.includes('navigation')) return 'navigation';
    if (name.includes('card')) return 'card';
    if (name.includes('container') || name.includes('box')) return 'container';
    
    return 'unknown';
  }

  /**
   * Infer properties based on element type and position
   */
  private inferProperties(type: string, rectangle: any): Record<string, any> {
    const width = rectangle.w;
    const height = rectangle.h;
    const aspectRatio = width / height;

    const properties: Record<string, any> = {
      width,
      height,
      aspectRatio,
    };

    switch (type) {
      case 'button':
        properties.size = this.inferButtonSize(width, height);
        properties.style = aspectRatio > 2 ? 'wide' : 'compact';
        break;
      case 'text':
        properties.size = this.inferTextSize(height);
        properties.type = aspectRatio > 10 ? 'heading' : 'body';
        break;
      case 'input':
        properties.type = aspectRatio > 3 ? 'text' : 'textarea';
        break;
    }

    return properties;
  }

  /**
   * Extract layout structure from Form Recognizer results
   */
  private extractLayoutStructure(formResult: any): any {
    const structure = {
      type: 'unknown' as any,
      grid: null as any,
      hierarchy: [] as any[],
      regions: [] as any[],
    };

    if (formResult.pages && formResult.pages.length > 0) {
      const page = formResult.pages[0];
      
      // Extract text regions and infer layout
      if (page.lines) {
        structure.regions = page.lines.map(line => ({
          content: line.content,
          polygon: line.polygon,
          confidence: line.confidence,
        }));
        
        // Infer grid structure from text positioning
        structure.grid = this.inferGridStructure(page.lines);
        structure.type = this.inferLayoutType(structure.grid);
      }
    }

    return structure;
  }

  /**
   * Infer grid structure from text elements
   */
  private inferGridStructure(lines: any[]): any {
    // Group lines by approximate Y position to find rows
    const rows = this.groupLinesByRows(lines);
    
    // Analyze column structure
    const columns = this.analyzeColumnStructure(rows);
    
    return {
      rows: rows.length,
      columns: columns.length,
      columnWidths: columns,
      gridType: this.determineGridType(rows, columns),
    };
  }

  /**
   * Group text lines into rows based on Y position
   */
  private groupLinesByRows(lines: any[], threshold: number = 20): any[][] {
    const rows: any[][] = [];
    
    lines.forEach(line => {
      const y = line.polygon[0].y;
      const existingRow = rows.find(row => 
        Math.abs(row[0].polygon[0].y - y) < threshold
      );
      
      if (existingRow) {
        existingRow.push(line);
      } else {
        rows.push([line]);
      }
    });
    
    return rows.sort((a, b) => a[0].polygon[0].y - b[0].polygon[0].y);
  }

  /**
   * Analyze column structure from rows
   */
  private analyzeColumnStructure(rows: any[][]): number[] {
    if (rows.length === 0) return [];
    
    // Find the row with the most elements to determine column count
    const maxColumns = Math.max(...rows.map(row => row.length));
    
    // Calculate average column positions
    const columnPositions: number[] = [];
    for (let col = 0; col < maxColumns; col++) {
      const positions = rows
        .filter(row => row[col])
        .map(row => row[col].polygon[0].x);
      
      if (positions.length > 0) {
        columnPositions.push(
          positions.reduce((sum, pos) => sum + pos, 0) / positions.length
        );
      }
    }
    
    return columnPositions;
  }

  /**
   * Determine grid type based on structure
   */
  private determineGridType(rows: any[][], columns: number[]): string {
    if (columns.length === 1) return 'single-column';
    if (columns.length === 2) return 'two-column';
    if (columns.length >= 3) return 'multi-column';
    
    const avgRowLength = rows.reduce((sum, row) => sum + row.length, 0) / rows.length;
    if (avgRowLength > 3) return 'grid';
    
    return 'flow';
  }

  /**
   * Infer layout type from grid structure
   */
  private inferLayoutType(grid: any): string {
    if (!grid) return 'unknown';
    
    if (grid.gridType === 'single-column') return 'mobile-first';
    if (grid.gridType === 'two-column') return 'sidebar';
    if (grid.gridType === 'multi-column') return 'dashboard';
    if (grid.gridType === 'grid') return 'card-grid';
    
    return 'custom';
  }

  /**
   * Parse semantic response when JSON parsing fails
   */
  private parseSemanticResponse(content: string): any {
    return {
      intent: 'Unable to parse semantic analysis',
      components: [],
      relationships: [],
      suggestions: ['Manual review recommended'],
      confidence: 0.3,
    };
  }

  /**
   * Infer button size category
   */
  private inferButtonSize(width: number, height: number): string {
    if (height < 30) return 'small';
    if (height < 45) return 'medium';
    return 'large';
  }

  /**
   * Infer text size category
   */
  private inferTextSize(height: number): string {
    if (height < 14) return 'small';
    if (height < 18) return 'body';
    if (height < 24) return 'subtitle';
    return 'heading';
  }

  // Default fallback responses for failed analyses
  private getDefaultVisionAnalysis(): any {
    return {
      objects: [],
      colors: { dominantColorForeground: 'Black', dominantColorBackground: 'White' },
      tags: ['interface', 'design'],
      ui: { elements: [], patterns: [], colorScheme: null },
      confidence: 0.1
    };
  }

  private getDefaultLayoutAnalysis(): any {
    return {
      structure: { type: 'unknown', grid: null, hierarchy: [], regions: [] },
      confidence: 0.1
    };
  }

  private getDefaultGPTAnalysis(): any {
    return {
      intent: 'Analysis unavailable',
      components: [],
      relationships: [],
      suggestions: ['Please check OpenAI configuration'],
      confidence: 0.1
    };
  }

  /**
   * Generate code from analysis results
   */
  public async generateCode(
    analysis: DesignAnalysisResult,
    framework: 'react' | 'vue' | 'angular' = 'react'
  ): Promise<string> {
    console.log(`🔨 Generating ${framework} code from analysis...`);
    
    const components = this.extractComponents(analysis);
    const codeGenerator = new CodeGenerator(framework);
    
    return codeGenerator.generateFromComponents(components);
  }

  /**
   * Extract component definitions from analysis
   */
  private extractComponents(analysis: DesignAnalysisResult): ComponentDefinition[] {
    const components: ComponentDefinition[] = [];
    
    // Combine insights from all analysis types
    const visualElements = analysis.visual.ui?.elements || [];
    const semanticComponents = analysis.semantic.components || [];
    
    // Create component definitions
    visualElements.forEach((element, index) => {
      const component: ComponentDefinition = {
        type: element.type,
        name: `${element.type}${index + 1}`,
        properties: element.properties,
        styles: this.generateStyles(element, analysis.visual.colors),
        position: element.bounds,
      };
      
      components.push(component);
    });
    
    return components;
  }

  /**
   * Generate styles for a component
   */
  private generateStyles(element: any, colorScheme: any): Record<string, any> {
    const styles: Record<string, any> = {
      width: `${element.bounds.w}px`,
      height: `${element.bounds.h}px`,
      position: 'absolute',
      left: `${element.bounds.x}px`,
      top: `${element.bounds.y}px`,
    };

    // Add type-specific styles
    if (element.type === 'button' && colorScheme) {
      styles.backgroundColor = colorScheme.accent || '#007bff';
      styles.color = 'white';
      styles.border = 'none';
      styles.borderRadius = '4px';
      styles.padding = '8px 16px';
      styles.cursor = 'pointer';
    }

    if (element.type === 'text' && colorScheme) {
      styles.color = colorScheme.dominant || '#333';
      styles.fontSize = this.getFontSize(element.properties?.size);
    }

    return styles;
  }

  /**
   * Get font size based on text size category
   */
  private getFontSize(size: string): string {
    switch (size) {
      case 'small': return '12px';
      case 'body': return '16px';
      case 'subtitle': return '20px';
      case 'heading': return '24px';
      default: return '16px';
    }
  }
}

/**
 * Code generator for different frameworks
 */
class CodeGenerator {
  constructor(private framework: 'react' | 'vue' | 'angular') {}

  generateFromComponents(components: ComponentDefinition[]): string {
    switch (this.framework) {
      case 'react':
        return this.generateReactCode(components);
      case 'vue':
        return this.generateVueCode(components);
      case 'angular':
        return this.generateAngularCode(components);
      default:
        throw new Error(`Unsupported framework: ${this.framework}`);
    }
  }

  private generateReactCode(components: ComponentDefinition[]): string {
    const componentCode = components.map(comp => {
      const styles = JSON.stringify(comp.styles, null, 2);
      
      switch (comp.type) {
        case 'button':
          return `  <button style={${styles}}>{${comp.properties.text || '"Button"'}}</button>`;
        case 'text':
          return `  <span style={${styles}}>{${comp.properties.text || '"Text"'}}</span>`;
        case 'input':
          return `  <input style={${styles}} placeholder="${comp.properties.placeholder || 'Enter text'}" />`;
        default:
          return `  <div style={${styles}}>{/* ${comp.type} */}</div>`;
      }
    }).join('\n');

    return `import React from 'react';

export const GeneratedComponent = () => {
  return (
    <div style={{ position: 'relative' }}>
${componentCode}
    </div>
  );
};

export default GeneratedComponent;`;
  }

  private generateVueCode(components: ComponentDefinition[]): string {
    const componentCode = components.map(comp => {
      const styles = this.formatStylesForVue(comp.styles);
      
      switch (comp.type) {
        case 'button':
          return `    <button :style="${styles}">${comp.properties.text || 'Button'}</button>`;
        case 'text':
          return `    <span :style="${styles}">${comp.properties.text || 'Text'}</span>`;
        case 'input':
          return `    <input :style="${styles}" placeholder="${comp.properties.placeholder || 'Enter text'}" />`;
        default:
          return `    <div :style="${styles}"><!-- ${comp.type} --></div>`;
      }
    }).join('\n');

    return `<template>
  <div :style="{ position: 'relative' }">
${componentCode}
  </div>
</template>

<script>
export default {
  name: 'GeneratedComponent',
}
</script>`;
  }

  private generateAngularCode(components: ComponentDefinition[]): string {
    const componentCode = components.map(comp => {
      const styles = this.formatStylesForAngular(comp.styles);
      
      switch (comp.type) {
        case 'button':
          return `  <button [ngStyle]="${styles}">${comp.properties.text || 'Button'}</button>`;
        case 'text':
          return `  <span [ngStyle]="${styles}">${comp.properties.text || 'Text'}</span>`;
        case 'input':
          return `  <input [ngStyle]="${styles}" placeholder="${comp.properties.placeholder || 'Enter text'}" />`;
        default:
          return `  <div [ngStyle]="${styles}"><!-- ${comp.type} --></div>`;
      }
    }).join('\n');

    return `import { Component } from '@angular/core';

@Component({
  selector: 'app-generated',
  template: \`
    <div [ngStyle]="{ position: 'relative' }">
${componentCode}
    </div>
  \`
})
export class GeneratedComponent {}`;
  }

  private formatStylesForVue(styles: Record<string, any>): string {
    return JSON.stringify(styles);
  }

  private formatStylesForAngular(styles: Record<string, any>): string {
    return JSON.stringify(styles);
  }
}

// Export the main analyzer class
export { AzureAIDesignAnalyzer };