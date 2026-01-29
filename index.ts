export interface BlockInput {
  check?: string | string[] | (() => string | string[]);
  shadow?: {
    type?: string | (() => string);
    content?: string | (() => string);
  } | (() => { type?: string | (() => string); content?: string | (() => string) });
};

export interface BlockField {
  type: "text" | "multiline" | "dropdown" | "variable";
  default?: string | (() => string);
  validator?: (value: string) => string | undefined;
  options?: Record<string, string | (() => string)>;
};

export interface BlockStatement {
  label?: string | (() => string);
};

export interface BlockConfig {
  hat?: boolean | (() => boolean);
  layout?: string | string[] | (() => string | string[]);
  inputs?: Record<string, BlockInput> | (() => Record<string, BlockInput>);
  fields?: Record<string, BlockField> | (() => Record<string, BlockField>);
  statements?: Record<string, BlockStatement> | (() => Record<string, BlockStatement>);
  previous?: boolean | (() => boolean);
  next?: boolean | (() => boolean);
  output?: boolean | Function | string | (() => boolean | Function | string);
  color?: string | (() => string);
  inline?: boolean | (() => boolean);
  deletable?: boolean | (() => boolean);
  tooltip?: string | (() => string);
  help?: string | (() => string);
  generator?: Function;
  generators?: Record<string, Function>;
};

export interface LanguageGenerators {
  [language: string]: any;
};

export interface BlocksProxy {
  [name: string]: BlockConfig;
};

export interface BlocksLibraryOptions {
  generator?: Function;
  generators?: LanguageGenerators;
  translate?: (text: string) => string;
};

declare function createBlocks(
  Blockly: any,
  options?: BlocksLibraryOptions
): BlocksProxy;

export default createBlocks;