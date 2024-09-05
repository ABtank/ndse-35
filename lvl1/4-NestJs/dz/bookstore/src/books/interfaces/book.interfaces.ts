export interface Book {
  title: string;
  description: string;
  authors: string[];
  favorite: boolean;
  fileCover: string;
  fileName: string;
  fileBook: string;
}

export interface CreateBookDto {
  title: string;
  description: string;
  authors: string[];
  favorite: boolean;
}
