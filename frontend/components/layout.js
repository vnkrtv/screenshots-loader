import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import * as React from "react";

const name = 'Screenshots loader'
export const siteTitle = 'Screenshots loader | Home Page'

export default function Layout({ children, siteTitle, pageTitle }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="../public/favicon.ico" />
        <meta
          name="description"
          content="Providong loading screenshots"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {children}
    </div>
  )
}
