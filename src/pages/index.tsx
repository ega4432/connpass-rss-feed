import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import generateRssFeed from '../lib/feed'

const Home: NextPage = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <Link href="/rss/feed.xml" passHref >
            <div className={styles.card}>
              <h2>feed.xml &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </div>
          </Link>

          <Link href="/rss/atom.xml" passHref>
            <div className={styles.card}>
              <h2>atom.xml &rarr;</h2>
              <p>hoge fuga</p>
            </div>
          </Link>

          <Link href="/rss/feed.json" passHref>
            <div className={styles.card}>
              <h2>feed.json &rarr;</h2>
              <p>this is json!!!</p>
            </div>
          </Link>

          <a
            href="https://ysmtegsr.com"
            target="_blank"
            rel="noreferrer"
            className={styles.card}
          >
            <h2>My web site &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://ysmtegsr.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          ©{' '}ysmtegsr - {new Date().getFullYear()}
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeed()

  return { props: {} }
}

export default Home
