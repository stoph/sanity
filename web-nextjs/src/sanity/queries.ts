import { defineQuery } from "next-sanity";

// GROQ queries for cars - TypeGen will automatically generate types for these
export const carsQuery = defineQuery(`*[_type == "car" && availabilityStatus == "available"] | order(publishedAt desc) {
  ...
}`);

export const carQuery = defineQuery(`*[_type == "car" && slug.current == $slug][0] {
  ...
}`);

export const featuredCarsQuery = defineQuery(`*[_type == "car" && featured == true && availabilityStatus == "available"] | order(publishedAt desc)[0..2] {
  ...
}`);

// Page queries
export const pagesQuery = defineQuery(`*[_type == "page"] | order(publishedAt desc) {
  ...
}`);

export const pageQuery = defineQuery(`*[_type == "page" && slug.current == $slug][0] {
  ...
}`);

export const featuredPagesQuery = defineQuery(`*[_type == "page" && featured == true] | order(publishedAt desc) {
  ...
}`);

// Landing page query
export const landingPageQuery = defineQuery(`*[_type == "page" && pageType == "landing"][0] {
  ...
}`);

// Recent articles query
export const recentArticlesQuery = defineQuery(`*[_type == "page" && pageType == "article"] | order(publishedAt desc)[0..2] {
  ...
}`); 