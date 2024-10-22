export interface INewsPost {
  id: number | null;
  newsId: number | null;
  heading: string | null;
  subHeading: string | null;
  body: string | null;
  visibility: boolean | null;
  linkSrc1: string | null;
  linkText1: string | null;
  date: string | null;
  location: string | null;
  userId: number | null;
  imgSrc: string | null;
}