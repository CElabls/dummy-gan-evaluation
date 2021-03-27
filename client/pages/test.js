import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Test() {
  const [images, setImages] = useState([])
  const [rightAnswersCount, setRightAnswersCount] = useState(0)
  const [imagesLeftCount, setImagesLeftCount] = useState(30)

  const [dontKnow, setDontKnow] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    loadNext()
  }, [])

  const loadNext = () => fetch(process.env.NEXT_PUBLIC_BACKEND)
    .then(res => res.json())
    .then(setImages)
    .then(() => finished && setFinished(false))

  const check = (img) => {
    fetch(process.env.NEXT_PUBLIC_BACKEND, {
      method: 'post',
      body: JSON.stringify({...img, answer: 1, pass: dontKnow}),
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        setDontKnow(false);
        setRightAnswersCount(res.result);
        !dontKnow && setImagesLeftCount(prev => prev - 1)
        if (res.shouldStop) {
          setFinished(true)
          setImagesLeftCount(30)
        }
        else loadNext()
      })
  }

  useEffect(() => dontKnow && check({}), [dontKnow])

  return (
    <>
      <Head>
        <title>Evaluation</title>
      </Head>
      <div className={styles.container}>
        <main>
          <div className={styles.grid}>
            {images.map(i =>
              <div className={styles.card}>
                <img width={100} src={i.img} onClick={() => check(i)} />
              </div>
            )}
          </div>
          <div style={{textAlign: 'center'}}>
            {finished &&
              <h1 style={finished ? {color: 'red'} : {}}>
                Right answers: {rightAnswersCount}
              </h1>
            }
            <h2>Images left: {imagesLeftCount}</h2>
            <button onClick={() => setDontKnow(true)}>Pass</button>
          </div>
        </main>
      </div>
    </>
  )
}
