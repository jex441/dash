import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users_table', {
  id: serial('id').primaryKey(),
  authId: text('authId'),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  plan: text('plan').notNull(),
  occupation: text('occupation'),
  domain: text('domain'),
  flagged: boolean('flagged'),
  student: boolean('student'),
  url: text('url'),
});

export type NewUser = typeof users.$inferInsert;

export const pages = pgTable('pages_table', {
  id: serial('id').primaryKey(),
  template: text('template').notNull(),
  title: text('title').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const section = pgTable('sections_table', {  
  id: serial('id').primaryKey(),
  pageId: integer('page_id').notNull().references(() => pages.id, { onDelete: 'cascade' }),
  type: text('type'),
  order: integer('order'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const sectionAttribute = pgTable('section_attributes_table', {
  id: serial('id').primaryKey(),
  tag: text('tag'),
  value: text('value'),
  sectionId: integer('section_id').notNull().references(() => section.id, { onDelete: 'cascade' }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const item = pgTable('items_table', {
  id: serial('id').primaryKey(),
  title: text('title'),
  medium: text('medium'),
  description: text('description'),
  year: text('year'),
  height: text('height'),
  width:  text('width'),
  depth: text('depth'),
  unit: text('unit'),
  price: text('price'),
  currency: text('currency'),
  sold: text('sold'),
  edition: text('edition'),
  location: text('location'),
  displayHeight: text('displayHeight').notNull(),
  displayWidth: text('displayWidth').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const media = pgTable('media_table', {
  id: serial('id').primaryKey(),
  itemId: integer('item_id').notNull().references(() => item.id, { onDelete: 'cascade' }),
  title: text('title'),
  type: text('type'),
  url: text('url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type GetUsers = typeof users.$inferSelect;

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertSectionAttribute = typeof sectionAttribute.$inferInsert;
export type SelectPage = typeof pages.$inferSelect;
