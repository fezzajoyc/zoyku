import { DevEngineChmodCalculator } from "../_engines/dev-engine-chmod";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "chmod-calculator",
  category: "developer",
  icon: "shield",
  engine: { component: DevEngineChmodCalculator },
  related: ["hash-generator", "uuid-generator", "http-status-codes", "cron-explainer", "url-parser", "json-formatter", "jwt-decoder"],
  copy: {
    en: {
      name: "chmod Calculator",
      tagline: "Toggle read/write/execute per owner, group and others to get the octal and rwx symbolic modes live, with setuid/setgid/sticky and a ready chmod command.",
      intro: [
        "Setting permissions on a deploy script, debugging an nginx 403, or writing a Dockerfile COPY --chmod line — Unix file permissions are a 3×3 matrix: owner, group and others each get read (4), write (2) and execute (1), and the digits stack into the octal mode. Check boxes instead of recomputing in your head.",
        "The three special bits are covered too: setuid (4000) runs a program as the file's owner, setgid (2000) as its group, and sticky (1000) on a directory lets only the owner delete entries — think /tmp with its 1777.",
        "Prefer working backwards? Type a number like 644 and the checkboxes sync to it, then copy the ready-made chmod command. Symbolic and octal forms are kept in sync live, so the mapping between rwxr-xr-x and 755 is always visible.",
        "Man pages define the bits but never show the arithmetic; this calculator makes the 4-2-1 weighting explicit and renders the resulting permission string as the kernel sees it — faster and less error-prone than mental octal, especially once setuid/setgid bits enter the mix."
      ],
      steps: ["Check read, write and execute for owner, group and others.", "Optionally enable setuid, setgid or sticky and watch the four-digit mode appear.", "Type a numeric mode like 644 into the reverse field to sync the checkboxes.", "Copy the chmod command and run it in your terminal."],
      faqs: [
        { q: "What is the difference between 644 and 664?", a: "Only the group digit changes: 644 gives the group read-only access (rw-r--r--), while 664 also lets the group write (rw-rw-r--). Both leave others with read-only. Use 644 for personal files and 664 when a shared group edits the file." },
        { q: "What do s and t mean in the symbolic mode?", a: "They replace x when a special bit is set: a lowercase s in the owner or group triad means setuid or setgid combined with execute (rws), an uppercase S means the special bit without execute (rwS), and t or T marks the sticky bit on the others triad — /tmp shows drwxrwxrwt." },
        { q: "What is a safe default for web files?", a: "Directories 755 and files 644 are the usual rule: you (the owner) can write, everyone else can only read. Never grant write to others (x2 in the last digit) unless a specific process truly needs it." },
      ],
      deepDive: [
        {
          heading: "Where 755 and 644 come from: the 4-2-1 arithmetic",
          paragraphs: [
            "Each of the three permission classes — owner, group, others — holds three bits: read, write, execute. The octal digit is the sum of the enabled bits weighted 4-2-1, which is why the digit can only ever be 0-7 and each value maps to exactly one rwx string. 7 is rwx (4+2+1), 6 is rw- (4+2), 5 is r-x (4+1), 4 is r-- (4). No combination can produce, say, a 3 that means something other than -wx, so the notation is unambiguous once you internalize the weights.",
            "That arithmetic explains the two workhorse modes. 755 (rwxr-xr-x) means the owner does everything while everyone else can enter and read but not modify — the natural mode for directories and for scripts that others must execute. 644 (rw-r--r--) removes execute from the picture entirely: readable by all, writable only by the owner, which fits regular files. The reason web servers want 644 on files and 755 on directories is simply that entering a directory is an execute operation, not a read.",
            "The umask completes the picture. A typical umask of 022 is subtracted from 666/777 defaults at creation time, which is precisely why new files land at 644 and new directories at 755. When a file keeps \"losing\" its execute bit or group write keeps disappearing, the culprit is usually the umask or an overzealous sync tool, not chmod itself — checking the mode with stat before re-granting saves a lot of head-scratching.",
          ],
        },
        {
          heading: "The special bits: setuid, setgid and sticky",
          paragraphs: [
            "Beyond the nine permission bits sit three more. setuid (octal 4000) makes an executable run with the file owner's identity instead of the caller's — the mechanism behind passwd, which must write to root-owned files while being runnable by everyone. setgid (2000) does the same with the group, and on directories it makes new files inherit the directory's group, which is how shared team folders keep coherent ownership.",
            "The sticky bit (1000) is mostly historical for files, but on directories it means only the file's owner (or root) can delete or rename entries inside it. /tmp is the canonical example: 1777, world-writable, yet users cannot remove each other's files. Docker's COPY --chmod and CI scripts occasionally need these digits spelled out, which is exactly when the four-digit form matters — the leading digit is the special-bit octal, 0 when absent.",
            "The symbolic notation encodes the state in place of x: lowercase s means the special bit plus execute (rws), uppercase S means the special bit without execute — usually a mistake, since a non-executable setuid file does nothing. The same logic applies to t versus T on directories. Seeing rwS or rwT in a listing is a signal to grant execute or clear the special bit.",
          ],
        },
        {
          heading: "Practical pitfalls and how to check modes safely",
          paragraphs: [
            "The most common operational mistake is chmod -R 777 as a fix for a permissions error. It makes the immediate problem vanish and leaves a world-writable tree behind — a genuine security hole on any multi-user host, and useless as a diagnosis since it destroys the evidence of what the real mode was. When a service cannot read a file, work down the path instead: every directory on the way needs execute (and usually read) for the service user, and the failure is often one parent directory, not the file.",
            "A related trap: chmod 644 on a directory strips its execute bit (r--r--r--), and nobody — including the owner — can then enter it, because crossing into a directory is an execute. Directories almost always want at least 755 or 700, never 644. When restoring modes from documentation, prefer the explicit digit form (chmod 755) over symbolic expressions like +x whose effect depends on the current mode and umask.",
            "A calculator like this one is deliberately check-only and offline: it computes the digits in your browser and hands you a command to review before running. That keeps the workflow where it belongs — you paste the command into your own terminal, against your own files, and nothing about your filesystem or directory structure ever leaves the machine.",
          ],
        },
      ],
    },
    zh: {
      name: "chmod 计算器",
      tagline: "按所有者、组、其他用户勾选读写执行,实时得到八进制与 rwx 符号模式,支持 setuid/setgid/sticky 和一键复制的 chmod 命令。",
      intro: ["Unix 文件权限是一张 3×3 矩阵:所有者、组、其他用户各有读(4)、写(2)、执行(1)三种权限,三类各自相加得到熟悉的八进制模式——所有者读写执行、其余人只读执行就是 755,符号形式 rwxr-xr-x。用勾选框来拼权限,远比心算八进制快。",
        "三个特殊权限位同样覆盖:setuid(4000)让程序以文件所有者身份运行,setgid(2000)以属组身份运行,目录上的 sticky(1000)只允许所有者删除其中的条目——比如权限为 1777 的 /tmp。喜欢反向操作?输入 644 这样的数字,勾选框会自动同步,然后复制现成的 chmod 命令即可。"],
      steps: ["为所有者、组、其他用户勾选读、写、执行。", "按需启用 setuid、setgid 或 sticky,四位数字模式会实时出现。", "在反向输入框输入 644 这类数字,勾选框自动同步。", "复制 chmod 命令,在终端里执行。"],
      faqs: [
        { q: "644 和 664 有什么区别?", a: "只有组的数字不同:644 给组只读权限(rw-r--r--),664 让组也能写(rw-rw-r--)。两者对其他用户都是只读。个人文件用 644,共享组需要编辑时用 664。" },
        { q: "符号模式里的 s 和 t 是什么意思?", a: "设置特殊位后它们会顶替 x:所有者或组三元组中的小写 s 表示 setuid/setgid 与执行权限并存(rws),大写 S 表示有特殊位但没有执行权限(rwS);其他用户三元组中的 t/T 表示 sticky 位——/tmp 就是 drwxrwxrwt。" },
        { q: "网站文件的安全默认值是什么?", a: "惯用规则是目录 755、文件 644:所有者可写,其他人只能读。除非某个进程确实需要,永远不要给其他用户写权限(最后一位是 2)。" },
      ],
      deepDive: [
        {
          heading: "755 和 644 是怎么来的:4-2-1 加权",
          paragraphs: [
            "三个权限类——所有者、组、其他用户——各有读、写、执行三个比特。八进制数字就是启用位按 4-2-1 加权后的和,所以每位只能是 0-7,且每个值唯一对应一串 rwx:7 是 rwx(4+2+1),6 是 rw-(4+2),5 是 r-x(4+1),4 是 r--(4)。不存在「某个 3 的含义另有解释」这种事,记住权重后这套记号就是无歧义的。",
            "这套算术直接解释了两个最常用模式。755(rwxr-xr-x)表示所有者全权、其他人可进入可读但不可改——目录和需要被他人执行的脚本就用它。644(rw-r--r--)则彻底去掉执行位:所有人可读、仅所有者可写,适合普通文件。Web 服务器要求文件 644、目录 755 的原因说穿了只有一条:进入目录是一项执行操作,而不是读取。",
            "umask 补全了整幅图景。典型的 umask 022 在文件创建时从 666/777 的默认值里扣除,这正是新文件落到 644、新目录落到 755 的原因。当文件总是「丢」执行位或组的写权限莫名消失时,元凶通常是 umask 或某个过热心的同步工具,而不是 chmod 本身——重新授权前先用 stat 看一眼当前模式,能省掉大量猜测。",
          ],
        },
        {
          heading: "特殊权限位:setuid、setgid 与 sticky",
          paragraphs: [
            "九个权限位之外还有三个。setuid(八进制 4000)让可执行文件以文件所有者身份而非调用者身份运行——passwd 能写 root 属主的文件又人人可执行,靠的就是它。setgid(2000)对组做同样的事;用在目录上则让新文件继承目录的属组,共享团队目录能保持属组一致靠的正是这个机制。",
            "sticky 位(1000)对文件而言基本是历史遗留,但对目录含义明确:只有文件属主(或 root)能删除或重命名其中的条目。/tmp 是教科书案例:1777,人人可写,但谁都删不了别人的文件。Docker 的 COPY --chmod 和 CI 脚本偶尔需要把这些数字写全,四位数形式正是在这种时候才显出意义——首位是特殊位的八进制,没有就是 0。",
            "符号记法用 s/t 顶替 x 的位置来编码这些状态:小写 s 表示特殊位加执行位并存(rws),大写 S 表示有特殊位但没有执行位——这通常是失误,因为不可执行的 setuid 文件什么也做不了。目录上的 t 与 T 同理。在列表里看到 rwS 或 rwT,就是要么补上执行位、要么清掉特殊位的信号。",
          ],
        },
        {
          heading: "常见事故与如何安全地核对权限",
          paragraphs: [
            "最常见的运维事故是用 chmod -R 777 来「修」权限报错。眼前的问题确实消失了,但留下的是一棵人人可写的目录树——在多用户主机上是真实的安全漏洞,而且作为排障手段毫无价值,因为它把「原本是什么模式」的证据也一并抹掉了。服务读不了文件时,正确做法是沿路径逐级排查:路径上每一级目录都需要给服务用户执行位(通常还要读),问题往往出在某一级父目录,而不是文件本身。",
            "另一个典型陷阱:对目录执行 chmod 644 会剥掉执行位(r--r--r--),之后连所有者都进不去,因为「跨入目录」本身就是执行。目录几乎总是要 755 或 700,永远不会是 644。照文档恢复权限时,优先写明确的数字形式(chmod 755),少用 +x 这类效果依赖当前模式和 umask 的符号表达式。",
            "这个计算器刻意只做勾选且完全离线:它在浏览器里算出数字,交给你一条命令,由你自己检查后再执行。工作流留在它该在的地方——你把命令贴进自己的终端、作用于自己的文件,文件系统和目录结构相关的任何信息都不会离开这台机器。",
          ],
        },
      ],
    },
    ja: {
      name: "chmod 計算機",
      tagline: "所有者・グループ・その他の読み/書き/実行をチェックするだけで 8 進数と rwx 記号モードを即時計算。setuid/setgid/sticky と chmod コマンドも。",
      intro: ["Unix のファイル権限は 3×3 のマトリクスです。所有者・グループ・その他のそれぞれに読み取り(4)、書き込み(2)、実行(1)があり、クラスごとの合計がおなじみの 8 進モードになります。所有者が読み書き実行、それ以外は読み取りと実行なら 755、記号表記は rwxr-xr-x。チェックボックスで組み合わせる方が、8 進数を暗算するよりずっと速いはずです。",
        "3 つの特殊ビットにも対応:setuid(4000)はプログラムをファイル所有者として、setgid(2000)はグループとして実行し、ディレクトリの sticky(1000)は所有者しかエントリを削除できなくします(/tmp の 1777 が代表例)。逆方向の操作も可能で、644 のような数値を入力するとチェックボックスが同期し、完成した chmod コマンドをコピーできます。"],
      steps: ["所有者・グループ・その他の読み取り/書き込み/実行をチェックします。", "必要なら setuid・setgid・sticky を有効にし、4 桁モードの変化を確認します。", "逆引き欄に 644 などの数値を入力するとチェックが同期します。", "chmod コマンドをコピーしてターミナルで実行します。"],
      faqs: [
        { q: "644 と 664 の違いは?", a: "グループの桁だけが変わります:644 はグループに読み取り専用(rw-r--r--)、664 は書き込みも許可(rw-rw-r--)します。その他はどちらも読み取り専用です。個人ファイルは 644、共有グループが編集するなら 664 を。" },
        { q: "記号モードの s や t は何を意味しますか?", a: "特殊ビットが立つと x の代わりに表示されます。所有者・グループの 3 文字中の小文字 s は setuid/setgid と実行権限の併存(rws)、大文字 S は特殊ビットのみで実行権限なし(rwS)。その他の 3 文字の t/T は sticky ビットで、/tmp は drwxrwxrwt と表示されます。" },
        { q: "Web ファイルの安全なデフォルトは?", a: "定番はディレクトリ 755、ファイル 644 です:所有者は書き込め、それ以外は読み取りのみ。特定のプロセスが本当に必要でない限り、その他に書き込み権(最後の桁が 2)を与えないでください。" },
      ],
      deepDive: [
        {
          heading: "755 と 644 はどこから来るのか:4-2-1 の重み付け",
          paragraphs: [
            "3 つの権限クラス——所有者・グループ・その他——にはそれぞれ読み・書き・実行の 3 ビットがあります。8 進数の桁は有効なビットを 4-2-1 で重み付けして足したもので、だから桁は 0〜7 しか取れず、各値はちょうど一つの rwx 文字列に対応します。7 は rwx(4+2+1)、6 は rw-(4+2)、5 は r-x(4+1)、4 は r--(4)。「3 には別の意味がある」ような曖昧さは存在せず、重みを覚えてしまえばこの記法は無矛盾です。",
            "この算術が二つの主力モードを説明します。755(rwxr-xr-x)は所有者がすべてを行い、それ以外は入れて読めるが変更はできない——ディレクトリや、他人が実行すべきスクリプトに適したモードです。644(rw-r--r--)は実行ビットを完全に外します。全員が読めて、書けるのは所有者だけ。通常ファイル向けです。Web サーバがファイルに 644、ディレクトリに 755 を求める理由は一言でいえば、ディレクトリに入ることは読み取りではなく実行操作だからです。",
            "全体像を完成させるのが umask です。代表的な umask 022 は作成時のデフォルト 666/777 から差し引かれ、新しいファイルが 644、新しいディレクトリが 755 になるのはまさにこのためです。ファイルが実行ビットを「勝手に失う」、グループ書き込みが消える——犯人はたいてい chmod ではなく umask か一支配の強い同期ツールです。再付与の前に stat で現在のモードを確認すれば、推測作業を大きく減らせます。",
          ],
        },
        {
          heading: "特殊ビット:setuid、setgid、sticky",
          paragraphs: [
            "9 つの権限ビットのほかに 3 つあります。setuid(8 進 4000)は実行ファイルを呼び出し者ではなくファイル所有者の権限で動かします——root 所有のファイルに書き込む必要がある passwd が誰でも実行できるのはこの仕組みです。setgid(2000)はグループ側で同じことをし、ディレクトリに付けると新しいファイルがディレクトリのグループを継承します。共有チームフォルダの所有グループが一貫するのはこれのおかげです。",
            "sticky ビット(1000)はファイルとしてはほぼ歴史的なものですが、ディレクトリでは明確な意味を持ちます。エントリの削除や名前変更はファイルの所有者(か root)だけができる。/tmp が教科書例です:1777 で誰でも書けるのに、他人のファイルは消せない。Docker の COPY --chmod や CI スクリプトでこれらの数字を明示する場面があり、4 桁表記が効くのはまさにそのときです——先頭の桁が特殊ビットの 8 進数で、なければ 0 です。",
            "記号表記は x の位置を s や t で置き換えて状態を示します。小文字 s は特殊ビットと実行ビットの併存(rws)、大文字 S は特殊ビットのみで実行なし——通常はミスのサインです。実行できない setuid ファイルは何もできません。ディレクトリの t と T も同様です。一覧で rwS や rwT を見たら、実行を付けるか特殊ビットを消す判断をしましょう。",
          ],
        },
        {
          heading: "ありがちな事故と、安全なモード確認の進め方",
          paragraphs: [
            "運用で最もありがちなのは、権限エラーの「修正」としての chmod -R 777 です。目の前の問題は消えますが、誰でも書けるディレクトリツリーが残ります。マルチユーザーのホストでは現実の脆弱性ですし、診断手段としても無価値です。本来のモードが何だったかの証拠まで消してしまうからです。サービスがファイルを読めないときは、パスをたどって確認します。経路上のすべてのディレクトリがサービスユーザーに対して実行(たいてい読み取りも)を許す必要があり、犯人はファイルではなくどこかの親ディレクトリであることが多いのです。",
            "関連する罠:ディレクトリに chmod 644 を付けると実行ビットが剥がれ(r--r--r--)、所有者さえ入れなくなります。ディレクトリに入ること自体が実行だからです。ディレクトリはほぼ常に 755 か 700 で、644 にはなりません。ドキュメントからモードを復元するときは、現在のモードと umask で結果が変わる +x のような記号表現より、明示的な数字(chmod 755)を優先してください。",
            "この計算機はあえてチェックのみ・完全オフラインです。ブラウザ内で数字を計算し、確認してから実行できるコマンドを渡します。ワークフローはあるべき場所——自分のターミナル、自分のファイル——に留まります。ファイルシステムやディレクトリ構造に関する情報が端末の外に出ることはありません。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora chmod",
      tagline: "Marca lectura/escritura/ejecución para propietario, grupo y otros y obtén al instante el modo octal y simbólico rwx, con setuid/setgid/sticky y el comando chmod listo.",
      intro: ["Los permisos de archivos Unix son una matriz de 3×3: propietario, grupo y otros reciben lectura (4), escritura (2) y ejecución (1), y las tres cifras se suman en el modo octal de siempre — lectura+escritura+ejecución para el propietario y lectura+ejecución para el resto es 755, mostrado como rwxr-xr-x. Marcar casillas es mucho más rápido que recalcular dígitos octales de memoria.",
        "Los tres bits especiales también están: setuid (4000) ejecuta un programa como propietario del archivo, setgid (2000) como su grupo, y sticky (1000) en un directorio permite borrar entradas solo al propietario — piensa en /tmp con su 1777. ¿Prefieres al revés? Escribe un número como 644 y las casillas se sincronizan; luego copia el comando chmod listo para usar."],
      steps: ["Marca lectura, escritura y ejecución para propietario, grupo y otros.", "Activa setuid, setgid o sticky si lo necesitas y observa el modo de cuatro dígitos.", "Escribe un modo numérico como 644 en el campo inverso para sincronizar las casillas.", "Copia el comando chmod y ejecútalo en tu terminal."],
      faqs: [
        { q: "¿Qué diferencia hay entre 644 y 664?", a: "Solo cambia el dígito del grupo: 644 da al grupo acceso de solo lectura (rw-r--r--), mientras que 664 también le permite escribir (rw-rw-r--). Ambos dejan a otros con solo lectura. Usa 644 para archivos personales y 664 cuando un grupo compartido edita el archivo." },
        { q: "¿Qué significan s y t en el modo simbólico?", a: "Sustituyen a x cuando hay un bit especial: una s minúscula en el trío del propietario o del grupo indica setuid o setgid junto con ejecución (rws), una S mayúscula indica el bit sin ejecución (rwS), y t o T marca el bit sticky en el trío de otros — /tmp se muestra como drwxrwxrwt." },
        { q: "¿Cuál es un valor seguro por defecto para archivos web?", a: "La regla habitual es directorios 755 y archivos 644: tú (el propietario) puedes escribir y el resto solo leer. Nunca concedas escritura a otros (x2 en el último dígito) salvo que un proceso lo necesite de verdad." },
      ],
      deepDive: [
        {
          heading: "De dónde salen 755 y 644: la aritmética 4-2-1",
          paragraphs: [
            "Cada una de las tres clases de permisos — propietario, grupo y otros — guarda tres bits: lectura, escritura y ejecución. El dígito octal es la suma de los bits activos ponderados 4-2-1, por eso cada dígito solo puede ser 0-7 y cada valor corresponde a exactamente una cadena rwx. 7 es rwx (4+2+1), 6 es rw- (4+2), 5 es r-x (4+1), 4 es r-- (4). No existe un 3 que signifique otra cosa que -wx, así que la notación es inequívoca en cuanto interiorizas los pesos.",
            "Esa aritmética explica los dos modos de trabajo. 755 (rwxr-xr-x) significa que el propietario hace todo mientras el resto puede entrar y leer pero no modificar — el modo natural para directorios y para scripts que otros deben ejecutar. 644 (rw-r--r--) elimina la ejecución por completo: legible por todos, escribible solo por el propietario, lo que encaja con archivos regulares. La razón de que los servidores web quieran 644 en archivos y 755 en directorios es simplemente que entrar en un directorio es una operación de ejecución, no de lectura.",
            "El umask completa el cuadro. Un umask típico de 022 se resta de los valores por defecto 666/777 en el momento de la creación, y por eso los archivos nuevos acaban en 644 y los directorios nuevos en 755. Cuando un archivo \"pierde\" su bit de ejecución o el permiso de escritura del grupo desaparece una y otra vez, el culpable suele ser el umask o una herramienta de sincronización demasiado celosa, no chmod — comprobar el modo con stat antes de re-conceder permisos ahorra mucho trabajo de adivinación.",
          ],
        },
        {
          heading: "Los bits especiales: setuid, setgid y sticky",
          paragraphs: [
            "Además de los nueve bits de permisos hay tres más. setuid (octal 4000) hace que un ejecutable corra con la identidad del dueño del archivo en lugar de la del invocador — es el mecanismo detrás de passwd, que debe escribir en archivos propiedad de root siendo ejecutable por cualquiera. setgid (2000) hace lo mismo con el grupo, y en directorios hace que los archivos nuevos hereden el grupo del directorio; así los carpetas compartidas de equipo mantienen una propiedad coherente.",
            "El bit sticky (1000) es casi histórico para archivos, pero en directorios significa que solo el dueño del archivo (o root) puede borrar o renombrar entradas dentro de él. /tmp es el ejemplo canónico: 1777, escribible por todos, y sin embargo nadie puede eliminar los archivos de los demás. Los COPY --chmod de Docker y los scripts de CI a veces necesitan estos dígitos por escrito, y ahí es cuando importa la forma de cuatro dígitos — el dígito inicial es el octal de los bits especiales, 0 si no hay ninguno.",
            "La notación simbólica codifica el estado en el lugar de la x: una s minúscula significa bit especial más ejecución (rws); una S mayúscula significa bit especial sin ejecución — normalmente un error, porque un archivo setuid no ejecutable no hace nada. La misma lógica aplica a t frente a T en directorios. Ver rwS o rwT en un listado es la señal para conceder ejecución o limpiar el bit especial.",
          ],
        },
        {
          heading: "Errores operativos típicos y cómo comprobar modos con seguridad",
          paragraphs: [
            "El error operativo más común es chmod -R 777 como solución a un problema de permisos. El problema inmediato desaparece y queda atrás un árbol escribible por todos — un agujero de seguridad real en cualquier host multiusuario, e inútil como diagnóstico, porque destruye la evidencia de cuál era el modo verdadero. Cuando un servicio no puede leer un archivo, desciende por la ruta: cada directorio del camino necesita ejecución (y normalmente lectura) para el usuario del servicio, y el fallo suele estar en un directorio padre, no en el archivo.",
            "Una trampa relacionada: chmod 644 sobre un directorio le quita el bit de ejecución (r--r--r--) y entonces nadie — ni siquiera el propietario — puede entrar, porque atravesar un directorio es ejecutar. Los directorios casi siempre quieren 755 o 700, nunca 644. Al restaurar modos desde documentación, prefiere la forma numérica explícita (chmod 755) antes que expresiones simbólicas como +x, cuyo efecto depende del modo actual y del umask.",
            "Esta calculadora es deliberadamente de solo marcar y totalmente offline: calcula los dígitos en tu navegador y te entrega un comando para revisar antes de ejecutar. El flujo de trabajo queda donde pertenece — pegas el comando en tu propio terminal, sobre tus propios archivos, y nada sobre tu sistema de archivos o estructura de directorios sale jamás de la máquina.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora chmod",
      tagline: "Marque leitura/escrita/execução para dono, grupo e outros e obtenha ao vivo o modo octal e simbólico rwx, com setuid/setgid/sticky e o comando chmod pronto.",
      intro: ["Permissões de arquivos Unix são uma matriz 3×3: dono, grupo e outros recebem leitura (4), escrita (2) e execução (1), e os três dígitos por classe somam o modo octal de sempre — leitura+escrita+execução para o dono e leitura+execução para o resto é 755, exibido como rwxr-xr-x. Marcar caixas é bem mais rápido que recalcular dígitos octais de cabeça.",
        "Os três bits especiais também estão cobertos: setuid (4000) executa um programa como dono do arquivo, setgid (2000) como seu grupo, e sticky (1000) num diretório permite que só o dono apague entradas — pense no /tmp com seu 1777. Prefere ao contrário? Digite um número como 644 e as caixas sincronizam; depois copie o comando chmod pronto."],
      steps: ["Marque leitura, escrita e execução para dono, grupo e outros.", "Ative setuid, setgid ou sticky se precisar e veja o modo de quatro dígitos aparecer.", "Digite um modo numérico como 644 no campo reverso para sincronizar as caixas.", "Copie o comando chmod e execute no seu terminal."],
      faqs: [
        { q: "Qual a diferença entre 644 e 664?", a: "Só o dígito do grupo muda: 644 dá ao grupo acesso somente leitura (rw-r--r--), enquanto 664 também permite escrever (rw-rw-r--). Ambos deixam os outros somente leitura. Use 644 para arquivos pessoais e 664 quando um grupo compartilhado edita o arquivo." },
        { q: "O que significam s e t no modo simbólico?", a: "Eles substituem o x quando um bit especial está ativo: um s minúsculo na tríade do dono ou do grupo indica setuid ou setgid junto com execução (rws); um S maiúsculo indica o bit sem execução (rwS); e t ou T marca o bit sticky na tríade de outros — o /tmp aparece como drwxrwxrwt." },
        { q: "Qual um padrão seguro para arquivos web?", a: "A regra usual é diretórios 755 e arquivos 644: você (o dono) pode escrever, todos os outros só leem. Nunca conceda escrita a outros (x2 no último dígito) a menos que um processo realmente precise." },
      ],
      deepDive: [
        {
          heading: "De onde vêm 755 e 644: a aritmética 4-2-1",
          paragraphs: [
            "Cada uma das três classes de permissões — dono, grupo e outros — guarda três bits: leitura, escrita e execução. O dígito octal é a soma dos bits ativos ponderados 4-2-1, por isso cada dígito só pode ser 0-7 e cada valor corresponde a exatamente uma sequência rwx. 7 é rwx (4+2+1), 6 é rw- (4+2), 5 é r-x (4+1), 4 é r-- (4). Não existe um 3 que signifique outra coisa além de -wx, então a notação é inequívoca assim que você interioriza os pesos.",
            "Essa aritmética explica os dois modos de trabalho. 755 (rwxr-xr-x) significa que o dono faz tudo enquanto o resto pode entrar e ler mas não modificar — o modo natural para diretórios e para scripts que outros precisam executar. 644 (rw-r--r--) remove a execução por completo: legível por todos, escrevível só pelo dono, o que serve para arquivos comuns. O motivo de servidores web quererem 644 em arquivos e 755 em diretórios é simplesmente que entrar num diretório é uma operação de execução, não de leitura.",
            "O umask completa o quadro. Um umask típico de 022 é subtraído dos padrões 666/777 no momento da criação, e é exatamente por isso que arquivos novos acabam em 644 e diretórios novos em 755. Quando um arquivo \"perde\" o bit de execução ou a escrita do grupo some repetidamente, o culpado costuma ser o umask ou uma ferramenta de sincronização zelosa demais, não o chmod — conferir o modo com stat antes de conceder de novo economiza muita adivinhação.",
          ],
        },
        {
          heading: "Os bits especiais: setuid, setgid e sticky",
          paragraphs: [
            "Além dos nove bits de permissão existem três mais. setuid (octal 4000) faz um executável rodar com a identidade do dono do arquivo em vez da de quem invocou — é o mecanismo por trás do passwd, que precisa escrever em arquivos de propriedade do root sendo executável por qualquer um. setgid (2000) faz o mesmo com o grupo, e em diretórios faz arquivos novos herdarem o grupo do diretório; é assim que pastas compartilhadas de equipe mantêm dono de grupo coerente.",
            "O bit sticky (1000) é quase histórico para arquivos, mas em diretórios significa que só o dono do arquivo (ou root) pode apagar ou renomear entradas dentro dele. O /tmp é o exemplo canônico: 1777, escrevível por todos, e ainda assim ninguém remove os arquivos dos outros. COPY --chmod do Docker e scripts de CI às vezes precisam desses dígitos por extenso, e é aí que a forma de quatro dígitos importa — o dígito inicial é o octal dos bits especiais, 0 quando ausente.",
            "A notação simbólica codifica o estado no lugar do x: s minúsculo significa bit especial junto com execução (rws); S maiúsculo significa o bit sem execução — normalmente um erro, porque um arquivo setuid não executável não faz nada. A mesma lógica vale para t versus T em diretórios. Ver rwS ou rwT num listado é o sinal para conceder execução ou limpar o bit especial.",
          ],
        },
        {
          heading: "Erros operacionais comuns e como conferir modos com segurança",
          paragraphs: [
            "O erro operacional mais comum é chmod -R 777 como conserto de um problema de permissões. O problema imediato some e fica para trás uma árvore escrevível por todos — uma falha de segurança real em qualquer host multiusuário, e inútil como diagnóstico, porque destrói a evidência de qual era o modo verdadeiro. Quando um serviço não consegue ler um arquivo, desça pela rota: cada diretório do caminho precisa de execução (e normalmente leitura) para o usuário do serviço, e a falha costuma estar num diretório pai, não no arquivo.",
            "Uma armadilha relacionada: chmod 644 num diretório tira o bit de execução (r--r--r--) e então ninguém — nem o dono — consegue entrar, porque atravessar um diretório é executar. Diretórios quase sempre querem 755 ou 700, nunca 644. Ao restaurar modos a partir de documentação, prefira a forma numérica explícita (chmod 755) a expressões simbólicas como +x, cujo efeito depende do modo atual e do umask.",
            "Esta calculadora é deliberadamente só de marcar e totalmente offline: calcula os dígitos no seu navegador e entrega um comando para você revisar antes de rodar. O fluxo fica onde pertence — você cola o comando no seu próprio terminal, sobre seus próprios arquivos, e nada sobre seu sistema de arquivos ou estrutura de diretórios sai da máquina.",
          ],
        },
      ],
    },
  },
});
