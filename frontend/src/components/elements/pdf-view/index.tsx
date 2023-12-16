import { Document, Page, pdfjs } from 'react-pdf'
import React, { useEffect, useRef, useState } from 'react'
import { PageNumberCustom } from './PageNumberCustom'
import './style.module.scss'
import { Spin } from 'antd'
import styles from '../noti-modal/style.module.scss'
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

interface Props {
  pdfUrl: string
}

const PdfView = ({ pdfUrl }: Props) => {
  const [numPages, setNumPages] = useState<number>(1)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfHeight, setPdfHeight] = useState<number | undefined>(undefined)
  const [pageNumberWrapperHeight, setPageNumberWrapperHeight] = useState<number>(0)
  const [loadingPdf, setLoadingPdf] = useState(true)
  const pdfWrapper = useRef() as any

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages)
    setLoadingPdf(false)
  }

  const handleNextPage = () => {
    if (pageNumber < (numPages || 0)) {
      setPageNumber(pageNumber + 1)
    }
  }
  const handleBack = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  useEffect(() => {
    const height = 500
    setPdfHeight(height)
    // setPdfWidth((height * 558) / 791);
    setPageNumberWrapperHeight(height / 2)
  }, [])

  return (
    <div style={{ maxHeight: 500 }}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} height={500} />
      </Document>
      <div style={{ height: `${pageNumberWrapperHeight}` }}>
        <PageNumberCustom totalPage={numPages || 0} page={pageNumber} onBack={handleBack} onNext={handleNextPage} />
      </div>
    </div>
  )
}

export default React.memo(PdfView)
