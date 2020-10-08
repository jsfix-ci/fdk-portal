export enum SearchTypes {
  dataset,
  dataservice,
  concept,
  informationModel
}

export enum Entity {
  DATASET = 'dataset',
  DATA_SERVICE = 'dataservice',
  CONCEPT = 'concept',
  INFORMATION_MODEL = 'informationmodel'
}

export enum DataFormat {
  JSON = 'application/json',
  CSV = 'text/csv',
  XML = 'application/xml',
  YAML = 'application/x.yaml',
  GEOJSON = 'application/vnd.geo+json',
  HTML = 'text/html',
  SOSI = 'application/x-ogc-sosi',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  XLS = 'application/vnd.sealed-xls',
  RSS = 'text/xml',
  RDF_XML = 'application/rdf+xml',
  TURTLE = 'text/turtle',
  JSONLD = 'application/ld+json',
  TXT = 'text/plain',
  SIRI = 'application/x.siri',
  UNKNOWN = 'unknown'
}

export enum SortOrder {
  ASC,
  DSC
}

export enum Filter {
  LASTXDAYS = 'last_x_days',
  OPENDATA = 'opendata',
  ACCESSRIGHTS = 'accessrights',
  PROVENANCE = 'provenance',
  SUBJECTEXISTS = 'subjectExists',
  FORMAT = 'format',
  LOS = 'losTheme',
  ORGPATH = 'orgPath',
  THEME = 'theme',
  Q = 'q',
  PAGE = 'page',
  SORTFIELD = 'sortfield'
}

export enum RatingCategory {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  SUFFICIENT = 'sufficient',
  POOR = 'poor'
}

export enum DimensionType {
  ACCESSIBILITY = 'accessibility',
  FINDABILITY = 'findability',
  INTEROPERABILITY = 'interoperability',
  READABILITY = 'readability',
  REUSABILITY = 'reusability'
}

export enum IndicatorType {
  DISTRIBUTABLE_DATA = 'distributableData',
  KEYWORD_USAGE = 'keywordUsage',
  SUBJECT_USAGE = 'subjectUsage',
  GEO_SEARCH = 'geoSearch',
  CONTROLLED_VOCABULARY_USAGE = 'controlledVocabularyUsage',
  LICENSE_INFORMATION = 'licenseInformation',
  CONTACT_POINT = 'contactPoint',
  TITLE = 'title',
  TITLE_NO_ORG_NAME = 'titleNoOrgName',
  DESCRIPTION = 'description',
  DESCRIPTION_WITHOUT_TITLE = 'descriptionWithoutTitle'
}
