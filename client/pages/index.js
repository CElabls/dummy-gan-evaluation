import Head from 'next/head'
import Link from  'next/link'
import styles from '../styles/Home.module.css'

export default () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>GAN manual evaluator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hi <a href="https://github.com/liashchynskyi/dummy-gan-evaluation">there!</a>
        </h1>

        <p className={styles.description}>
          Click <b>GO</b> to start evaluation
        </p>

        <Link href='/test'><button>GO</button></Link>
      </main>
    </div>
  )
}
