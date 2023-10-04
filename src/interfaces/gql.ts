export interface IStringProps {
  [key: string]: string;
}

export interface IStringInputProps extends IStringProps {
  input: any;
}

// -------------- Articles:

export interface IEditArticleProps extends IStringProps {
  articleInput?: any;
}
