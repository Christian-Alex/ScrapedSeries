/* Interfaces generic */
export interface IButton {
  class: string;
  visible: boolean;
  text: string;
}
/* Interfaces for use */
export interface IInterfaceSerie {
  url: string;
  color: string;
}
export interface IDescription {
  chapter: string;
  image: string;
  link: string;
  day: string;
}
export interface ISerie {
  description: IDescription[];
  name: string;
  totalChapter: string;
  color: string;
}
