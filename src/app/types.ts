export interface Response {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Doc[];
  num_found: number;
  q: string;
  offset: null;
}

export interface Doc {
  key: string;
  type: Type;
  seed: string[];
  title: string;
  title_suggest: string;
  title_sort: string;
  edition_count: number;
  edition_key: string[];
  publish_date: string[];
  publish_year: number[];
  first_publish_year: number;
  isbn?: string[];
  last_modified_i: number;
  ebook_count_i: number;
  ebook_access: EbookAccess;
  has_fulltext: boolean;
  public_scan_b: boolean;
  publisher: string[];
  language?: string[];
  author_key?: string[];
  author_name?: string[];
  publisher_facet: string[];
  _version_: number;
  author_facet?: string[];
  number_of_pages_median?: number;
  cover_edition_key?: string;
  cover_i?: number;
  lccn?: string[];
  publish_place?: string[];
  oclc?: string[];
  lcc?: string[];
  ddc?: string[];
  ia?: string[];
  ia_collection?: string[];
  ia_collection_s?: string;
  lending_edition_s?: string;
  lending_identifier_s?: string;
  printdisabled_s?: string;
  subject?: string[];
  id_goodreads?: string[];
  id_librarything?: string[];
  ia_box_id?: string[];
  subject_facet?: string[];
  lcc_sort?: string;
  subject_key?: string[];
  ddc_sort?: string;
  contributor?: string[];
  readinglog_count?: number;
  want_to_read_count?: number;
  currently_reading_count?: number;
  already_read_count?: number;
  ratings_average?: number;
  ratings_sortable?: number;
  ratings_count?: number;
  ratings_count_1?: number;
  ratings_count_2?: number;
  ratings_count_3?: number;
  ratings_count_4?: number;
  ratings_count_5?: number;
  id_amazon?: string[];
  subtitle?: string;
  person?: string[];
  place?: string[];
  id_overdrive?: string[];
  person_key?: string[];
  place_key?: string[];
  person_facet?: string[];
  place_facet?: string[];
  author_alternative_name?: string[];
  first_sentence?: string[];
  time?: string[];
  time_facet?: string[];
  time_key?: string[];
  ia_loaded_id?: string[];
  id_alibris_id?: string[];
  id_better_world_books?: string[];
  id_dnb?: string[];
  id_google?: string[];
  id_hathi_trust?: string[];
  id_isfdb?: string[];
  id_librivox?: string[];
  id_project_gutenberg?: string[];
  id_standard_ebooks?: string[];
  id_amazon_ca_asin?: string[];
  id_amazon_co_uk_asin?: string[];
  id_amazon_de_asin?: string[];
  id_amazon_it_asin?: string[];
}

export enum EbookAccess {
  Borrowable = "borrowable",
  NoEbook = "no_ebook",
  Public = "public",
}

export enum Type {
  Work = "work",
}
