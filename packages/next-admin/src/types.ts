import { Prisma, PrismaClient } from "@prisma/client";
import { JSONSchema7 } from "json-schema";

let prisma: PrismaClient;

if (typeof window === "undefined") {
  prisma = new PrismaClient();
}

export type ModelName = Prisma.ModelName;

export type Field<P extends ModelName> =
  | keyof (typeof Prisma)[`${Capitalize<P>}ScalarFieldEnum`]
  | Awaited<(typeof Prisma)[`Prisma__${P}Client`]["prototype"]>

export type UField<M extends ModelName> = Field<M>;

export type ModelOptions<T extends ModelName> = {
  [P in T]?: {
    toString?: (item: Model<P>) => string;
    list?: {
      fields: ListFieldsOptions<P>;
    };
    edit?: {
      fields: EditFieldsOptions<P>;
    };
  };
};

export type ListFieldsOptions<T extends ModelName> = {
  [P in Field<T>]?: {
    display?: true;
    search?: true;
  };
};

export type EditFieldsOptions<T extends ModelName> = {
  [P in Field<T>]?: {
    display?: boolean;
    // TODO Improve typing
    validate?: (value: any) => true | string;
  };
};

export type NextAdminOptions = {
  basePath: string;
  model?: ModelOptions<ModelName>;
};

export type SchemaProperty<M extends ModelName> = {
  [P in Field<M>]: JSONSchema7;
};

export type SchemaModel<M extends ModelName> = Partial<
  Omit<JSONSchema7, "properties">
> & {
  properties: SchemaProperty<M>;
};

export type SchemaDefinitions = {
  [M in ModelName]: SchemaModel<M>;
};

export type Schema = Partial<Omit<JSONSchema7, "definitions">> & {
  definitions: SchemaDefinitions;
};

export type FormData<M extends ModelName> = {
  [P in Field<M>]?: string;
};

export type Body<F> = {
  [P in keyof F]?: string;
} & {
  [key: string]: string;
};

export type Order<M extends ModelName> = {
  [P in Field<M>]?: Prisma.SortOrder;
};

export type Select<M extends ModelName> = {
  [P in Field<M>]?: boolean;
} & {
  _count: {
    select: {
      [key in string]: boolean;
    };
  };
};

export type Enumeration = {
  label: string;
  value: string;
};

export type PrismaListRequest<M extends ModelName> = {
  select?: Select<M>;
  where?: {};
  orderBy?: Order<M>;
  skip?: number;
  take?: number;
};

export type Collection<M extends ModelName> = Awaited<
  ReturnType<(typeof prisma)[Uncapitalize<M>]["findMany"]>
>;

export type Model<M extends ModelName> = Collection<M>[number];

export type ListData<T extends ModelName> = ListDataItem<T>[];

export type ListDataItem<T extends ModelName> = Model<T> &
  Record<string, ListDataFieldValue>;

export type ListDataFieldValue =
  // | { type: "scalar"; value: string | number | boolean } -- not supported yet
  | number
  | string
  | boolean
  | { type: "count"; value: number }
  | {
    type: "link";
    value: {
      label: string;
      url: string;
    };
  }
  | {
    type: "date";
    value: Date;
  };
