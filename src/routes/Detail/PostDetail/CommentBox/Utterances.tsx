import { CONFIG } from "site.config"
import { useEffect } from "react"
import styled from "@emotion/styled"
import useScheme from "src/hooks/useScheme"
import { useRouter } from "next/router"

//TODO: useRef?

type Props = {
  issueTerm: string
}

const Utterances: React.FC<Props> = ({ issueTerm }) => {
  console.log("issueTerm: ", process.env.NEXT_PUBLIC_UTTERANCES_REPO)
  const [scheme] = useScheme()
  const router = useRouter()

  useEffect(() => {
    const theme = scheme === "light" ? "github-light" : "github-dark"
    const script = document.createElement("script")
    const anchor = document.getElementById("comments")
    if (!anchor) return

    script.setAttribute("src", "https://utteranc.es/client.js")
    script.setAttribute("crossorigin", "anonymous")
    script.setAttribute("async", `true`)
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("theme", theme)
    script.setAttribute("label", "Comment")
    script.setAttribute("repo", "HA-SEUNG-JEONG/morethan--haseung-log")
    const config: { [key: string]: string } = CONFIG.utterances.config
    Object.keys(config).forEach((key) => {
      script.setAttribute(key, config[key])
    })
    anchor.appendChild(script)
    return () => {
      anchor.innerHTML = ""
    }
  }, [scheme, router, issueTerm])
  return (
    <>
      <StyledWrapper id="comments">
        <div className="utterances-frame"></div>
      </StyledWrapper>
    </>
  )
}

export default Utterances

const StyledWrapper = styled.div`
  @media (min-width: 768px) {
    margin-left: -4rem;
  }
`
