
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum BookWritingsOrderField {
    AUTHOR_NAME = "AUTHOR_NAME"
}

export enum OrderDirection {
    ASC = "ASC",
    DESC = "DESC"
}

export enum AuthorWritingsOrderField {
    BOOK_TITLE = "BOOK_TITLE"
}

export interface BookWritingsOrder {
    field: BookWritingsOrderField;
    direction: OrderDirection;
}

export interface AuthorWritingsOrder {
    field: AuthorWritingsOrderField;
    direction: OrderDirection;
}

export interface Node {
    id: string;
}

export interface Edge {
    cursor: string;
    node: Node;
}

export interface Connection {
    edges: Edge[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: Nullable<string>;
    endCursor?: Nullable<string>;
}

export interface Writing extends Node {
    id: string;
    auhtor: Author;
    book: Book;
}

export interface WritingEdge extends Edge {
    cursor: string;
    node: Writing;
}

export interface WritingConnection extends Connection {
    edges: WritingEdge[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface IQuery {
}

export interface Author {
    id: string;
    name: string;
    writings: WritingConnection;
}

export interface Book {
    id: string;
    title: string;
    writings: WritingConnection;
}

type Nullable<T> = T | null;
