import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Date from '../components/Date'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: { allPostsData },
  }
}

//   export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3000/api/posts')
//   const json = await response.json()
//   console.log(response)
//   return {
//     props: {
//       allPostsData: json.allPostData,
//     },
//   }
// }

export default function Home({ allPostsData }) {
  // const [allPostsData, setAllPostData] = useState([])
  // useEffect(() => {
  //   fetch('/api/posts')
  //     .then((res) => res.json())
  //     .then((data) => setAllPostData(data.allPostData))
  // }, [])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
