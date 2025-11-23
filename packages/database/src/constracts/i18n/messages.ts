type Primitive = string | number | boolean | bigint | symbol | null | undefined;
type Join<K, P> = K extends string | number
    ? P extends string | number
    ? `${K}.${P}`
    : never
    : never;

type DeepKeys<T> = T extends Primitive
    ? never
    : {
        [K in keyof T & (string | number)]: T[K] extends Primitive
        ? K
        : T[K] extends Record<string | number, any>
        ? K | Join<K, DeepKeys<T[K]>>
        : K;
    }[keyof T & (string | number)];

type DeepStringLeafKeys<T> = T extends Primitive
    ? never
    : {
        [K in keyof T & (string | number)]: T[K] extends string
        ? K
        : T[K] extends Record<string | number, any>
        ? Join<K, DeepStringLeafKeys<T[K]>>
        : never;
    }[keyof T & (string | number)];

type PathSegments<S extends string> =
    S extends `${infer Head}.${infer Tail}` ? [Head, ...PathSegments<Tail>] : [S];

type SetAtPath<
    TObj,
    Segments extends readonly string[],
    TValue
> = Segments extends [infer Head extends string, ...infer Rest extends string[]]
    ? { [K in Head]: Rest['length'] extends 0 ? TValue : SetAtPath<{}, Rest, TValue> }
    : {};

type MergeObjects<A, B> = {
    [K in keyof A | keyof B]:
    K extends keyof A
    ? K extends keyof B
    ? A[K] & B[K]
    : A[K]
    : K extends keyof B
    ? B[K]
    : never;
};

type BuildMapFromPaths<U extends string> =
    U extends string ? SetAtPath<{}, PathSegments<U>, string> : never;

type UnionToIntersection<U> =
    (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;

type Normalize<T> = { [K in keyof T]: T[K] };

import messages from "@repo/i18n/messages/en.json";

export type MessageKey = DeepStringLeafKeys<typeof messages>;
export type MessageKeyMap = Normalize<UnionToIntersection<BuildMapFromPaths<MessageKey>>>;
export type MessageKeyAll = DeepKeys<typeof messages>;
