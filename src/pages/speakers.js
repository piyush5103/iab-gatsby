import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "components/Layout";
import SpeakerCard from "components/SpeakerPost";
import dimensions from "styles/dimensions"


const WorkTitle = styled("h1")`
    margin-bottom: 1em;
`

const SpeakerGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2em;

  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.5em;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    grid-template-columns: 1fr;
    grid-gap: 2.5em;
  }
`


const Work = ({ projects, meta }) => (
	<>
		<Helmet
			title={`Speakers | Speaker Series India`}
			titleTemplate={`%s | Speakers | Speaker Series India`}
			meta={[
				{
					name: `description`,
					content: meta.description,
				},
				{
					property: `og:title`,
					content: `Speakers | Speaker Series India`,
				},
				{
					property: `og:description`,
					content: meta.description,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: meta.author,
				},
				{
					name: `twitter:title`,
					content: meta.title,
				},
				{
					name: `twitter:description`,
					content: meta.description,
				},
			].concat(meta)}
		/>
		<Layout>
			<WorkTitle>
				Speakers
            </WorkTitle>


			<SpeakerGrid>
				{projects.map((project, i) => (
					<SpeakerCard
						key={i}
						category={project.node.project_category}
						title={project.node.project_title}
						description={project.node.project_preview_description}
						thumbnail={project.node.project_preview_thumbnail}
						uid={project.node._meta.uid}
						date={project.node.project_post_date}
					/>
				))}
			</SpeakerGrid>
		</Layout>
	</>
);

export default ({ data }) => {
	const projects = data.prismic.allProjects.edges;
	const meta = data.site.siteMetadata;
	if (!projects) return null;

	return (
		<Work projects={projects} meta={meta} />
	)
}

Work.propTypes = {
	projects: PropTypes.array.isRequired,
};

export const query = graphql`
    {
        prismic {
            allProjects {
                edges {
                    node {
                        project_title
                        project_preview_description
                        project_preview_thumbnail
                        project_category
                        project_post_date
                        _meta {
                            uid
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`

