require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const { RichText } = require('prismic-reactjs');

// We don't want to import every PrismJS component - so that's why they're required individually
const Prism = require('prismjs');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-css');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-json');
require('prismjs/components/prism-diff');
require('prismjs/components/prism-markdown');
require('prismjs/components/prism-graphql');

const { Elements } = RichText;

// Labels with this name will be inline code
const codeInline = ['text'];
// Labels with these names will become code blocks
const codeBlock = ['javascript', 'css', 'scss', 'jsx', 'bash', 'json', 'diff', 'markdown', 'graphql'];

const {
  _pathPrefix,
  shortName,
  description,
  themeColor,
  backgroundColor,
  _title,
  _titleAlt,
  _url,
  author,
  logo,
  favicon,
  siteLanguage,
  twitter,
} = require('./config/website');

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
    banner: logo,
    twitter,
  },
  /* Plugins */
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'dojo2',
        accessToken: 'MC5XOHluMmhJQUFDa0FuWGJG.77-977-9en9zZTrvv73vv73vv73vv73vv71y77-977-9Ue-_vT3vv73vv73vv73vv71I77-9BO-_ve-_vXESMO-_vXw',
        linkResolver: () => post => `/${post.uid}`,
        htmlSerializer: () => (type, element, content) => {
          switch (type) {
            // First differentiate between a label and a preformatted field (e.g. the Code Block slice)
            case Elements.label: {
              // Use the inline code for labels that are in the array of "codeInline"
              if (codeInline.includes(element.data.label)) {
                return `<code class="language-${element.data.label}">${content}</code>`;
              }
              // Use the blockquote for labels with the name "quote"
              if (element.data.label === 'quote') {
                return `<blockquote><p>${content}</p></blockquote>`;
              }
              // Use the code block for labels that are in the array of "codeBlock"
              // Choose the right PrismJS highlighting with the label name
              if (codeBlock.includes(element.data.label)) {
                return `<pre class="language-${element.data.label}"><code class="language-${
                  element.data.label
                }">${Prism.highlight(content, Prism.languages[element.label])}</code></pre>`;
              }
              return null;
            }
            case Elements.preformatted: {
              if (codeBlock.includes(element.label)) {
                return `<pre class="language-${element.label}"><code class="language-${
                  element.label
                }">${Prism.highlight(element.text, Prism.languages[element.label])}</code></pre>`;
              }
              return null;
            }
            default: {
              return null;
            }
          }
        },
      },
    },
    'gatsby-plugin-lodash',
    // Although this starter doesn't use local files this plugin is necessary for the gatsby-image features of gatsby-source-prismic
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'config/typography.js',
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: _title,
        short_name: _titleAlt,
        description,
        start_url: _pathPrefix,
        background_color: backgroundColor,
        theme_color: themeColor,
        display: 'standalone',
        icon: favicon,
      },
    },
    // Must be placed at the end
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
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
              return ctx.query.allPrismicPost.edges.map(edge => ({
                categories: edge.node.data.categories
                date: edge.node.data.date,
                title: edge.node.data.title.text,
                author: "Samuel Wong",
                url: "https://pins.desktopofsamuel.com/" + edge.node.uid,
                guid: "https://pins.desktopofsamuel.com/" + edge.node.uid,
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
                        localFile {
                          childImageSharp {
                            sizes(maxWidth: 1280) {
                              aspectRatio
                              src
                              srcSet
                              srcWebp
                              srcSetWebp
                              sizes
                            }
                          }
                        }
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
                    }
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
          }
        ]
      },
    },
  ],
};
