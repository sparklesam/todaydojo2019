const path = require("path");
const _ = require("lodash");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      allPrismicPost {
        edges {
          node {
            id
            uid
            data {
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
  `);

  const postTemplate = path.resolve("src/templates/post.jsx");
  const categoryTemplate = path.resolve("src/templates/category.jsx");
  const postsList = pages.data.allPrismicPost.edges;
  const categorySet = new Set();

  // Double check that the post has a category assigned
  postsList.forEach((edge) => {
    if (edge.node.data.categories[0].category) {
      edge.node.data.categories.forEach((cat) => {
        categorySet.add(cat.category.document.data.name);
      });
    }

    // The uid you assigned in Prismic is the slug!
    createPage({
      path: `/${edge.node.uid}`,
      component: postTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
      },
    });
  });

  const categoryList = Array.from(categorySet);

  categoryList.forEach((category) => {
    createPage({
      path: `/categories/${_.kebabCase(category)}`,
      component: categoryTemplate,
      context: {
        category,
      },
    });
  });
};

/* Allow us to use something like: import { X } from 'directory' instead of '../../folder/directory' */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};
