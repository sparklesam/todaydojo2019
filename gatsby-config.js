require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const prismicHtmlSerializer = require("./src/gatsby/htmlSerializer");

const {
  _pathPrefix,
  shortName,
  description,
  themeColor,
  backgroundColor,
  keyword,
  _title,
  _titleAlt,
  _url,
  author,
  logo,
  favicon,
  siteLanguage,
  twitter,
} = require("./config/website");

module.exports = {
  /* General Information */
  pathPrefix: _pathPrefix,
  siteMetadata: {
    title: _title,
    titleAlt: _titleAlt,
    shortName,
    author,
    siteLanguage,
    logo, // Logo for JSONLD
    url: _url,
    siteUrl: _url + _pathPrefix, // For gatsby-plugin-sitemap
    pathPrefix: _pathPrefix,
    description,
    keyword,
    banner: logo,
    twitter,
  },
  /* Plugins */
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: "dojo2",
        accessToken:
          "MC5XOHluMmhJQUFDa0FuWGJG.77-977-9en9zZTrvv73vv73vv73vv73vv71y77-977-9Ue-_vT3vv73vv73vv73vv71I77-9BO-_ve-_vXESMO-_vXw",
        schemas: {
          category: require("./src/schemas/category.json"),
          hero_links: require("./src/schemas/category.json"),
          homepage: require("./src/schemas/homepage.json"),
          post: require("./src/schemas/post.json"),
          project: require("./src/schemas/project.json"),
          type: require("./src/schemas/type.json"),
        },
        linkResolver: () => (post) => `/${post.uid}`,
        htmlSerializer: () => prismicHtmlSerializer,
      },
    },
    "gatsby-plugin-lodash",
    // Although this starter doesn't use local files this plugin is necessary for the gatsby-image features of gatsby-source-prismic
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "config/typography.js",
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: _title,
        short_name: _titleAlt,
        description,
        start_url: _pathPrefix,
        background_color: backgroundColor,
        theme_color: themeColor,
        display: "standalone",
        // icon: "src/favicon.png",
      },
    },
    // Must be placed at the end
    "gatsby-plugin-offline",
    "gatsby-plugin-netlify",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-114278308-4",
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata;
          ret.allPrismicPost = ref.query.allPrismicPost;
          ret.generator = "GatsbyJS Material Starter";
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              author
              siteUrl
              description
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const { rssMetadata } = ctx.query.site.siteMetadata;
              return ctx.query.allPrismicPost.edges.map((edge) => ({
                date: edge.node.data.date,
                title: edge.node.data.title.text,
                author: "Samuel Wong",
                url: `https://pins.desktopofsamuel.com/${edge.node.uid}`,
                guid: `https://pins.desktopofsamuel.com/${edge.node.uid}`,
                custom_elements: [
                  { "content:encoded": `${edge.node.data.body.}` },
                ],
              }));
            },
            query: `
            {
              allPrismicPost(sort: { fields: [data___date], order: DESC }) {
                edges {
                  node {
                    uid
                    data {
                      feature {
                        url
                       }
                      title {
                        text
                      }
                      url {
                        url
                      }
                      body {
                        __typename
                        ... on PrismicPostBodyText {
                          slice_type
                          id
                          primary {
                            text {
                              html
                              text
                            }
                          }
                        }
                      }
                      date
                      categories {
                        category {
                          document {
                            ... on PrismicCategory {
                            data {
                              name
                            }
                          }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: "Pins of Samuel",
          },
        ],
      },
    },
  ],
};
