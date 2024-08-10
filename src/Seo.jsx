import React, { useEffect, useState } from "react";

const Seo = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const GetData = async () => {
      await setData(props.data);
    }
    GetData()
    setLoading(true)
  }, [props.data])

  return(
  <>
    {loading && <head>
      {data.metaTitle && <title>{data.metaTitle}</title>}
      {data.metaDescription && <meta name="description" content={data.metaDescription} key="description" />}
      {data.keywords && <meta name="keyword" content={data.keywords} />}

      {data.canonicalURL && <meta property={`og:url`} content={data.canonicalURL} key="og:url" />}
      {data.metaTitle && <meta property={`og:title`} content={data.metaTitle} key="og:title" />}
      {data.metaDescription && <meta property={`og:description`} content={data.metaDescription} key="og:description" />}
      
      {/* the Q&A part at the browser search */}
      {data.structuredData && <script type="application/ld+json">{JSON.stringify(data.structuredData)}</script>}
    </head>}
  </>)
}

export default Seo