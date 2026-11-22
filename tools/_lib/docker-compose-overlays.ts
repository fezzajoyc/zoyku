/**
 * CN-025 docker-compose-converter 扩展语言 overlay(10 语)。
 * 模式与 toml-overlays.ts 相同。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const DOCKER_COMPOSE_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Convertisseur docker run → docker-compose",
    tagline: "Convertissez une commande docker run en service docker-compose — ports, volumes, variables d'environnement, politique de redémarrage et limites de ressources mappés fidèlement, flags sans équivalent conservés en commentaires. Gratuit, privé, hors ligne.",
    ...common(
      [
        "La plupart des conteneurs naissent d'une ligne : docker run -d -p 8080:80 -v ... nginx. Quand la configuration grandit — plusieurs services, réseaux partagés, config versionnée — il faut la réécrire à la main dans un docker-compose.yml, et c'est là que ports et variables d'environnement se perdent. Ce convertisseur fait la partie mécanique : collez la commande docker run, obtenez un fragment services: compose v2 avec image, ports, volumes, environment, politique de redémarrage et limites de ressources déjà en place.",
        "Le mappage suit la référence officielle docker run et la spécification du fichier Compose. Les flags courants (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, --entrypoint, etc.) sont traduits vers leurs attributs Compose documentés ; les flags sans équivalent sont conservés en commentaires \"# unsupported\", rien ne disparaît silencieusement. L'analyseur gère les guillemets, les continuations de ligne avec \\ et les flags courts combinés comme -itd.",
        "Tout s'exécute localement dans votre navigateur — sans envoi, sans suivi. Vérifiez le fichier généré avec docker compose config avant de l'exécuter.",
      ],
      [
        "Copiez votre commande docker run (les commandes multilignes avec \\ fonctionnent aussi).",
        "Collez-la dans le champ de saisie et cliquez sur Convertir.",
        "Copiez le fragment généré dans votre docker-compose.yml — consultez les indications sous la sortie pour les flags non mappés.",
      ],
      [
        { q: "Que deviennent les flags comme --rm ou -d sans équivalent Compose ?", a: "--rm et -P sont conservés en commentaires YAML et listés dans les indications, car les services Compose sont conçus pour tourner en continu (utilisez \"docker compose run --rm\" pour les tâches ponctuelles). -d est inutile : les services Compose s'exécutent toujours en arrière-plan. Aucun flag n'est supprimé silencieusement — tout ce qui ne peut pas être mappé apparaît en commentaire \"# unsupported\"." },
        { q: "Quels flags sont pris en charge, et comment le service est-il nommé ?", a: "Les flags courants correspondent aux attributs Compose documentés : --name/-p/--publish, -v/--volume, --mount, -e/--env, --env-file, --restart, --network, -w/--workdir, -u/--user, -h/--hostname, -m/--memory, --cpus, --label, --entrypoint, --device, --tmpfs, --cap-add/--cap-drop, --pull, etc. Le nom du conteneur devient la clé du service et est aussi écrit dans container_name pour que le conteneur réel garde son nom exact ; sans --name, le dernier segment de l'image est utilisé." },
      ],
    ),
  },
  de: {
    name: "docker run → docker-compose-Konverter",
    tagline: "Wandeln Sie docker run-Befehle in docker-compose-Dienste um — Ports, Volumes, Umgebungsvariablen, Restart-Policies und Ressourcenlimits getreu abgebildet, Flags ohne Äquivalent bleiben als Kommentare erhalten. Kostenlos, privat, offline.",
    ...common(
      [
        "Die meisten Container beginnen als Einzeiler: docker run -d -p 8080:80 -v ... nginx. Wenn die Konfiguration wächst — mehrere Dienste, gemeinsame Netzwerke, versionierte Config — muss sie von Hand in eine docker-compose.yml umgeschrieben werden, und genau dabei gehen Ports und Umgebungsvariablen verloren. Dieser Konverter übernimmt den mechanischen Teil: docker run-Befehl einfügen, ein compose-v2-services:-Fragment mit image, ports, volumes, environment, Restart-Policy und Ressourcenlimits erhalten.",
        "Das Mapping folgt der offiziellen docker run-Referenz und der Compose-Dateispezifikation. Gängige Flags (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, --entrypoint und mehr) werden auf die dokumentierten Compose-Attribute abgebildet; Flags ohne Äquivalent bleiben als \"# unsupported\"-Kommentare erhalten — nichts verschwindet stillschweigend. Der Parser behandelt Anführungszeichen, Zeilenfortsetzungen mit \\ und kombinierte Kurzflags wie -itd.",
        "Alles läuft lokal in Ihrem Browser — kein Upload, kein Tracking. Prüfen Sie die erzeugte Datei vor dem Ausführen mit docker compose config.",
      ],
      [
        "Kopieren Sie Ihren docker run-Befehl (Mehrzeiler mit \\ Fortsetzungen funktionieren ebenfalls).",
        "Fügen Sie ihn ins Eingabefeld ein und klicken Sie auf Konvertieren.",
        "Kopieren Sie das erzeugte Fragment in Ihre docker-compose.yml — prüfen Sie die Hinweise unter der Ausgabe für nicht gemappte Flags.",
      ],
      [
        { q: "Was passiert mit Flags wie --rm oder -d ohne Compose-Äquivalent?", a: "--rm und -P bleiben als YAML-Kommentare erhalten und werden in den Hinweisen aufgelistet, da Compose-Dienste dauerhaft laufen (für Einmalaufgaben nutzen Sie \"docker compose run --rm\"). -d ist nicht nötig: Compose-Dienste laufen immer im Hintergrund. Kein Flag wird stillschweigend verworfen — alles, was nicht gemappt werden kann, erscheint als sichtbarer \"# unsupported\"-Kommentar." },
        { q: "Welche Flags werden unterstützt und wie wird der Dienst benannt?", a: "Gängige Flags entsprechen dokumentierten Compose-Attributen: --name/-p/--publish, -v/--volume, --mount, -e/--env, --env-file, --restart, --network, -w/--workdir, -u/--user, -h/--hostname, -m/--memory, --cpus, --label, --entrypoint, --device, --tmpfs, --cap-add/--cap-drop, --pull und mehr. Der Containername wird zum Service-Key und zusätzlich in container_name geschrieben, damit der echte Container seinen genauen Namen behält; ohne --name wird das letzte Segment des Images verwendet." },
      ],
    ),
  },
  ru: {
    name: "Конвертер docker run → docker-compose",
    tagline: "Преобразуйте команды docker run в сервисы docker-compose — порты, тома, переменные окружения, политики перезапуска и лимиты ресурсов переносятся точно, флаги без аналога сохраняются комментариями. Бесплатно, приватно, офлайн.",
    ...common(
      [
        "Большинство контейнеров начинается с одной строки: docker run -d -p 8080:80 -v ... nginx. Когда конфигурация растёт — несколько сервисов, общие сети, конфиг под версионным контролем — её приходится переписывать в docker-compose.yml вручную, и именно тогда теряются порты и переменные окружения. Этот конвертер делает механическую часть: вставьте команду docker run и получите фрагмент services: формата compose v2 с image, ports, volumes, environment, политикой перезапуска и лимитами ресурсов.",
        "Соответствия следуют официальному справочнику docker run и спецификации файла Compose. Распространённые флаги (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, --entrypoint и другие) отображаются на задокументированные атрибуты Compose; флаги без аналога сохраняются комментариями \"# unsupported\" — ничего не исчезает молча. Парсер понимает кавычки, переносы строк через \\ и объединённые короткие флаги вроде -itd.",
        "Всё выполняется локально в вашем браузере — без загрузок, без отслеживания. Проверьте сгенерированный файл командой docker compose config перед запуском.",
      ],
      [
        "Скопируйте свою команду docker run (многострочные команды с \\ тоже работают).",
        "Вставьте её в поле ввода и нажмите Преобразовать.",
        "Скопируйте сгенерированный фрагмент в свой docker-compose.yml — обратите внимание на подсказки под выводом: там перечислены незамапленные флаги.",
      ],
      [
        { q: "Что происходит с флагами вроде --rm или -d, у которых нет аналога в Compose?", a: "--rm и -P сохраняются как комментарии YAML и перечисляются в подсказках, потому что сервисы Compose по своей природе долговременные (для разовых задач используйте \"docker compose run --rm\"). -d не нужен: сервисы Compose всегда работают в фоне. Ни один флаг не отбрасывается молча — всё, что не удалось отобразить, появляется видимым комментарием \"# unsupported\"." },
        { q: "Какие флаги поддерживаются и как именуется сервис?", a: "Распространённые флаги отображаются на задокументированные атрибуты Compose: --name/-p/--publish, -v/--volume, --mount, -e/--env, --env-file, --restart, --network, -w/--workdir, -u/--user, -h/--hostname, -m/--memory, --cpus, --label, --entrypoint, --device, --tmpfs, --cap-add/--cap-drop, --pull и другие. Имя контейнера становится ключом сервиса и также записывается в container_name, чтобы реальный контейнер сохранил точное имя; без --name берётся последний сегмент имени образа." },
      ],
    ),
  },
  it: {
    name: "Convertitore docker run → docker-compose",
    tagline: "Converti comandi docker run in servizi docker-compose — porte, volumi, variabili d'ambiente, policy di riavvio e limiti di risorse mappati fedelmente, flag senza equivalente mantenuti come commenti. Gratuito, privato, offline.",
    ...common(
      [
        "La maggior parte dei container nasce da una riga: docker run -d -p 8080:80 -v ... nginx. Quando la configurazione cresce — più servizi, reti condivise, configurazione versionata — va riscritta a mano in un docker-compose.yml, ed è lì che porte e variabili d'ambiente si perdono. Questo convertitore fa la parte meccanica: incolla il comando docker run e ottieni un frammento services: compose v2 con image, ports, volumes, environment, policy di riavvio e limiti di risorse già al loro posto.",
        "Il mapping segue la riferimento ufficiale di docker run e la specifica del file Compose. I flag comuni (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, --entrypoint e altri) sono tradotti negli attributi Compose documentati; i flag senza equivalente restano come commenti \"# unsupported\", nulla sparisce silenziosamente. Il parser gestisce virgolette, continuazioni di riga con \\ e flag corti combinati come -itd.",
        "Tutto funziona localmente nel tuo browser — senza invii, senza tracciamento. Verifica il file generato con docker compose config prima di eseguirlo.",
      ],
      [
        "Copia il tuo comando docker run (anche i comandi multilinea con \\ continuazioni).",
        "Incollalo nel campo di input e clicca Converti.",
        "Copia il frammento generato nel tuo docker-compose.yml — controlla gli avvisi sotto l'output per i flag non mappati.",
      ],
      [
        { q: "Cosa succede ai flag come --rm o -d senza equivalente Compose?", a: "--rm e -P restano come commenti YAML e sono elencati negli avvisi, perché i servizi Compose sono per natura di lunga durata (per attività una tantum usa \"docker compose run --rm\"). -d non serve: i servizi Compose girano sempre in background. Nessun flag viene scartato in silenzio — tutto ciò che non è mappabile appare come commento visibile \"# unsupported\"." },
        { q: "Quali flag sono supportati e come viene nominato il servizio?", a: "I flag comuni corrispondono agli attributi Compose documentati: --name/-p/--publish, -v/--volume, --mount, -e/--env, --env-file, --restart, --network, -w/--workdir, -u/--user, -h/--hostname, -m/--memory, --cpus, --label, --entrypoint, --device, --tmpfs, --cap-add/--cap-drop, --pull e altri. Il nome del container diventa la chiave del servizio e viene scritto anche in container_name così il container reale conserva il nome esatto; senza --name si usa l'ultimo segmento dell'immagine." },
      ],
    ),
  },
  tr: {
    name: "docker run → docker-compose dönüştürücü",
    tagline: "docker run komutlarını docker-compose servislerine dönüştürün — portlar, birimler (volume), ortam değişkenleri, yeniden başlatma ilkeleri ve kaynak sınırları sadakatle eşlenir, karşılığı olmayan flaglar yorum olarak korunur. Ücretsiz, özel, çevrimdışı.",
    ...common(
      [
        "Kapsayıcıların çoğu tek satırla başlar: docker run -d -p 8080:80 -v ... nginx. Kurulum büyüdüğünde — çoklu servis, paylaşılan ağlar, sürüm denetimli yapılandırma — elle docker-compose.yml'ye yeniden yazmak gerekir ve portlar ile ortam değişkenleri tam o sırada kaybolur. Bu dönüştürücü mekanik kısmı halleder: docker run komutunu yapıştırın, image, ports, volumes, environment, yeniden başlatma ilkesi ve kaynak sınırları hazır biçimde gelen compose v2 services: parçasını alın.",
        "Eşleme, resmî docker run başvurusunu ve Compose dosya belirtimini izler. Yaygın flaglar (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, --entrypoint ve dahası) belgelenmiş Compose özniteliklerine çevrilir; karşılığı olmayan flaglar \"# unsupported\" yorumları olarak korunur — hiçbir şey sessizce atılmaz. Ayrıştırıcı tırnakları, \\ satır devamlarını ve -itd gibi birleşik kısa flagları destekler.",
        "Her şey tarayıcınızda yerel olarak çalışır — yükleme yok, izleme yok. Oluşturulan dosyayı çalıştırmadan önce docker compose config ile doğrulayın.",
      ],
      [
        "docker run komutunuzu kopyalayın (\\ ile çok satırlı komutlar da çalışır).",
        "Giriş alanına yapıştırın ve Dönüştür'e tıklayın.",
        "Oluşturulan parçayı docker-compose.yml dosyanıza kopyalayın — eşlenmemiş flaglar için çıktının altındaki ipuçlarına bakın.",
      ],
      [
        { q: "Compose karşılığı olmayan --rm veya -d gibi flaglar ne olur?", a: "--rm ve -P YAML yorumları olarak korunur ve ipuçlarında listelenir; çünkü Compose servisleri doğası gereği uzun ömürlüdür (tek seferlik işler için \"docker compose run --rm\" kullanın). -d gerekmez: Compose servisleri her zaman arka planda çalışır. Hiçbir flag sessizce atılmaz — eşlenemeyen her şey görünür bir \"# unsupported\" yorumu olarak çıkar." },
        { q: "Hangi flaglar destekleniyor ve servis nasıl adlandırılır?", a: "Yaygın flaglar belgelenmiş Compose özniteliklerine eşlenir: --name/-p/--publish, -v/--volume, --mount, -e/--env, --env-file, --restart, --network, -w/--workdir, -u/--user, -h/--hostname, -m/--memory, --cpus, --label, --entrypoint, --device, --tmpfs, --cap-add/--cap-drop, --pull ve dahası. Kapsayıcı adı servis anahtarı olur ve gerçek kapsayıcı adını korumak için container_name'e de yazılır; --name yoksa imaj adının son kesimi kullanılır." },
      ],
    ),
  },
  ko: {
    name: "docker run → docker-compose 변환기",
    tagline: "docker run 명령을 docker-compose 서비스로 변환합니다 — 포트, 볼륨, 환경 변수, 재시작 정책, 리소스 제한을 충실히 매핑하고, Compose에 없는 플래그는 주석으로 남깁니다. 무료 · 프라이빗 · 오프라인 작동.",
    ...common(
      [
        "대부분의 컨테이너는 한 줄에서 시작합니다: docker run -d -p 8080:80 -v ... nginx. 구성이 커지면 — 여러 서비스, 공유 네트워크, 버전 관리되는 설정 — docker-compose.yml로 손으로 옮겨야 하고, 그 과정에서 포트와 환경 변수가 사라지기 쉽습니다. 이 변환기는 기계적인 부분을 담당합니다: docker run 명령을 붙여넣으면 image, ports, volumes, environment, 재시작 정책, 리소스 제한이 갖춰진 compose v2 services: 조각이 생성됩니다.",
        "매핑은 docker run 공식 레퍼런스와 Compose 파일 명세를 따릅니다. 주요 플래그(--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, --entrypoint 등)는 문서화된 Compose 속성으로 매핑되며, 상응하는 속성이 없는 플래그는 \"# unsupported\" 주석으로 남아 조용히 버려지는 것이 없습니다. 파서는 따옴표, \\ 줄바꿈 이어쓰기, -itd 같은 결합 단축 플래그를 처리합니다.",
        "모든 변환은 브라우저에서 수행됩니다 — 업로드도 추적도 없습니다. 실행 전 docker compose config으로 생성된 파일을 확인하세요.",
      ],
      [
        "docker run 명령을 복사하세요(\\ 로 이어지는 여러 줄 명령도 됩니다).",
        "입력 상자에 붙여넣고 변환을 클릭하세요.",
        "생성된 서비스 조각을 docker-compose.yml에 붙여넣으세요 — 매핑되지 않은 플래그는 출력 아래 힌트를 확인하세요.",
      ],
      [
        { q: "Compose에 상응하는 속성이 없는 --rm, -d 같은 플래그는 어떻게 되나요?", a: "--rm과 -P는 YAML 주석으로 남고 힌트에도 표시됩니다. Compose 서비스는 상시 실행이 기본이기 때문입니다(일회성 작업은 \"docker compose run --rm\"을 사용하세요). -d는 매핑이 필요 없습니다: Compose 서비스는 항상 백그라운드로 실행됩니다. 어떤 플래그도 조용히 버려지지 않으며, 매핑할 수 없는 것은 모두 \"# unsupported\" 주석으로 나타납니다." },
        { q: "어떤 플래그가 지원되며 서비스 이름은 어떻게 정해지나요?", a: "주요 플래그는 문서화된 Compose 속성으로 매핑됩니다: --name/-p/--publish, -v/--volume, --mount, -e/--env, --env-file, --restart, --network, -w/--workdir, -u/--user, -h/--hostname, -m/--memory, --cpus, --label, --entrypoint, --device, --tmpfs, --cap-add/--cap-drop, --pull 등. 컨테이너 이름이 서비스 키가 되며 실제 컨테이너 이름을 유지하도록 container_name에도 기록됩니다. --name이 없으면 이미지 이름의 마지막 세그먼트를 사용합니다." },
      ],
    ),
  },
  ar: {
    name: "محول docker run إلى docker-compose",
    tagline: "حوّل أوامر docker run إلى خدمات docker-compose — تعيين المنافذ والمجلدات (volumes) ومتغيرات البيئة وسياسات إعادة التشغيل وحدود الموارد بدقة، والرايات (flags) بلا مقابل تبقى تعليقات. مجاني وخاص ويعمل دون اتصال.",
    ...common(
      [
        "معظم الحاويات تبدأ بسطر واحد: docker run -d -p 8080:80 -v ... nginx. عندما تكبر الإعدادات — خدمات متعددة وشبكات مشتركة وضبط مُدار بالإصدارات — يجب إعادة كتابتها يدويًا في docker-compose.yml، وهناك تضيع المنافذ ومتغيرات البيئة غالبًا. يتولى هذا المحول الجزء الميكانيكي: الصق أمر docker run واحصل على مقطع services: بصيغة compose v2 يتضمن image وports وvolumes وenvironment وسياسة إعادة التشغيل وحدود الموارد.",
        "يتبع التحويل مرجع docker run الرسمي ومواصفات ملف Compose. الرايات الشائعة (--name و-p و-v و-e و--restart و--network و-w و-u و-h و--memory و--cpus و--mount و--device و--label و--entrypoint وغيرها) تُحوَّل إلى خصائص Compose الموثقة؛ أما الرايات بلا مقابل فتبقى تعليقات \"# unsupported\" — لا يُهدر شيء بصمت. المحلل يتعامل مع علامات التنصيص وأسطر \\ المتابعة والرايات القصيرة المجمعة مثل -itd.",
        "كل شيء يعمل محليًا في متصفحك — بلا رفع، بلا تتبع. راجع الملف الناتج بأمر docker compose config قبل تشغيله.",
      ],
      [
        "انسخ أمر docker run الخاص بك (الأوامر متعددة الأسطر بمتابعة \\ مدعومة أيضًا).",
        "الصقه في مربع الإدخال وانقر تحويل.",
        "انسخ المقطع الناتج إلى docker-compose.yml — راجع التلميحات أسفل المخرجات للرايات غير المحوَّلة.",
      ],
      [
        { q: "ماذا يحدث لرايات مثل --rm أو -d التي ليس لها مقابل في Compose؟", a: "تحتفظ --rm و-P كتعليقات YAML وتُدرج في التلميحات، لأن خدمات Compose طويلة الأمد بطبيعتها (استخدم \"docker compose run --rm\" للمهام الآنية). أما -d فلا حاجة لها: خدمات Compose تعمل دائمًا في الخلفية. لا تُهدر أي راية بصمت — كل ما يتعذر تحويله يظهر كتعليق \"# unsupported\" مرئي." },
        { q: "أي رايات مدعومة، وكيف يُسمَّى الخدمة؟", a: "تُحوَّل الرايات الشائعة إلى خصائص Compose الموثقة: --name/-p/--publish و-v/--volume و--mount و-e/--env و--env-file و--restart و--network و-w/--workdir و-u/--user و-h/--hostname و-m/--memory و--cpus و--label و--entrypoint و--device و--tmpfs و--cap-add/--cap-drop و--pull وغيرها. يصبح اسم الحاوية مفتاح الخدمة ويُكتب أيضًا في container_name ليبقى اسم الحاوية الفعلي كما هو؛ وبدون --name يُستخدم الجزء الأخير من اسم الصورة." },
      ],
    ),
  },
  hi: {
    name: "docker run → docker-compose कनवर्टर",
    tagline: "docker run कमांड को docker-compose सर्विस में बदलें — पोर्ट, वॉल्यूम, एनवायरनमेंट वेरिएबल, रीस्टार्ट पॉलिसी और रिसोर्स लिमिट ठीक वैसे मैप होते हैं, बिना समकक्ष वाले फ्लैग कमेंट के रूप में बचे रहते हैं। मुफ़्त, निजी, ऑफ़लाइन।",
    ...common(
      [
        "ज़्यादातर कंटेनर एक लाइन से शुरू होते हैं: docker run -d -p 8080:80 -v ... nginx। जब सेटअप बड़ा होता है — कई सर्विस, शेयर्ड नेटवर्क, वर्शन-कंट्रोल्ड कॉन्फ़िग — तो उसे हाथ से docker-compose.yml में लिखना पड़ता है, और यहीं पोर्ट और एनवायरनमेंट वेरिएबल खो जाते हैं। यह कनवर्टर मेकेनिकल हिस्सा संभालता है: docker run कमांड पेस्ट करें और compose v2 का services: फ़्रैगमेंट पाएँ — image, ports, volumes, environment, रीस्टार्ट पॉलिसी और रिसोर्स लिमिट पहले से जगह पर।",
        "मैपिंग आधिकारिक docker run रेफ़रेंस और Compose फ़ाइल स्पेसिफ़िकेशन के अनुसार है। सामान्य फ्लैग (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, --entrypoint वगैरह) डॉक्युमेंट किए गए Compose एट्रिब्यूट में मैप होते हैं; जिनका कोई समकक्ष नहीं वे \"# unsupported\" कमेंट के रूप में रहते हैं — कुछ भी चुपचाप नहीं गिरता। पार्सर कोट्स, \\ से लाइन जारी रखना और -itd जैसे संयुक्त शॉर्ट फ्लैग संभालता है।",
        "सब कुछ आपके ब्राउज़र में स्थानीय रूप से चलता है — कोई अपलोड नहीं, कोई ट्रैकिंग नहीं। चलाने से पहले docker compose config से बनी फ़ाइल जाँचें।",
      ],
      [
        "अपना docker run कमांड कॉपी करें (\\ से जारी रहने वाली मल्टी-लाइन कमांड भी चलेंगी)।",
        "इनपुट बॉक्स में पेस्ट करें और कन्वर्ट पर क्लिक करें।",
        "बने फ़्रैगमेंट को अपनी docker-compose.yml में कॉपी करें — बिना मैप वाले फ्लैग के लिए आउटपुट के नीचे के हिंट देखें।",
      ],
      [
        { q: "--rm या -d जैसे फ्लैग जिनका Compose में समकक्ष नहीं है, उनका क्या होता है?", a: "--rm और -P YAML कमेंट के रूप में रहते हैं और हिंट्स में दिखते हैं, क्योंकि Compose सर्विस डिज़ाइन से लंबे समय चलने वाली होती हैं (एक बार के काम के लिए \"docker compose run --rm\" इस्तेमाल करें)। -d की ज़रूरत नहीं: Compose सर्विस हमेशा बैकग्राउंड में चलती हैं। कोई फ्लैग चुपचाप नहीं गिरता — जो मैप नहीं हो सकता वह दिखने वाले \"# unsupported\" कमेंट के रूप में आता है।" },
        { q: "कौन-से फ्लैग समर्थित हैं और सर्विस का नाम कैसे तय होता है?", a: "सामान्य फ्लैग डॉक्युमेंट किए गए Compose एट्रिब्यूट में मैप होते हैं: --name/-p/--publish, -v/--volume, --mount, -e/--env, --env-file, --restart, --network, -w/--workdir, -u/--user, -h/--hostname, -m/--memory, --cpus, --label, --entrypoint, --device, --tmpfs, --cap-add/--cap-drop, --pull वगैरह। कंटेनर का नाम सर्विस की बनता है और असली कंटेनर का नाम बनाए रखने के लिए container_name में भी लिखा जाता है; --name न होने पर इमेज नाम का आख़िरी सेगमेंट लिया जाता है।" },
      ],
    ),
  },
  id: {
    name: "Konverter docker run → docker-compose",
    tagline: "Konversi perintah docker run menjadi layanan docker-compose — port, volume, variabel lingkungan, kebijakan restart, dan batas sumber daya dipetakan setia, flag tanpa padanan disimpan sebagai komentar. Gratis, privat, offline.",
    ...common(
      [
        "Sebagian besar kontainer dimulai dari satu baris: docker run -d -p 8080:80 -v ... nginx. Saat penyiapan tumbuh — banyak layanan, jaringan bersama, konfigurasi yang dikelola versi — Anda harus menulisnya ulang secara manual ke docker-compose.yml, dan di situlah port serta variabel lingkungan sering hilang. Konverter ini menangani bagian mekanisnya: tempel perintah docker run, dapatkan fragmen services: gaya compose v2 dengan image, ports, volumes, environment, kebijakan restart, dan batas sumber daya sudah terpasang.",
        "Pemetaannya mengikuti referensi resmi docker run dan spesifikasi berkas Compose. Flag umum (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, --entrypoint, dan lainnya) dipetakan ke atribut Compose yang terdokumentasi; flag tanpa padanan disimpan sebagai komentar \"# unsupported\" sehingga tidak ada yang hilang diam-diam. Parser menangani tanda kutip, lanjutan baris dengan \\, dan flag pendek gabungan seperti -itd.",
        "Semuanya berjalan lokal di browser Anda — tanpa unggahan, tanpa pelacakan. Periksa berkas yang dihasilkan dengan docker compose config sebelum menjalankannya.",
      ],
      [
        "Salin perintah docker run Anda (perintah multi-baris dengan lanjutan \\ juga didukung).",
        "Tempel ke kotak masukan dan klik Konversi.",
        "Salin fragmen yang dihasilkan ke docker-compose.yml Anda — periksa petunjuk di bawah keluaran untuk flag yang belum dipetakan.",
      ],
      [
        { q: "Apa yang terjadi pada flag seperti --rm atau -d yang tidak punya padanan Compose?", a: "--rm dan -P disimpan sebagai komentar YAML dan dicantumkan di petunjuk, karena layanan Compose secara desain berjalan lama (untuk tugas sekali jalan gunakan \"docker compose run --rm\"). -d tidak diperlukan: layanan Compose selalu berjalan di latar belakang. Tidak ada flag yang dibuang diam-diam — semua yang tidak bisa dipetakan muncul sebagai komentar \"# unsupported\" yang terlihat." },
        { q: "Flag apa saja yang didukung, dan bagaimana layanan dinamai?", a: "Flag umum dipetakan ke atribut Compose yang terdokumentasi: --name/-p/--publish, -v/--volume, --mount, -e/--env, --env-file, --restart, --network, -w/--workdir, -u/--user, -h/--hostname, -m/--memory, --cpus, --label, --entrypoint, --device, --tmpfs, --cap-add/--cap-drop, --pull, dan lainnya. Nama kontainer menjadi kunci layanan dan juga ditulis ke container_name agar kontainer asli mempertahankan namanya persis; tanpa --name, segmen terakhir nama image dipakai." },
      ],
    ),
  },
  vi: {
    name: "Công cụ chuyển docker run → docker-compose",
    tagline: "Chuyển lệnh docker run thành dịch vụ docker-compose — ánh xạ cổng, volume, biến môi trường, chính sách khởi động lại và giới hạn tài nguyên một cách trung thực, flag không có tương đương được giữ lại dưới dạng chú thích. Miễn phí, riêng tư, ngoại tuyến.",
    ...common(
      [
        "Phần lớn container bắt đầu từ một dòng lệnh: docker run -d -p 8080:80 -v ... nginx. Khi cấu hình lớn dần — nhiều dịch vụ, mạng dùng chung, cấu hình quản lý theo phiên bản — bạn phải viết lại bằng tay vào docker-compose.yml, và chính ở bước đó cổng cùng biến môi trường thường bị thất lạc. Công cụ này lo phần cơ học: dán lệnh docker run, nhận về mảnh services: kiểu compose v2 với image, ports, volumes, environment, chính sách khởi động lại và giới hạn tài nguyên đã sẵn sàng.",
        "Việc ánh xạ tuân theo tài liệu tham chiếu chính thức của docker run và đặc tả tệp Compose. Các flag phổ biến (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, --entrypoint và nhiều hơn nữa) được ánh xạ sang thuộc tính Compose đã được ghi rõ; flag không có tương đương được giữ lại dưới dạng chú thích \"# unsupported\" — không gì bị bỏ âm thầm. Bộ phân tích xử lý dấu ngoặc kép, xuống dòng tiếp theo bằng \\ và flag ngắn kết hợp như -itd.",
        "Mọi thứ chạy cục bộ trong trình duyệt của bạn — không tải lên, không theo dõi. Hãy kiểm tra tệp tạo ra bằng docker compose config trước khi chạy.",
      ],
      [
        "Sao chép lệnh docker run của bạn (lệnh nhiều dòng với \\ tiếp dòng cũng được).",
        "Dán vào ô nhập và nhấp Chuyển đổi.",
        "Sao chép mảnh kết quả vào docker-compose.yml — xem gợi ý bên dưới kết quả để biết các flag chưa được ánh xạ.",
      ],
      [
        { q: "Các flag như --rm hay -d không có tương đương trong Compose thì sao?", a: "--rm và -P được giữ lại dưới dạng chú thích YAML và liệt kê trong phần gợi ý, vì dịch vụ Compose vốn chạy dài hạn (việc chạy một lần hãy dùng \"docker compose run --rm\"). Còn -d không cần thiết: dịch vụ Compose luôn chạy nền. Không flag nào bị bỏ đi âm thầm — bất cứ thứ gì không ánh xạ được đều xuất hiện dưới dạng chú thích \"# unsupported\" rõ ràng." },
        { q: "Những flag nào được hỗ trợ và tên dịch vụ được đặt thế nào?", a: "Các flag phổ biến được ánh xạ sang thuộc tính Compose đã ghi chép: --name/-p/--publish, -v/--volume, --mount, -e/--env, --env-file, --restart, --network, -w/--workdir, -u/--user, -h/--hostname, -m/--memory, --cpus, --label, --entrypoint, --device, --tmpfs, --cap-add/--cap-drop, --pull và hơn nữa. Tên container trở thành khóa dịch vụ và cũng được ghi vào container_name để container thực giữ đúng tên gốc; nếu không có --name, dùng phân đoạn cuối của tên image." },
      ],
    ),
  },
};
