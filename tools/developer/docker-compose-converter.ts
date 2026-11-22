import { DevEngineDockerCompose } from "../_engines/dev-engine-docker-compose";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "docker-compose-converter",
  category: "developer",
  icon: "code",
  engine: { component: DevEngineDockerCompose },
  related: ["json-yaml-converter", "toml-converter", "json-formatter", "json-diff"],
  copy: {
    en: {
      name: "Docker Run to Compose Converter",
      tagline:
        "Turn any docker run command into a docker-compose service — ports, volumes, environment variables, restart policies and resource limits mapped faithfully, with unmapped flags kept as comments. Free, private, offline.",
      intro: [
        "Most containers start as a one-liner: docker run -d -p 8080:80 -v ... nginx. When the setup grows — multiple services, shared networks, version-controlled config — you rewrite it into a docker-compose.yml by hand, and that is where ports and environment variables get lost. This converter does the mechanical part: paste the docker run command, get a compose v2 services: fragment with image, ports, volumes, environment, restart policy and resource limits already in place.",
        "The mapping follows the official docker run reference and the Compose file specification. Common flags (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, --entrypoint, --device, and more) map to their documented Compose attributes; flags that have no Compose equivalent are kept as \"# unsupported\" comments so nothing disappears silently. The parser handles quoting, line continuations and combined short flags like -itd.",
        "Everything runs locally in your browser — no uploads, no tracking. Review the generated file with docker compose config before running it.",
      ],
      steps: [
        "Copy your docker run command (multi-line commands with \\ continuations work too).",
        "Paste it into the input box and click Convert.",
        "Copy the generated service fragment into your docker-compose.yml — check the hints below the output for unmapped flags.",
      ],
      faqs: [
        {
          q: "What happens to flags like --rm or -d that have no Compose equivalent?",
          a: "--rm and -P are kept as YAML comments and listed in the hints, because Compose services are long-running by design (use \"docker compose run --rm\" for one-off tasks). -d is simply not needed: Compose services always run detached. No flag is dropped silently — anything the converter cannot map ends up as a visible \"# unsupported\" comment.",
        },
        {
          q: "Which flags are supported, and how is the service named?",
          a: "Common flags map to documented Compose attributes: --name/-p/--publish, -v/--volume, --mount, -e/--env, --env-file, --restart, --network, -w/--workdir, -u/--user, -h/--hostname, -m/--memory, --cpus, --label, --entrypoint, --device, --tmpfs, --cap-add/--cap-drop, --pull and more. The container name becomes the service key and is also written to container_name so the real container keeps its exact name; without --name, the last path segment of the image is used.",
        },
      ],
    },
    zh: {
      name: "docker run → docker-compose 转换",
      tagline:
        "把 docker run 命令转成 docker-compose 服务片段:端口、卷、环境变量、重启策略、资源限制如实映射,无法对应的 flag 保留为注释。免费、即时、离线可用。",
      intro: [
        "大多数容器都始于一行命令:docker run -d -p 8080:80 -v ... nginx。当部署变复杂——多服务、共享网络、需要版本化的配置——就得手工改写成 docker-compose.yml,端口和环境变量往往在这一步丢失。本工具负责机械部分:粘贴 docker run 命令,得到 compose v2 的 services: 片段,image、ports、volumes、environment、restart、资源限制一应俱全。",
        "映射关系以 docker run 官方参考和 Compose 规范为准。常见 flag(--name、-p、-v、-e、--restart、--network、-w、-u、-h、--memory、--cpus、--mount、--device、--label、--entrypoint 等)映射到 Compose 对应属性;没有 Compose 等价物的 flag 会保留为 \"# unsupported\" 注释,绝不静默丢弃。解析器支持引号、\\ 续行和 -itd 这类组合短 flag。",
        "全部在本机浏览器完成——不上传、不追踪。运行前建议用 docker compose config 复核生成的文件。",
      ],
      steps: [
        "复制你的 docker run 命令(带 \\ 续行的多行命令也可以)。",
        "粘贴到输入框,点击转换。",
        "把生成的 service 片段复制进 docker-compose.yml——留意输出下方的未映射 flag 提示。",
      ],
      faqs: [
        {
          q: "--rm、-d 这类没有 Compose 对应物的 flag 会怎样?",
          a: "--rm 和 -P 会保留为 YAML 注释并列入提示区,因为 Compose 服务本来就是长驻的(一次性任务用 \"docker compose run --rm\")。-d 则无需映射:Compose 服务默认后台运行。没有任何 flag 会被静默丢弃——转换器无法映射的内容都会以 \"# unsupported\" 注释出现。",
        },
        {
          q: "支持哪些 flag?service 名怎么定?",
          a: "常见 flag 映射到 Compose 文档属性:--name/-p/--publish、-v/--volume、--mount、-e/--env、--env-file、--restart、--network、-w/--workdir、-u/--user、-h/--hostname、-m/--memory、--cpus、--label、--entrypoint、--device、--tmpfs、--cap-add/--cap-drop、--pull 等。容器名会成为 service key 并写入 container_name,保证真实容器名不变;没有 --name 时取镜像名最后一段。",
        },
      ],
    },
    ja: {
      name: "docker run → docker-compose 変換",
      tagline:
        "docker run コマンドを docker-compose サービス断片へ即時変換 — ポート・ボリューム・環境変数・再起動ポリシー・リソース制限を忠実にマッピングし、対応しないフラグはコメントとして保持。無料・プライベート・オフライン。",
      intro: [
        "多くのコンテナは 1 行から始まります:docker run -d -p 8080:80 -v ... nginx。構成が複雑になると(複数サービス、共有ネットワーク、バージョン管理される設定)、手作業で docker-compose.yml に書き直す必要があり、そこでポートや環境変数が失われがちです。このツールは機械的な部分を担当します:docker run コマンドを貼り付けると、image・ports・volumes・environment・restart・リソース制限が揃った compose v2 の services: 断片を生成します。",
        "マッピングは docker run 公式リファレンスと Compose ファイル仕様に従います。主要なフラグ(--name、-p、-v、-e、--restart、--network、-w、-u、-h、--memory、--cpus、--mount、--device、--label、--entrypoint など)はドキュメントされた Compose 属性に対応し、相当物がないフラグは \"# unsupported\" コメントとして保持されるため、何も黙って失われません。パーサーは引用符、\\ による行継続、-itd のような組み合わせ短フラグに対応しています。",
        "すべてブラウザ内で完結 — アップロードも追跡もなし。実行前に docker compose config で生成ファイルを確認してください。",
      ],
      steps: [
        "docker run コマンドをコピーします(\\ による複数行コマンドも可)。",
        "入力欄に貼り付けて変換をクリックします。",
        "生成されたサービス断片を docker-compose.yml に貼り付けます — 出力下の未対応フラグのヒントを確認してください。",
      ],
      faqs: [
        {
          q: "--rm や -d など Compose に相当物がないフラグはどうなりますか?",
          a: "--rm と -P は YAML コメントとして保持され、ヒントにも表示されます。Compose サービスは長時間実行が前提のためです(単発実行は \"docker compose run --rm\")。-d はマッピング不要です:Compose サービスは常にバックグラウンドで実行されます。フラグが黙って捨てられることはなく、変換できないものはすべて \"# unsupported\" コメントとして現れます。",
        },
        {
          q: "どのフラグに対応していますか?サービス名はどう決まりますか?",
          a: "主要なフラグはドキュメントされた Compose 属性にマッピングされます:--name/-p/--publish、-v/--volume、--mount、-e/--env、--env-file、--restart、--network、-w/--workdir、-u/--user、-h/--hostname、-m/--memory、--cpus、--label、--entrypoint、--device、--tmpfs、--cap-add/--cap-drop、--pull など。コンテナ名がサービスキーになり、実際のコンテナ名を保つため container_name にも書き込まれます。--name がない場合はイメージ名の最終セグメントを使用します。",
        },
      ],
    },
    es: {
      name: "Conversor docker run a docker-compose",
      tagline:
        "Convierta comandos docker run en servicios de docker-compose — puertos, volúmenes, variables de entorno, políticas de reinicio y límites de recursos mapeados fielmente, con los flags sin equivalente conservados como comentarios. Gratis, privado, sin conexión.",
      intro: [
        "La mayoría de los contenedores empiezan como una sola línea: docker run -d -p 8080:80 -v ... nginx. Cuando la configuración crece — varios servicios, redes compartidas, configuración versionada — hay que reescribirla a mano en un docker-compose.yml, y ahí se pierden puertos y variables de entorno. Este conversor hace la parte mecánica: pegue el comando docker run y obtenga un fragmento services: de compose v2 con image, ports, volumes, environment, restart policy y límites de recursos ya colocados.",
        "El mapeo sigue la referencia oficial de docker run y la especificación del archivo Compose. Los flags comunes (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, --entrypoint y más) se asignan a los atributos documentados de Compose; los flags sin equivalente se conservan como comentarios \"# unsupported\", así nada desaparece en silencio. El analizador maneja comillas, continuaciones de línea con \\ y flags cortos combinados como -itd.",
        "Todo se ejecuta localmente en su navegador — sin subidas, sin rastreo. Revise el archivo generado con docker compose config antes de ejecutarlo.",
      ],
      steps: [
        "Copie su comando docker run (los comandos multilínea con \\ también funcionan).",
        "Péguelo en el cuadro de entrada y haga clic en Convertir.",
        "Copie el fragmento generado en su docker-compose.yml — revise las sugerencias bajo la salida para flags sin mapear.",
      ],
      faqs: [
        {
          q: "¿Qué ocurre con flags como --rm o -d que no tienen equivalente en Compose?",
          a: "--rm y -P se conservan como comentarios YAML y se listan en las sugerencias, porque los servicios de Compose son de larga duración por diseño (use \"docker compose run --rm\" para tareas puntuales). -d no hace falta: los servicios de Compose siempre se ejecutan en segundo plano. Ningún flag se descarta silenciosamente — todo lo que el conversor no pueda mapear aparece como comentario \"# unsupported\".",
        },
        {
          q: "¿Qué flags están soportados y cómo se nombra el servicio?",
          a: "Los flags comunes se asignan a atributos documentados de Compose: --name/-p/--publish, -v/--volume, --mount, -e/--env, --env-file, --restart, --network, -w/--workdir, -u/--user, -h/--hostname, -m/--memory, --cpus, --label, --entrypoint, --device, --tmpfs, --cap-add/--cap-drop, --pull y más. El nombre del contenedor se convierte en la clave del servicio y también se escribe en container_name para que el contenedor real conserve su nombre exacto; sin --name se usa el último segmento de la imagen.",
        },
      ],
    },
    pt: {
      name: "Conversor docker run para docker-compose",
      tagline:
        "Converta comandos docker run em serviços do docker-compose — portas, volumes, variáveis de ambiente, políticas de reinício e limites de recursos mapeados fielmente, com flags sem equivalente mantidos como comentários. Grátis, privado, offline.",
      intro: [
        "A maioria dos contêineres começa como uma linha: docker run -d -p 8080:80 -v ... nginx. Quando a configuração cresce — vários serviços, redes compartilhadas, configuração versionada — é preciso reescrevê-la à mão num docker-compose.yml, e é aí que portas e variáveis de ambiente se perdem. Este conversor faz a parte mecânica: cole o comando docker run e receba um fragmento services: do compose v2 com image, ports, volumes, environment, política de reinício e limites de recursos já no lugar.",
        "O mapeamento segue a referência oficial do docker run e a especificação do arquivo Compose. Os flags comuns (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, --entrypoint e mais) são mapeados aos atributos documentados do Compose; flags sem equivalente são mantidos como comentários \"# unsupported\", então nada desaparece silenciosamente. O parser trata aspas, continuação de linha com \\ e flags curtos combinados como -itd.",
        "Tudo é executado localmente no seu navegador — sem uploads, sem rastreamento. Revise o arquivo gerado com docker compose config antes de executá-lo.",
      ],
      steps: [
        "Copie seu comando docker run (comandos multilinha com \\ também funcionam).",
        "Cole na caixa de entrada e clique em Converter.",
        "Copie o fragmento gerado para o seu docker-compose.yml — veja as dicas abaixo da saída para flags não mapeados.",
      ],
      faqs: [
        {
          q: "O que acontece com flags como --rm ou -d que não têm equivalente no Compose?",
          a: "--rm e -P ficam como comentários YAML e aparecem nas dicas, porque os serviços do Compose são de longa duração por design (use \"docker compose run --rm\" para tarefas pontuais). -d não é necessário: os serviços do Compose sempre rodam em segundo plano. Nenhum flag é descartado silenciosamente — tudo que o conversor não puder mapear aparece como comentário \"# unsupported\".",
        },
        {
          q: "Quais flags são suportados e como o serviço é nomeado?",
          a: "Os flags comuns são mapeados a atributos documentados do Compose: --name/-p/--publish, -v/--volume, --mount, -e/--env, --env-file, --restart, --network, -w/--workdir, -u/--user, -h/--hostname, -m/--memory, --cpus, --label, --entrypoint, --device, --tmpfs, --cap-add/--cap-drop, --pull e mais. O nome do contêiner vira a chave do serviço e também é escrito em container_name para que o contêiner real mantenha o nome exato; sem --name, usa-se o último segmento da imagem.",
        },
      ],
    },
  },
});
