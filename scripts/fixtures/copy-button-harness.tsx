import { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { CopyButton } from "../../components/client-ui";
import { I18nProvider } from "../../components/i18n-provider";
import { dict } from "../../lib/i18n";
import { isLocale } from "../../lib/site";

declare global {
  interface Window {
    __copyHarness: { ready: boolean; getterCalls: number; callbacks: number[] };
  }
}

window.__copyHarness = { ready: false, getterCalls: 0, callbacks: [] };
const requestedLocale = new URLSearchParams(location.search).get("locale") ?? "en";
const locale = isLocale(requestedLocale) ? requestedLocale : "en";
document.documentElement.lang = locale;
document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";

function Harness() {
  const [text, setText] = useState("Alpha 中文 😀");
  const [mounted, setMounted] = useState(true);
  const [getter, setGetter] = useState(false);
  const [throws, setThrows] = useState(false);
  const [callbackVersion, setCallbackVersion] = useState(0);
  const [callbackCount, setCallbackCount] = useState(0);
  const [renders, setRenders] = useState(0);
  const getValue = useCallback(() => {
    window.__copyHarness.getterCalls++;
    if (throws) throw new Error("Value unavailable");
    return text;
  }, [text, throws]);
  const onCopied = useCallback(() => {
    window.__copyHarness.callbacks.push(callbackVersion);
    setCallbackCount(count => count + 1);
  }, [callbackVersion]);
  useEffect(() => { window.__copyHarness.ready = true; }, []);
  return <I18nProvider locale={locale} dict={dict(locale)}>
    <main>
      <label htmlFor="source">Source</label>
      <textarea id="source" data-testid="source" value={text} onChange={event => setText(event.target.value)} />
      <label><input data-testid="getter" type="checkbox" checked={getter} onChange={event => setGetter(event.target.checked)} />Use value function</label>
      <label><input data-testid="getter-throws" type="checkbox" checked={throws} onChange={event => setThrows(event.target.checked)} />Throw from value function</label>
      <button data-testid="toggle" onClick={() => setMounted(value => !value)}>Toggle component</button>
      <button data-testid="rerender" onClick={() => setRenders(value => value + 1)}>Unrelated render {renders}</button>
      <button data-testid="callback-version" onClick={() => setCallbackVersion(value => value + 1)}>Change callback</button>
      <output data-testid="callback-count">{callbackCount}</output>
      <div data-copy-subject>{mounted && <CopyButton value={getter ? getValue : text} onCopied={onCopied} />}</div>
    </main>
  </I18nProvider>;
}

createRoot(document.getElementById("root")!).render(<Harness />);
