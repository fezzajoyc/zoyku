import type { Locale } from "@/lib/site";

/**
 * http-status-codes 的内置数据集:56 个常用状态码,按 1xx–5xx 分组。
 * 每行格式 "code|EnglishName|en|zh|ja|es|pt",释义为手写的一句话大白话。
 * 名称(英)参与搜索;释义按语言展示。
 */

export type StatusCode = { code: number; name: string; desc: Record<string, string> };
export type StatusGroup = { cls: string; label: Record<string, string>; codes: StatusCode[] };

const GROUPS_RAW: { cls: string; label: Record<string, string>; lines: string }[] = [
  {
    cls: "1xx",
    label: {
      en: "Informational",
      zh: "信息响应",
      ja: "情報レスポンス",
      es: "Informativos",
      pt: "Informativos",
    },
    lines: `
100|Continue|The server got the request headers; the client can send the body now.|服务器已收到请求头,客户端可以继续发送请求体。|サーバーがヘッダーを受信済み。ボディを送信して構いません。|El servidor recibió las cabeceras; el cliente ya puede enviar el cuerpo.|O servidor recebeu os cabeçalhos; o cliente já pode enviar o corpo.
101|Switching Protocols|The server agrees to switch protocols, e.g. to WebSocket.|服务器同意切换协议,例如升级到 WebSocket。|サーバーがプロトコルの切替に同意しました(例:WebSocket)。|El servidor acepta cambiar de protocolo, p. ej. a WebSocket.|O servidor aceita trocar de protocolo, ex.: para WebSocket.
102|Processing|The server is still working; no result is ready yet (WebDAV).|服务器仍在处理,暂时没有结果(WebDAV)。|サーバーは処理中です。まだ結果はありません(WebDAV)。|El servidor sigue procesando; aún no hay resultado (WebDAV).|O servidor ainda está processando; sem resultado por ora (WebDAV).
103|Early Hints|Preliminary headers the client may preload while the real response is built.|服务器在生成正式响应前,让客户端先预加载的提示头。|本レスポンスの準備中にプリロードできる暫定ヘッダーです。|Cabeceras preliminares para precargar mientras se prepara la respuesta real.|Cabeçalhos preliminares para precarregar enquanto a resposta real é preparada.
`,
  },
  {
    cls: "2xx",
    label: {
      en: "Successful",
      zh: "成功响应",
      ja: "成功レスポンス",
      es: "Exitosos",
      pt: "Bem-sucedidos",
    },
    lines: `
200|OK|Standard success: the request worked and the body carries the result.|标准成功:请求已生效,响应体携带结果。|標準的な成功:リクエストが成功し、ボディに結果が入ります。|Éxito estándar: la petición funcionó y el cuerpo lleva el resultado.|Sucesso padrão: a requisição funcionou e o corpo traz o resultado.
201|Created|Success — a new resource was created, typical after POST.|成功并创建了新资源,常见于 POST 之后。|成功し、新しいリソースが作成されました(POST の後の定番)。|Éxito: se creó un nuevo recurso, típico tras POST.|Sucesso — um novo recurso foi criado, típico após POST.
202|Accepted|The request was queued or accepted but not finished yet.|请求已被接受或排队,但尚未处理完成。|リクエストを受け付けましたが、処理はまだ完了していません。|La petición se aceptó o encoló, pero aún no terminó.|A requisição foi aceita ou enfileirada, mas ainda não concluída.
203|Non-Authoritative Information|The payload comes from a copy or cache, not the origin server.|响应内容来自副本或缓存,而非源服务器。|ボディはオリジンではなくキャッシュやコピー由来です。|El contenido viene de una copia o caché, no del servidor de origen.|O conteúdo vem de uma cópia ou cache, não do servidor de origem.
204|No Content|Success with an empty body, common after DELETE or a form save.|成功但响应体为空,常见于 DELETE 或表单保存之后。|成功ですがボディは空です。DELETE やフォーム保存の後によく使われます。|Éxito con cuerpo vacío, común tras DELETE o al guardar un formulario.|Sucesso com corpo vazio, comum após DELETE ou salvar um formulário.
205|Reset Content|Success; the client should reset the form or document view.|成功;客户端应重置表单或文档视图。|成功。クライアントはフォームや表示をリセットすべきです。|Éxito; el cliente debe reiniciar el formulario o la vista del documento.|Sucesso; o cliente deve redefinir o formulário ou a visualização.
206|Partial Content|Only part of the resource returned, e.g. a Range request or resumed video.|只返回资源的部分内容,如 Range 请求或续播视频。|リソースの一部のみ返します(Range リクエストや動画の途中再開など)。|Solo se devuelve parte del recurso, p. ej. una petición Range o vídeo reanudado.|Apenas parte do recurso é devolvida, ex.: requisição Range ou vídeo retomado.
207|Multi-Status|Several resources were affected and the body reports each one (WebDAV).|多个资源受影响,响应体逐一报告各自状态(WebDAV)。|複数リソースが影響を受け、ボディに個別の状態が入ります(WebDAV)。|Varios recursos afectados y el cuerpo informa de cada uno (WebDAV).|Vários recursos afetados e o corpo informa cada um (WebDAV).
`,
  },
  {
    cls: "3xx",
    label: {
      en: "Redirection",
      zh: "重定向",
      ja: "リダイレクト",
      es: "Redirecciones",
      pt: "Redirecionamentos",
    },
    lines: `
300|Multiple Choices|The resource has several representations; the client should pick one.|资源存在多个表示,客户端需要自行选择其一。|リソースに複数の表現があり、クライアントが選択します。|El recurso tiene varias representaciones; el cliente debe elegir una.|O recurso tem várias representações; o cliente deve escolher uma.
301|Moved Permanently|The resource lives at a new URL from now on; update your links.|资源已永久迁移到新 URL,应更新链接。|リソースは今後新しい URL にあります。リンクを更新してください。|El recurso vive desde ahora en una nueva URL; actualiza tus enlaces.|O recurso agora vive em uma nova URL; atualize seus links.
302|Found|Temporary redirect: use the new URL for now and keep the old one.|临时重定向:暂时改用新 URL,原地址仍然有效。|一時的なリダイレクト:当面は新しい URL を使います。|Redirección temporal: usa la nueva URL por ahora y conserva la antigua.|Redirecionamento temporário: use a nova URL por ora e mantenha a antiga.
303|See Other|Fetch the result from another URL with GET, typical after a form POST.|用 GET 从另一个 URL 获取结果,常见于表单提交之后。|別の URL から GET で結果を取得します(フォーム送信後の定番)。|Obtén el resultado en otra URL con GET, típico tras un POST de formulario.|Busque o resultado em outra URL com GET, típico após um POST de formulário.
304|Not Modified|The cached copy is still fresh; the client can reuse it.|缓存副本仍然有效,客户端可以直接复用。|キャッシュはまだ新鮮なので再利用できます。|La copia en caché sigue fresca; el cliente puede reutilizarla.|A cópia em cache ainda está fresca; o cliente pode reutilizá-la.
307|Temporary Redirect|Like 302, but the method and body must not change.|类似 302,但方法和请求体不得改变。|302 と似ていますが、メソッドとボディは変更禁止です。|Como 302, pero el método y el cuerpo no deben cambiar.|Como 302, mas o método e o corpo não podem mudar.
308|Permanent Redirect|Like 301, but the method and body must not change.|类似 301,但方法和请求体不得改变。|301 と似ていますが、メソッドとボディは変更禁止です。|Como 301, pero el método y el cuerpo no deben cambiar.|Como 301, mas o método e o corpo não podem mudar.
`,
  },
  {
    cls: "4xx",
    label: {
      en: "Client error",
      zh: "客户端错误",
      ja: "クライアントエラー",
      es: "Error del cliente",
      pt: "Erro do cliente",
    },
    lines: `
400|Bad Request|The request is malformed and the server refuses to process it.|请求格式有误,服务器拒绝处理。|リクエストの形式が不正で、サーバーが処理を拒否しています。|La petición está mal formada y el servidor se niega a procesarla.|A requisição está malformada e o servidor se recusa a processá-la.
401|Unauthorized|Credentials are missing or wrong; log in or send valid authentication.|缺少凭证或凭证错误,需要登录或提供有效认证。|資格情報がないか誤っています。ログインや正しい認証が必要です。|Faltan credenciales o son erróneas; inicia sesión o envía autenticación válida.|Credenciais ausentes ou erradas; faça login ou envie autenticação válida.
402|Payment Required|Reserved for payment; rarely used outside experimental APIs.|为付款保留的代码,实际 API 中很少使用。|支払い用に予約されたコードで、実運用ではほぼ使われません。|Reservado para pago; rara vez se usa fuera de APIs experimentales.|Reservado para pagamento; raramente usado fora de APIs experimentais.
403|Forbidden|The server understood the request but refuses to authorize it.|服务器理解了请求,但拒绝授权执行。|リクエストは理解されましたが、認可が拒否されています。|El servidor entendió la petición pero se niega a autorizarla.|O servidor entendeu a requisição mas se recusa a autorizá-la.
404|Not Found|No resource exists at this URL; the classic missing page.|该 URL 下不存在任何资源,经典的“页面找不到”。|この URL にリソースが存在しません。おなじみの「見つかりません」。|No existe ningún recurso en esta URL; la clásica página no encontrada.|Nenhum recurso existe nesta URL; a clássica página não encontrada.
405|Method Not Allowed|This HTTP method is not supported by the resource, e.g. DELETE on a read-only URL.|该资源不支持此 HTTP 方法,例如对只读接口使用 DELETE。|そのリソースはこのメソッドに対応していません(読み取り専用への DELETE など)。|El recurso no admite este método HTTP, p. ej. DELETE en una URL de solo lectura.|O recurso não suporta este método HTTP, ex.: DELETE numa URL somente leitura.
406|Not Acceptable|The server cannot produce a response matching the Accept headers.|服务器无法生成符合 Accept 头要求的响应。|Accept ヘッダーに一致するレスポンスを生成できません。|El servidor no puede producir una respuesta que cumpla las cabeceras Accept.|O servidor não pode produzir uma resposta que atenda aos cabeçalhos Accept.
407|Proxy Authentication Required|The proxy in front needs its own credentials first.|前置代理服务器要求先完成它自己的认证。|手前のプロキシがまず独自の認証を求めています。|El proxy intermedio exige primero sus propias credenciales.|O proxy à frente exige primeiro as próprias credenciais.
408|Request Timeout|The client took too long to send the request; the server gave up waiting.|客户端发送请求耗时过长,服务器放弃等待。|クライアントの送信が遅すぎて、サーバーが待つのを諦めました。|El cliente tardó demasiado en enviar la petición; el servidor dejó de esperar.|O cliente demorou demais para enviar a requisição; o servidor desistiu de esperar.
409|Conflict|The request clashes with the current state, e.g. an editing conflict.|请求与当前状态冲突,例如编辑冲突。|リクエストが現在の状態と競合しています(編集の衝突など)。|La petición choca con el estado actual, p. ej. un conflicto de edición.|A requisição conflita com o estado atual, ex.: um conflito de edição.
410|Gone|The resource was removed for good; links to it should be deleted.|资源已被永久移除,指向它的链接应当删除。|リソースは完全に削除されました。リンクは取り除くべきです。|El recurso se eliminó para siempre; borra los enlaces que apuntan a él.|O recurso foi removido para sempre; apague os links que apontam para ele.
411|Length Required|The server needs a Content-Length header and got none.|服务器要求 Content-Length 头,但没有收到。|Content-Length ヘッダーが必要ですが、送られていません。|El servidor necesita una cabecera Content-Length y no la recibió.|O servidor precisa de um cabeçalho Content-Length e não o recebeu.
412|Precondition Failed|A request precondition such as If-Match did not hold.|If-Match 之类的请求前置条件未满足。|If-Match などの前提条件が満たされませんでした。|Una precondición como If-Match no se cumplió.|Uma pré-condição como If-Match não foi atendida.
413|Payload Too Large|The request body exceeds the size the server accepts.|请求体超过了服务器允许的大小。|リクエストボディがサーバーの許容サイズを超えています。|El cuerpo de la petición excede el tamaño que acepta el servidor.|O corpo da requisição excede o tamanho que o servidor aceita.
414|URI Too Long|The URL is longer than the server is willing to parse.|URL 超过了服务器愿意解析的长度。|URL がサーバーが処理できる長さを超えています。|La URL es más larga de lo que el servidor está dispuesto a procesar.|A URL é mais longa do que o servidor aceita processar.
415|Unsupported Media Type|The payload format is not supported, e.g. XML where JSON is expected.|载荷格式不受支持,例如期望 JSON 却发来 XML。|想定外の形式です(JSON を期待する場所に XML など)。|El formato del contenido no se admite, p. ej. XML donde se esperaba JSON.|O formato do conteúdo não é suportado, ex.: XML onde se esperava JSON.
416|Range Not Satisfiable|The requested byte range does not fit in the resource.|请求的字节区间超出了资源范围。|要求したバイト範囲がリソースに収まりません。|El rango de bytes solicitado no cabe en el recurso.|O intervalo de bytes solicitado não cabe no recurso.
417|Expectation Failed|The Expect header could not be satisfied by the server.|服务器无法满足 Expect 头的要求。|Expect ヘッダーの要求をサーバーが満たせませんでした。|El servidor no pudo satisfacer la cabecera Expect.|O servidor não pôde atender o cabeçalho Expect.
418|I'm a teapot|An April Fools' joke from RFC 2324; servers return it for fun or rate limiting.|源自 RFC 2324 的愚人节玩笑,有的服务器用它搞笑或限流。|RFC 2324 のエイプリルフールネタ。冗談やレート制限で返すサーバーも。|Una broma del RFC 2324; algunos servidores la usan por diversión o para limitar peticiones.|Uma piada do RFC 2324; alguns servidores a usam por diversão ou para limitar requisições.
421|Misdirected Request|The request was sent to a server unable to produce a response.|请求被发到了一个无法产生响应的服务器。|レスポンスを作れないサーバーにリクエストが送られました。|La petición llegó a un servidor incapaz de producir una respuesta.|A requisição foi enviada a um servidor incapaz de produzir uma resposta.
422|Unprocessable Content|Syntactically valid but semantically wrong, common in validation errors.|语法有效但语义有误,常见于校验失败场景。|構文は正しいが意味的に不正(バリデーションエラーで定番)。|Sintácticamente válido pero semánticamente erróneo; típico en errores de validación.|Sintaticamente válido, mas semanticamente errado; típico em erros de validação.
425|Too Early|The server refuses to risk processing a possibly replayed request.|服务器拒绝冒险处理可能被重放的请求。|再生(リプレイ)の恐れがあるリクエストを処理しない判断です。|El servidor se niega a procesar una petición posiblemente reenviada.|O servidor se recusa a processar uma requisição possivelmente reenviada.
426|Upgrade Required|The client must switch protocols, e.g. to TLS.|客户端必须切换协议,例如升级到 TLS。|クライアントはプロトコルの切替(TLS への移行など)が必要です。|El cliente debe cambiar de protocolo, p. ej. a TLS.|O cliente deve trocar de protocolo, ex.: para TLS.
428|Precondition Required|The server demands conditional headers to prevent lost updates.|服务器要求携带条件头,以防止更新丢失。|更新の上書き防止のため条件ヘッダーが必須です。|El servidor exige cabeceras condicionales para evitar actualizaciones perdidas.|O servidor exige cabeçalhos condicionais para evitar atualizações perdidas.
429|Too Many Requests|Rate limit hit; slow down and retry later.|触发限流,请降低频率稍后重试。|レート制限に達しました。間隔をあけて再試行してください。|Límite de peticiones alcanzado; reduce el ritmo y reintenta luego.|Limite de requisições atingido; diminua o ritmo e tente de novo depois.
431|Request Header Fields Too Large|Headers are too big; usually an oversized cookie.|请求头过大,通常是 Cookie 超标。|ヘッダーが大きすぎます。大抵は巨大な Cookie が原因です。|Las cabeceras son demasiado grandes; suele ser una cookie enorme.|Os cabeçalhos são grandes demais; geralmente é um cookie gigante.
451|Unavailable For Legal Reasons|Access is blocked for legal reasons, such as a court order.|因法律原因(如法院指令)禁止访问。|裁判所命令など法的な理由でアクセスが遮断されています。|Acceso bloqueado por razones legales, como una orden judicial.|Acesso bloqueado por motivos legais, como uma ordem judicial.
`,
  },
  {
    cls: "5xx",
    label: {
      en: "Server error",
      zh: "服务器错误",
      ja: "サーバーエラー",
      es: "Error del servidor",
      pt: "Erro do servidor",
    },
    lines: `
500|Internal Server Error|Something broke inside the server; check its error logs.|服务器内部出错,请检查其错误日志。|サーバー内部でエラーが発生しました。エラーログを確認してください。|Algo se rompió dentro del servidor; revisa sus registros de errores.|Algo quebrou dentro do servidor; confira os logs de erro.
501|Not Implemented|The server does not support the functionality needed for this request.|服务器不支持该请求所需的功能。|サーバーがこのリクエストに必要な機能に対応していません。|El servidor no admite la funcionalidad que requiere la petición.|O servidor não suporta a funcionalidade necessária a esta requisição.
502|Bad Gateway|An upstream server returned an invalid response to the gateway.|上游服务器返回了无效响应,网关无法转发。|上流サーバーから不正な応答が返り、ゲートウェイが処理できません。|Un servidor upstream devolvió una respuesta inválida a la pasarela.|Um servidor upstream devolveu uma resposta inválida ao gateway.
503|Service Unavailable|The server is overloaded or down for maintenance; try again later.|服务器过载或停机维护,请稍后再试。|サーバーが過負荷またはメンテナンス中です。後でお試しください。|El servidor está sobrecargado o en mantenimiento; reintenta más tarde.|O servidor está sobrecarregado ou em manutenção; tente de novo depois.
504|Gateway Timeout|The gateway waited too long for the upstream server.|网关等待上游服务器超时。|ゲートウェイが上流サーバーを待ちすぎました。|La pasarela esperó demasiado al servidor upstream.|O gateway esperou demais pelo servidor upstream.
505|HTTP Version Not Supported|The HTTP version in the request is not supported.|请求使用的 HTTP 版本不受支持。|リクエストの HTTP バージョンに対応していません。|La versión HTTP de la petición no está soportada.|A versão HTTP da requisição não é suportada.
506|Variant Also Negotiates|Content negotiation hit a circular server configuration.|内容协商陷入服务器配置的循环错误。|コンテンツネゴシエーションが循環設定に陥りました。|La negociación de contenido chocó con una configuración circular.|A negociação de conteúdo esbarrou numa configuração circular.
507|Insufficient Storage|The server ran out of space to complete the request (WebDAV).|服务器存储空间不足,无法完成请求(WebDAV)。|ストレージ不足でリクエストを完了できません(WebDAV)。|El servidor se quedó sin espacio para completar la petición (WebDAV).|O servidor ficou sem espaço para concluir a requisição (WebDAV).
508|Loop Detected|The server detected an infinite loop while processing (WebDAV).|处理时检测到无限循环(WebDAV)。|処理中に無限ループを検出しました(WebDAV)。|El servidor detectó un bucle infinito al procesar (WebDAV).|O servidor detectou um loop infinito ao processar (WebDAV).
511|Network Authentication Required|The network needs a login first, typical of public Wi-Fi portals.|需要先登录网络,常见于公共 Wi-Fi 认证页。|先にネットワークへのログインが必要です(公衆 Wi-Fi で定番)。|La red exige iniciar sesión primero, típico de portales Wi-Fi públicos.|A rede exige login primeiro, típico de portais de Wi-Fi público.
`,
  },
];

export const STATUS_GROUPS: StatusGroup[] = GROUPS_RAW.map((g) => ({
  cls: g.cls,
  label: g.label,
  codes: g.lines
    .trim()
    .split("\n")
    .map((line) => {
      const [code, name, en, zh, ja, es, pt] = line.split("|");
      return { code: Number(code), name, desc: { en, zh, ja, es, pt } };
    }),
}));

export const STATUS_TOTAL = STATUS_GROUPS.reduce((n, g) => n + g.codes.length, 0);
