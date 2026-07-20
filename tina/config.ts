import { defineStaticConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineStaticConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "src/content/posts",
        format: "mdx",
        ui: {
          // Questa funzione definisce come viene generato il nome del file
          filename: {
            readonly: false, // Permette all'utente di modificare il nome file se necessario
            slugify: (values) => {
              // Prende il valore del campo 'title' e lo trasforma in slug
              return (
                values?.title
                  ?.toLowerCase()
                  .replace(/['’]/g, "")
                  .replace(/\s+/g, "-")
                  .replace(/[^\w-]+/g, "") || "nuovo-post"
              );
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Sottotitolo / Intro",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "heroImage",
            label: "Immagine di Copertina (Grande)",
          },
          { type: "image", name: "sideImage", label: "Logo o Icona Laterale" },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            options: ["Teatro", "Eventi", "Dietro le Quinte"],
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Data di Pubblicazione",
            ui: { dateFormat: "DD MMMM YYYY" },
          },
          {
            type: "number",
            name: "order",
            label: "Ordine",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenuto Articolo",
            isBody: true,
            templates: [
              {
                name: "Quote",
                label: "Citazione Stilizzata",
                fields: [
                  { name: "content", label: "Testo", type: "string" },
                  { name: "author", label: "Autore", type: "string" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "chi_siamo",
        label: "Chi siamo",
        path: "src/content/chi_siamo",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Descrizione breve",
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publish Date",
            ui: {
              dateFormat: "DD MMMM YYYY",
            },
          },
          {
            type: "rich-text",
            name: "content",
            label: "Contenuto principale",
            isBody: true,
          },
          {
            type: "image",
            name: "sideImage",
            label: "Immagine laterale (logo)",
          },
          {
            type: "image",
            name: "mainImage",
            label: "Immagine principale (gruppo)",
          },
        ],
      },
      {
        name: "shows",
        label: "Spettacoli",
        path: "src/content/shows",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
          },
          {
            type: "image",
            name: "posterImage",
            label: "Locandina",
          },
          {
            type: "number",
            name: "order",
            label: "Ordine",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Descrizione",
            isBody: true,
          },
        ],
      },
      {
        name: "people",
        label: "Persone",
        path: "src/content/people",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Nome",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Foto",
          },
          {
            type: "number",
            name: "order",
            label: "Ordine",
          },
          {
            type: "rich-text",
            name: "bio",
            label: "Bio",
            isBody: true,
          },
        ],
      },
      {
        name: "events",
        label: "Eventi",
        path: "src/content/events",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "venue",
            label: "Luogo",
          },
          {
            type: "datetime",
            name: "date",
            label: "Data",
            ui: {
              dateFormat: "DD MMMM YYYY HH:mm",
            },
          },
          {
            type: "string",
            name: "time",
            label: "Orario (testo)",
          },
          {
            type: "number",
            name: "order",
            label: "Ordine",
          },
          {
            type: "rich-text",
            name: "notes",
            label: "Note",
            isBody: true,
          },
        ],
      },
      {
        name: "navigation",
        label: "Navigazione",
        path: "src/content/navigation",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Voci di menu",
            list: true,
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID",
                required: true,
              },
              {
                type: "string",
                name: "label",
                label: "Etichetta",
                required: true,
              },
              {
                type: "string",
                name: "href",
                label: "Link",
                required: true,
                description:
                  "Usa '#sezione' per ancore homepage oppure '/percorso' per pagine.",
              },
              {
                type: "string",
                name: "parentId",
                label: "Parent ID",
                description:
                  "Se impostato, questa voce diventa figlia dell'elemento con ID corrispondente.",
              },
              {
                type: "number",
                name: "order",
                label: "Ordine",
                description: "Ordina i fratelli (crescente).",
              },
              {
                type: "boolean",
                name: "external",
                label: "Link esterno",
              },
            ],
          },
        ],
      }
    ],
  },
});
