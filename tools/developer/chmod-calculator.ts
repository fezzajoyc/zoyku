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
      intro: ["Unix file permissions are a 3×3 matrix: owner, group and others each get read (4), write (2) and execute (1), and the three per-class digits stack into the familiar octal mode — read+write+execute for owner plus read+execute for everyone else is 755, rendered rwxr-xr-x. Checking boxes is far faster than recomputing octal digits in your head.",
        "The three special bits are covered too: setuid (4000) runs a program as the file's owner, setgid (2000) as its group, and sticky (1000) on a directory lets only the owner delete entries — think /tmp with its 1777. Prefer working backwards? Type a number like 644 and the checkboxes sync to it, then copy the ready-made chmod command."],
      steps: ["Check read, write and execute for owner, group and others.", "Optionally enable setuid, setgid or sticky and watch the four-digit mode appear.", "Type a numeric mode like 644 into the reverse field to sync the checkboxes.", "Copy the chmod command and run it in your terminal."],
      faqs: [
        { q: "What is the difference between 644 and 664?", a: "Only the group digit changes: 644 gives the group read-only access (rw-r--r--), while 664 also lets the group write (rw-rw-r--). Both leave others with read-only. Use 644 for personal files and 664 when a shared group edits the file." },
        { q: "What do s and t mean in the symbolic mode?", a: "They replace x when a special bit is set: a lowercase s in the owner or group triad means setuid or setgid combined with execute (rws), an uppercase S means the special bit without execute (rwS), and t or T marks the sticky bit on the others triad — /tmp shows drwxrwxrwt." },
        { q: "What is a safe default for web files?", a: "Directories 755 and files 644 are the usual rule: you (the owner) can write, everyone else can only read. Never grant write to others (x2 in the last digit) unless a specific process truly needs it." },
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
    },
  },
});
