import type { Locale } from "@/lib/site";
import type { ToolCopy } from "./types";
import { redactPdfDeepDive, unlockPdfDeepDive, wordToPdfDeepDive } from "./deepdive-pdf";

export const PDF_CAPABILITY_LIMITS: Record<"unlock" | "word" | "redact", Record<Locale, string>> = {
  "unlock": {
    "en": "PDF decryption and restriction removal are not supported here. You can check whether a PDF is encrypted; this tool does not generate an unlocked file. Use the document owner's trusted PDF software to remove protection.",
    "zh": "此处不支持 PDF 解密或移除权限限制。你可以检查 PDF 是否加密,但不会生成“已解锁”文件。请由文档所有者使用可信的 PDF 软件解除保护。",
    "ja": "ここでは PDF の復号や権限制限の解除はできません。暗号化の有無のみ確認し、解除済みファイルは作成しません。文書の所有者が信頼できる PDF ソフトで保護を解除してください。",
    "es": "Aquí no se admite descifrar PDF ni quitar restricciones. Puedes comprobar si un PDF está cifrado; no se genera un archivo desbloqueado. Pide al propietario que quite la protección con un programa PDF de confianza.",
    "pt": "Não é possível descriptografar PDFs nem remover restrições aqui. Você pode verificar se o PDF está criptografado; nenhum arquivo desbloqueado é gerado. Peça ao proprietário para remover a proteção com um programa PDF confiável.",
    "fr": "Le déchiffrement et la suppression des restrictions PDF ne sont pas pris en charge ici. Vous pouvez vérifier si le PDF est chiffré ; aucun fichier déverrouillé n'est créé. Le propriétaire doit retirer la protection dans un logiciel PDF de confiance.",
    "de": "PDF-Entschlüsselung und das Entfernen von Beschränkungen werden hier nicht unterstützt. Sie können prüfen, ob die PDF verschlüsselt ist; eine entsperrte Datei wird nicht erzeugt. Der Eigentümer kann den Schutz mit vertrauenswürdiger PDF-Software entfernen.",
    "ru": "Расшифровка PDF и снятие ограничений здесь не поддерживаются. Можно проверить наличие шифрования; разблокированный файл не создаётся. Владелец документа может снять защиту в надёжной программе для PDF.",
    "it": "La decrittazione e la rimozione delle restrizioni PDF non sono supportate qui. Puoi verificare se il PDF è crittografato; non viene creato alcun file sbloccato. Il proprietario può rimuovere la protezione con un programma PDF affidabile.",
    "tr": "PDF şifresini çözme ve kısıtlamaları kaldırma burada desteklenmez. PDF'nin şifreli olup olmadığını denetleyebilirsiniz; kilidi açılmış dosya oluşturulmaz. Belge sahibi korumayı güvenilir bir PDF programıyla kaldırmalıdır.",
    "ko": "여기서는 PDF 암호 해독이나 권한 제한 해제를 지원하지 않습니다. 암호화 여부만 확인하며 잠금 해제 파일은 생성하지 않습니다. 문서 소유자가 신뢰할 수 있는 PDF 프로그램으로 보호를 해제해야 합니다.",
    "ar": "فك تشفير PDF وإزالة قيوده غير مدعومين هنا. يمكنك التحقق مما إذا كان الملف مشفّرًا؛ لن يتم إنشاء ملف مفتوح الحماية. على مالك المستند إزالة الحماية ببرنامج PDF موثوق.",
    "hi": "यहाँ PDF डिक्रिप्ट करना या प्रतिबंध हटाना समर्थित नहीं है। आप जाँच सकते हैं कि PDF एन्क्रिप्टेड है या नहीं; अनलॉक फ़ाइल नहीं बनेगी। दस्तावेज़ के मालिक को विश्वसनीय PDF सॉफ़्टवेयर से सुरक्षा हटानी चाहिए।",
    "id": "Dekripsi PDF dan penghapusan pembatasan tidak didukung di sini. Anda dapat memeriksa apakah PDF dienkripsi; berkas tanpa perlindungan tidak akan dibuat. Pemilik dokumen dapat menghapus perlindungan dengan perangkat lunak PDF tepercaya.",
    "vi": "Công cụ này không hỗ trợ giải mã PDF hoặc gỡ hạn chế. Bạn có thể kiểm tra PDF có được mã hóa hay không; công cụ không tạo tệp đã mở khóa. Chủ tài liệu cần gỡ bảo vệ bằng phần mềm PDF đáng tin cậy."
  },
  "word": {
    "en": "Text-only DOCX conversion with standard PDF fonts. Supported Latin characters are preserved. Documents containing unsupported characters (such as Chinese, Arabic, Cyrillic, Hindi or emoji) are rejected before output. Images, tables and exact Word layout are not preserved; use Word or LibreOffice's PDF export for those documents.",
    "zh": "仅转换 DOCX 文本,使用 PDF 标准字体。支持的拉丁字符会保留;包含中文、阿拉伯文、西里尔字母、印地文或表情等不支持字符的文档会在输出前被拒绝。图片、表格和 Word 原版式不保留;此类文档请用 Word 或 LibreOffice 导出 PDF。",
    "ja": "PDF 標準フォントによる DOCX のテキストのみの変換です。対応するラテン文字を保持します。日本語・中国語・アラビア文字・キリル文字・ヒンディー文字・絵文字など非対応の文字がある場合は出力しません。画像・表・元のレイアウトが必要な場合は Word や LibreOffice で PDF に書き出してください。",
    "es": "Conversión de DOCX solo de texto con fuentes PDF estándar. Se conservan los caracteres latinos compatibles. Los documentos con caracteres no compatibles (chino, árabe, cirílico, hindi o emojis) se rechazan antes de crear el archivo. No se conservan imágenes, tablas ni el diseño exacto; para esos documentos, exporta desde Word o LibreOffice.",
    "pt": "Conversão de DOCX apenas de texto com fontes PDF padrão. Caracteres latinos compatíveis são preservados. Documentos com caracteres não suportados (chinês, árabe, cirílico, hindi ou emojis) são recusados antes da saída. Imagens, tabelas e o layout exato não são preservados; exporte esses documentos pelo Word ou LibreOffice.",
    "fr": "Conversion DOCX en texte seul avec les polices PDF standard. Les caractères latins compatibles sont conservés. Les documents avec des caractères non pris en charge (chinois, arabe, cyrillique, hindi ou emoji) sont refusés avant la création du fichier. Images, tableaux et mise en page exacte ne sont pas conservés ; exportez ces documents depuis Word ou LibreOffice.",
    "de": "DOCX-Textkonvertierung mit PDF-Standardschriften. Unterstützte lateinische Zeichen bleiben erhalten. Dokumente mit nicht unterstützten Zeichen (etwa Chinesisch, Arabisch, Kyrillisch, Hindi oder Emoji) werden vor der Ausgabe abgewiesen. Bilder, Tabellen und das genaue Word-Layout bleiben nicht erhalten; exportieren Sie solche Dokumente in Word oder LibreOffice als PDF.",
    "ru": "Конвертация только текста DOCX со стандартными шрифтами PDF. Поддерживаемые латинские символы сохраняются. Документы с неподдерживаемыми символами (например, кириллицей, китайскими, арабскими, хинди или эмодзи) отклоняются до создания файла. Изображения, таблицы и точная вёрстка Word не сохраняются; используйте экспорт PDF из Word или LibreOffice.",
    "it": "Conversione del solo testo DOCX con i font PDF standard. I caratteri latini supportati vengono mantenuti. I documenti con caratteri non supportati (cinesi, arabi, cirillici, hindi o emoji) vengono rifiutati prima dell'output. Immagini, tabelle e impaginazione esatta non sono conservate; esporta questi documenti da Word o LibreOffice.",
    "tr": "Standart PDF yazı tipleriyle yalnızca DOCX metni dönüştürülür. Desteklenen Latin karakterleri korunur. Desteklenmeyen karakterler (Çince, Arapça, Kiril, Hintçe veya emoji gibi) içeren belgeler çıktıdan önce reddedilir. Görseller, tablolar ve tam Word düzeni korunmaz; bu belgeleri Word veya LibreOffice'ten PDF olarak dışa aktarın.",
    "ko": "표준 PDF 글꼴로 DOCX 텍스트만 변환합니다. 지원되는 라틴 문자는 유지합니다. 한글·중국어·아랍어·키릴 문자·힌디어·이모지 등 지원하지 않는 문자가 있으면 출력 전에 거부합니다. 이미지, 표, 정확한 Word 레이아웃은 유지하지 않습니다. 이런 문서는 Word 또는 LibreOffice에서 PDF로 내보내세요.",
    "ar": "تحويل نص DOCX فقط باستخدام خطوط PDF القياسية. تُحفظ الأحرف اللاتينية المدعومة. تُرفض المستندات ذات الأحرف غير المدعومة (مثل العربية أو الصينية أو السيريلية أو الهندية أو الرموز التعبيرية) قبل إنشاء الملف. لا تُحفظ الصور والجداول وتخطيطات Word الدقيقة؛ صدّر هذه المستندات إلى PDF من Word أو LibreOffice.",
    "hi": "मानक PDF फ़ॉन्ट के साथ केवल DOCX टेक्स्ट बदला जाता है। समर्थित लैटिन अक्षर सुरक्षित रहते हैं। असमर्थित अक्षर (जैसे हिन्दी, चीनी, अरबी, सिरिलिक या इमोजी) वाले दस्तावेज़ आउटपुट से पहले अस्वीकार किए जाते हैं। चित्र, टेबल और सटीक Word लेआउट सुरक्षित नहीं रहते; ऐसे दस्तावेज़ Word या LibreOffice से PDF में निर्यात करें।",
    "id": "Konversi hanya teks DOCX dengan font PDF standar. Karakter Latin yang didukung tetap dipertahankan. Dokumen dengan karakter yang tidak didukung (seperti Tionghoa, Arab, Sirilik, Hindi, atau emoji) ditolak sebelum keluaran dibuat. Gambar, tabel, dan tata letak Word yang persis tidak dipertahankan; ekspor dokumen tersebut dari Word atau LibreOffice.",
    "vi": "Chỉ chuyển văn bản DOCX bằng phông PDF tiêu chuẩn. Các ký tự Latinh được hỗ trợ được giữ nguyên. Tài liệu có ký tự không được hỗ trợ (như một số dấu tiếng Việt, chữ Trung Quốc, Ả Rập, Cyrillic, Hindi hoặc emoji) bị từ chối trước khi xuất. Không giữ hình ảnh, bảng và bố cục Word chính xác; hãy xuất PDF từ Word hoặc LibreOffice cho những tài liệu này."
  },
  "redact": {
    "en": "Marked pages become 150 DPI images with covered pixels replaced by black. Supported unmarked pages retain their content, text and size. Only standard-font unmarked pages without external image/Form resources (XObjects) or other complex resource graphs can be preserved; embedded/custom fonts, transparency and unsupported resources stop export without creating a PDF. Metadata and annotations are removed. Unmarked page content is intentionally retained, including duplicated content: mark every occurrence of each secret and review all pages. This is regional redaction, not a general-purpose PDF sanitizer.",
    "zh": "标记页面会变为 150 DPI 图像,覆盖区域的像素替换为黑色。支持的未标记页面会保留内容、文字和尺寸。仅能保留使用标准字体、且不含外部图像/Form 资源(XObject)或其他复杂资源图的未标记页面;嵌入或自定义字体、透明效果等不支持的资源会使导出停止,不生成 PDF。元数据和批注会移除。未标记页面的内容会有意保留,包括重复内容;请标记每处出现的敏感信息并逐页检查。这是局部涂黑工具,不是通用 PDF 清理器。",
    "ja": "マークしたページは 150 DPI の画像になり、対象の画素を黒に置き換えます。対応する未マークのページは内容・文字・サイズを保持します。標準フォントを使い、外部の画像・Form リソース（XObject）や複雑なリソースグラフのない未マークページのみ保持できます。埋め込み・独自フォントや透明効果など非対応のリソースがある場合は PDF を出力しません。メタデータと注釈は削除します。未マークの内容は重複分も意図的に保持するため、秘密情報のすべての出現箇所をマークし、全ページを確認してください。汎用的な PDF 無害化ツールではありません。",
    "es": "Las páginas marcadas pasan a imágenes de 150 DPI con los píxeles cubiertos en negro. Las páginas sin marcar compatibles conservan contenido, texto y tamaño. Solo se conservan páginas sin marcar con fuentes estándar y sin recursos externos de imagen/Form (XObject) ni otros grafos complejos; fuentes incrustadas o personalizadas, transparencia y recursos no compatibles detienen la exportación sin crear PDF. Se eliminan metadatos y anotaciones. El contenido sin marcar se conserva intencionalmente, incluso el duplicado: marca cada aparición de un dato sensible y revisa todas las páginas. Es censura por regiones, no saneamiento general de PDF.",
    "pt": "Páginas marcadas viram imagens de 150 DPI com os pixels cobertos em preto. Páginas não marcadas compatíveis preservam conteúdo, texto e tamanho. Só se preservam páginas não marcadas com fontes padrão e sem recursos externos de imagem/Form (XObject) ou outros grafos complexos; fontes incorporadas ou personalizadas, transparência e recursos não suportados interrompem a exportação sem criar PDF. Metadados e anotações são removidos. O conteúdo não marcado é mantido intencionalmente, inclusive o duplicado: marque cada ocorrência de dados sensíveis e revise todas as páginas. É tachadura por regiões, não sanitização geral de PDF.",
    "fr": "Les pages marquées deviennent des images à 150 DPI avec les pixels couverts en noir. Les pages non marquées compatibles conservent contenu, texte et dimensions. Seules les pages aux polices standard sans ressources externes image/Form (XObject) ni autres graphes complexes sont préservées ; polices intégrées ou personnalisées, transparence et ressources non prises en charge bloquent l’export sans PDF. Métadonnées et annotations sont supprimées. Le contenu non marqué est volontairement conservé, y compris les doublons : marquez chaque occurrence d’une information sensible et vérifiez toutes les pages. Ce n’est pas un outil général d’assainissement PDF.",
    "de": "Markierte Seiten werden zu 150-DPI-Bildern, verdeckte Pixel werden schwarz. Unterstützte unmarkierte Seiten behalten Inhalt, Text und Größe. Erhalten werden nur unmarkierte Seiten mit Standardschriften ohne externe Bild-/Form-Ressourcen (XObject) oder andere komplexe Ressourcengraphen. Eingebettete/eigene Schriften, Transparenz und nicht unterstützte Ressourcen stoppen den Export ohne PDF. Metadaten und Anmerkungen werden entfernt. Unmarkierter Inhalt bleibt bewusst erhalten, auch mehrfach vorhandener: Markieren Sie jedes Vorkommen vertraulicher Daten und prüfen Sie alle Seiten. Dies ist keine allgemeine PDF-Bereinigung.",
    "ru": "Отмеченные страницы становятся изображениями 150 DPI с заменой закрытых пикселей на чёрные. Поддерживаемые неотмеченные страницы сохраняют содержимое, текст и размер. Сохраняются только страницы со стандартными шрифтами без внешних ресурсов изображений/Form (XObject) и других сложных графов. Встроенные или собственные шрифты, прозрачность и неподдерживаемые ресурсы останавливают экспорт без PDF. Метаданные и аннотации удаляются. Неотмеченное содержимое намеренно сохраняется, включая повторы: отметьте каждое вхождение секретных данных и проверьте все страницы. Это не универсальная очистка PDF.",
    "it": "Le pagine segnate diventano immagini a 150 DPI con i pixel coperti in nero. Le pagine non segnate compatibili conservano contenuto, testo e dimensioni. Si conservano solo pagine con font standard senza risorse esterne immagine/Form (XObject) o altri grafi complessi; font incorporati o personalizzati, trasparenza e risorse non supportate fermano l’esportazione senza PDF. Metadati e annotazioni vengono rimossi. Il contenuto non segnato viene mantenuto intenzionalmente, inclusi i duplicati: segna ogni occorrenza dei dati sensibili e controlla tutte le pagine. Non è una bonifica generale dei PDF.",
    "tr": "İşaretli sayfalar, kapatılan pikselleri siyah olan 150 DPI görüntülere dönüşür. Desteklenen işaretsiz sayfalarda içerik, metin ve boyut korunur. Yalnızca standart fontlu, harici görüntü/Form kaynakları (XObject) veya başka karmaşık kaynak grafikleri içermeyen sayfalar korunabilir. Gömülü/özel fontlar, saydamlık ve desteklenmeyen kaynaklar PDF oluşturmadan işlemi durdurur. Meta veriler ve açıklamalar kaldırılır. İşaretsiz içerik tekrarlarıyla birlikte bilerek korunur; gizli verinin her geçtiği yeri işaretleyin ve tüm sayfaları inceleyin. Bu, genel bir PDF temizleme aracı değildir.",
    "ko": "표시한 페이지는 가린 픽셀을 검정색으로 바꾼 150 DPI 이미지가 됩니다. 지원되는 미표시 페이지는 내용, 텍스트, 크기를 유지합니다. 표준 글꼴을 쓰고 외부 이미지/Form 리소스(XObject)나 복잡한 리소스 그래프가 없는 미표시 페이지만 보존할 수 있습니다. 포함된 글꼴·사용자 글꼴, 투명도 등 미지원 리소스가 있으면 PDF를 생성하지 않습니다. 메타데이터와 주석은 제거합니다. 미표시 내용은 중복 내용까지 의도적으로 유지하므로 비밀 정보가 나오는 모든 곳을 표시하고 모든 페이지를 확인하세요. 범용 PDF 정리 도구는 아닙니다.",
    "ar": "تتحول الصفحات المحددة إلى صور 150 DPI مع استبدال البكسلات المغطاة بالأسود. تحتفظ الصفحات غير المحددة المدعومة بالمحتوى والنص والحجم. تُحفظ فقط الصفحات ذات الخطوط القياسية دون موارد صور/Form خارجية (XObject) أو رسوم موارد معقدة أخرى. توقف الخطوط المضمّنة أو المخصصة والشفافية والموارد غير المدعومة التصدير دون PDF. تُحذف البيانات الوصفية والتعليقات. يُحتفظ بالمحتوى غير المحدد عمدًا، بما فيه المحتوى المكرر؛ حدّد كل موضع للمعلومات الحساسة وراجع جميع الصفحات. هذه ليست أداة عامة لتنظيف PDF.",
    "hi": "चिह्नित पेज 150 DPI इमेज बनते हैं और ढके पिक्सेल काले होते हैं। समर्थित बिना चिह्न वाले पेज का कंटेंट, टेक्स्ट और आकार सुरक्षित रहता है। केवल मानक फ़ॉन्ट वाले, बाहरी इमेज/Form संसाधन (XObject) और अन्य जटिल संसाधन ग्राफ़ से मुक्त पेज सुरक्षित रखे जाते हैं। एम्बेडेड/कस्टम फ़ॉन्ट, पारदर्शिता और असमर्थित संसाधन होने पर PDF नहीं बनती। मेटाडेटा और टिप्पणियाँ हटती हैं। बिना चिह्न वाला कंटेंट, दोहराव सहित, जानबूझकर सुरक्षित रहता है; संवेदनशील जानकारी की हर जगह चिह्नित करें और सभी पेज जाँचें। यह सामान्य PDF सफ़ाई टूल नहीं है।",
    "id": "Halaman bertanda menjadi gambar 150 DPI dengan piksel tertutup diganti hitam. Halaman tanpa tanda yang didukung mempertahankan konten, teks, dan ukuran. Hanya halaman berfont standar tanpa sumber daya gambar/Form eksternal (XObject) atau graf kompleks lain yang dipertahankan. Font tertanam/kustom, transparansi, dan sumber daya yang tidak didukung menghentikan ekspor tanpa PDF. Metadata dan anotasi dihapus. Konten tanpa tanda sengaja dipertahankan, termasuk duplikat; tandai setiap kemunculan rahasia dan periksa semua halaman. Ini bukan alat sanitasi PDF serbaguna.",
    "vi": "Trang đã đánh dấu trở thành ảnh 150 DPI với điểm ảnh bị che đổi thành màu đen. Trang chưa đánh dấu được hỗ trợ giữ nội dung, văn bản và kích thước. Chỉ giữ trang dùng phông tiêu chuẩn, không có tài nguyên ảnh/Form bên ngoài (XObject) hay đồ thị tài nguyên phức tạp khác. Phông nhúng/tùy chỉnh, độ trong suốt và tài nguyên không được hỗ trợ sẽ dừng xuất mà không tạo PDF. Siêu dữ liệu và chú thích bị xóa. Nội dung chưa đánh dấu được cố ý giữ lại, kể cả bản trùng: đánh dấu mọi lần xuất hiện của thông tin mật và kiểm tra tất cả các trang. Đây không phải công cụ làm sạch PDF tổng quát."
  }
};

/** Truthful replacement after locale overlays, so old decryption claims cannot return. */
export const UNLOCK_COPY: Record<Locale, ToolCopy> = {
  "en": {
    "name": "Check PDF protection",
    "tagline": "Check whether a PDF is encrypted, locally in your browser. Decryption and owner-restriction removal are unavailable; no unlocked file is generated.",
    "intro": [
      "PDF decryption and restriction removal are not supported here. You can check whether a PDF is encrypted; this tool does not generate an unlocked file. Use the document owner's trusted PDF software to remove protection."
    ],
    "steps": [
      "Choose a PDF file to inspect.",
      "Click Check protection.",
      "Read the encryption status. No modified or unlocked PDF is produced."
    ],
    deepDive: unlockPdfDeepDive("en" as Locale),
    "faqs": [
      {
        "q": "Can this tool decrypt a PDF or remove owner restrictions?",
        "a": "PDF decryption and restriction removal are not supported here. You can check whether a PDF is encrypted; this tool does not generate an unlocked file. Use the document owner's trusted PDF software to remove protection."
      },
      {
        "q": "What does this check change in my file?",
        "a": "It only reads the encryption status locally. The original is not modified, and no output file is offered. A viewer having a cached password does not give this checker the password or decryption capability."
      }
    ]
  },
  "zh": {
    "name": "检查 PDF 保护状态",
    "tagline": "在浏览器本地检查 PDF 是否加密。此处不支持解密或移除所有者权限限制,不会生成“已解锁”文件,请使用可信 PDF 软件解除保护。",
    "intro": [
      "此处不支持 PDF 解密或移除权限限制。你可以检查 PDF 是否加密,但不会生成“已解锁”文件。请由文档所有者使用可信的 PDF 软件解除保护。"
    ],
    "steps": [
      "选择要检查的 PDF 文件。",
      "点击“检查保护状态”。",
      "查看加密状态。不会生成修改后或已解锁的 PDF。"
    ],
    deepDive: unlockPdfDeepDive("zh" as Locale),
    "faqs": [
      {
        "q": "此工具能解密 PDF 或移除所有者限制吗?",
        "a": "此处不支持 PDF 解密或移除权限限制。你可以检查 PDF 是否加密,但不会生成“已解锁”文件。请由文档所有者使用可信的 PDF 软件解除保护。"
      },
      {
        "q": "检查会更改我的文件吗?",
        "a": "仅在本地读取加密状态,不会修改原文件,也不提供输出文件。阅读器记住的密码不会传给本工具,也不会让本工具获得解密能力。"
      }
    ]
  },
  "ja": {
    "name": "PDF の保護を確認",
    "tagline": "ブラウザ内で PDF の暗号化の有無を確認します。復号や所有者の権限制限の解除には対応せず、解除済みファイルは作成しません。",
    "intro": [
      "ここでは PDF の復号や権限制限の解除はできません。暗号化の有無のみ確認し、解除済みファイルは作成しません。文書の所有者が信頼できる PDF ソフトで保護を解除してください。"
    ],
    "steps": [
      "確認する PDF ファイルを選択します。",
      "「保護状態を確認」をクリックします。",
      "暗号化の状態を確認します。変更済み・解除済みの PDF は作成しません。"
    ],
    deepDive: unlockPdfDeepDive("ja" as Locale),
    "faqs": [
      {
        "q": "PDF の復号や所有者の制限の解除はできますか？",
        "a": "ここでは PDF の復号や権限制限の解除はできません。暗号化の有無のみ確認し、解除済みファイルは作成しません。文書の所有者が信頼できる PDF ソフトで保護を解除してください。"
      },
      {
        "q": "確認するとファイルは変更されますか？",
        "a": "端末内で暗号化の状態を読み取るだけです。原本は変更せず、出力ファイルも提供しません。ビューアが記憶したパスワードをこのツールが取得したり、復号に利用したりすることはできません。"
      }
    ]
  },
  "es": {
    "name": "Comprobar protección PDF",
    "tagline": "Comprueba en tu navegador si un PDF está cifrado. El descifrado y la eliminación de restricciones no están disponibles; no se genera un PDF desbloqueado.",
    "intro": [
      "Aquí no se admite descifrar PDF ni quitar restricciones. Puedes comprobar si un PDF está cifrado; no se genera un archivo desbloqueado. Pide al propietario que quite la protección con un programa PDF de confianza."
    ],
    "steps": [
      "Elige un PDF para comprobarlo.",
      "Pulsa Comprobar protección.",
      "Consulta el estado del cifrado. No se genera un PDF modificado ni desbloqueado."
    ],
    deepDive: unlockPdfDeepDive("es" as Locale),
    "faqs": [
      {
        "q": "¿Puede descifrar un PDF o quitar restricciones del propietario?",
        "a": "Aquí no se admite descifrar PDF ni quitar restricciones. Puedes comprobar si un PDF está cifrado; no se genera un archivo desbloqueado. Pide al propietario que quite la protección con un programa PDF de confianza."
      },
      {
        "q": "¿Qué cambia esta comprobación en mi archivo?",
        "a": "Solo lee el estado del cifrado localmente. El original no se modifica y no se ofrece ningún archivo. Una contraseña guardada en el visor no se transmite a esta herramienta ni permite descifrar aquí."
      }
    ]
  },
  "pt": {
    "name": "Verificar proteção PDF",
    "tagline": "Verifique no navegador se um PDF está criptografado. Descriptografia e remoção de restrições não estão disponíveis; nenhum PDF desbloqueado é gerado.",
    "intro": [
      "Não é possível descriptografar PDFs nem remover restrições aqui. Você pode verificar se o PDF está criptografado; nenhum arquivo desbloqueado é gerado. Peça ao proprietário para remover a proteção com um programa PDF confiável."
    ],
    "steps": [
      "Escolha um PDF para verificar.",
      "Clique em Verificar proteção.",
      "Veja o estado da criptografia. Nenhum PDF modificado ou desbloqueado é gerado."
    ],
    deepDive: unlockPdfDeepDive("pt" as Locale),
    "faqs": [
      {
        "q": "Pode descriptografar um PDF ou remover restrições do proprietário?",
        "a": "Não é possível descriptografar PDFs nem remover restrições aqui. Você pode verificar se o PDF está criptografado; nenhum arquivo desbloqueado é gerado. Peça ao proprietário para remover a proteção com um programa PDF confiável."
      },
      {
        "q": "O que esta verificação altera no arquivo?",
        "a": "Apenas lê o estado da criptografia localmente. O original não é alterado e nenhum arquivo é oferecido. Uma senha salva no visualizador não é transmitida a esta ferramenta nem permite a descriptografia aqui."
      }
    ]
  },
  "fr": {
    "name": "Vérifier la protection PDF",
    "tagline": "Vérifiez localement si un PDF est chiffré. Le déchiffrement et le retrait des restrictions ne sont pas disponibles ; aucun PDF déverrouillé n’est créé.",
    "intro": [
      "Le déchiffrement et la suppression des restrictions PDF ne sont pas pris en charge ici. Vous pouvez vérifier si le PDF est chiffré ; aucun fichier déverrouillé n'est créé. Le propriétaire doit retirer la protection dans un logiciel PDF de confiance."
    ],
    "steps": [
      "Choisissez un PDF à vérifier.",
      "Cliquez sur Vérifier la protection.",
      "Consultez l’état du chiffrement. Aucun PDF modifié ou déverrouillé n’est créé."
    ],
    deepDive: unlockPdfDeepDive("fr" as Locale),
    "faqs": [
      {
        "q": "Cet outil peut-il déchiffrer un PDF ou retirer les restrictions ?",
        "a": "Le déchiffrement et la suppression des restrictions PDF ne sont pas pris en charge ici. Vous pouvez vérifier si le PDF est chiffré ; aucun fichier déverrouillé n'est créé. Le propriétaire doit retirer la protection dans un logiciel PDF de confiance."
      },
      {
        "q": "Que modifie cette vérification dans mon fichier ?",
        "a": "Il lit seulement l’état du chiffrement localement. L’original est inchangé et aucun fichier de sortie n’est proposé. Un mot de passe mémorisé par le lecteur n’est pas transmis à cet outil et ne permet pas le déchiffrement ici."
      }
    ]
  },
  "de": {
    "name": "PDF-Schutz prüfen",
    "tagline": "Prüfen Sie lokal, ob eine PDF verschlüsselt ist. Entschlüsselung und das Entfernen von Beschränkungen sind nicht verfügbar; es entsteht keine entsperrte Datei.",
    "intro": [
      "PDF-Entschlüsselung und das Entfernen von Beschränkungen werden hier nicht unterstützt. Sie können prüfen, ob die PDF verschlüsselt ist; eine entsperrte Datei wird nicht erzeugt. Der Eigentümer kann den Schutz mit vertrauenswürdiger PDF-Software entfernen."
    ],
    "steps": [
      "Wählen Sie eine PDF zur Prüfung.",
      "Klicken Sie auf Schutz prüfen.",
      "Lesen Sie den Verschlüsselungsstatus. Es wird keine geänderte oder entsperrte PDF erzeugt."
    ],
    deepDive: unlockPdfDeepDive("de" as Locale),
    "faqs": [
      {
        "q": "Kann dieses Tool PDFs entschlüsseln oder Beschränkungen entfernen?",
        "a": "PDF-Entschlüsselung und das Entfernen von Beschränkungen werden hier nicht unterstützt. Sie können prüfen, ob die PDF verschlüsselt ist; eine entsperrte Datei wird nicht erzeugt. Der Eigentümer kann den Schutz mit vertrauenswürdiger PDF-Software entfernen."
      },
      {
        "q": "Was ändert diese Prüfung an meiner Datei?",
        "a": "Sie liest nur lokal den Verschlüsselungsstatus. Das Original wird nicht geändert; es gibt keine Ausgabedatei. Ein im PDF-Viewer gespeichertes Passwort steht diesem Tool nicht zur Verfügung und ermöglicht hier keine Entschlüsselung."
      }
    ]
  },
  "ru": {
    "name": "Проверка защиты PDF",
    "tagline": "Проверьте в браузере, зашифрован ли PDF. Расшифровка и снятие ограничений недоступны; разблокированный файл не создаётся.",
    "intro": [
      "Расшифровка PDF и снятие ограничений здесь не поддерживаются. Можно проверить наличие шифрования; разблокированный файл не создаётся. Владелец документа может снять защиту в надёжной программе для PDF."
    ],
    "steps": [
      "Выберите PDF для проверки.",
      "Нажмите «Проверить защиту».",
      "Просмотрите статус шифрования. Изменённый или разблокированный PDF не создаётся."
    ],
    deepDive: unlockPdfDeepDive("ru" as Locale),
    "faqs": [
      {
        "q": "Можно ли расшифровать PDF или снять ограничения владельца?",
        "a": "Расшифровка PDF и снятие ограничений здесь не поддерживаются. Можно проверить наличие шифрования; разблокированный файл не создаётся. Владелец документа может снять защиту в надёжной программе для PDF."
      },
      {
        "q": "Что проверка меняет в файле?",
        "a": "Проверяется только статус шифрования локально. Оригинал не меняется, выходного файла нет. Сохранённый в программе просмотра пароль не передаётся этому инструменту и не даёт ему возможности расшифровки."
      }
    ]
  },
  "it": {
    "name": "Verifica protezione PDF",
    "tagline": "Verifica nel browser se un PDF è crittografato. Decrittazione e rimozione delle restrizioni non sono disponibili; non viene creato un PDF sbloccato.",
    "intro": [
      "La decrittazione e la rimozione delle restrizioni PDF non sono supportate qui. Puoi verificare se il PDF è crittografato; non viene creato alcun file sbloccato. Il proprietario può rimuovere la protezione con un programma PDF affidabile."
    ],
    "steps": [
      "Scegli un PDF da verificare.",
      "Fai clic su Verifica protezione.",
      "Leggi lo stato della crittografia. Non viene creato alcun PDF modificato o sbloccato."
    ],
    deepDive: unlockPdfDeepDive("it" as Locale),
    "faqs": [
      {
        "q": "Può decrittare un PDF o rimuovere le restrizioni del proprietario?",
        "a": "La decrittazione e la rimozione delle restrizioni PDF non sono supportate qui. Puoi verificare se il PDF è crittografato; non viene creato alcun file sbloccato. Il proprietario può rimuovere la protezione con un programma PDF affidabile."
      },
      {
        "q": "Che cosa modifica questa verifica nel file?",
        "a": "Legge solo lo stato della crittografia in locale. L’originale non viene modificato e non viene offerto alcun file. Una password memorizzata nel lettore non viene trasmessa a questo strumento e non consente la decrittazione qui."
      }
    ]
  },
  "tr": {
    "name": "PDF korumasını denetle",
    "tagline": "PDF’nin şifreli olup olmadığını tarayıcınızda denetleyin. Şifre çözme ve kısıtlama kaldırma desteklenmez; kilidi açılmış dosya oluşturulmaz.",
    "intro": [
      "PDF şifresini çözme ve kısıtlamaları kaldırma burada desteklenmez. PDF'nin şifreli olup olmadığını denetleyebilirsiniz; kilidi açılmış dosya oluşturulmaz. Belge sahibi korumayı güvenilir bir PDF programıyla kaldırmalıdır."
    ],
    "steps": [
      "Denetlenecek PDF dosyasını seçin.",
      "Korumayı denetle düğmesine tıklayın.",
      "Şifreleme durumunu okuyun. Değiştirilmiş veya kilidi açılmış PDF oluşturulmaz."
    ],
    deepDive: unlockPdfDeepDive("tr" as Locale),
    "faqs": [
      {
        "q": "Bu araç PDF şifresini çözebilir veya sahip kısıtlamalarını kaldırabilir mi?",
        "a": "PDF şifresini çözme ve kısıtlamaları kaldırma burada desteklenmez. PDF'nin şifreli olup olmadığını denetleyebilirsiniz; kilidi açılmış dosya oluşturulmaz. Belge sahibi korumayı güvenilir bir PDF programıyla kaldırmalıdır."
      },
      {
        "q": "Bu denetim dosyamda neyi değiştirir?",
        "a": "Yalnızca şifreleme durumunu yerel olarak okur. Asıl dosya değişmez ve çıktı sunulmaz. Görüntüleyicide kayıtlı parola bu araca aktarılmaz ve burada şifre çözmeyi mümkün kılmaz."
      }
    ]
  },
  "ko": {
    "name": "PDF 보호 상태 확인",
    "tagline": "브라우저에서 PDF의 암호화 여부를 확인합니다. 암호 해독이나 소유자 권한 제한 해제는 지원하지 않으며 잠금 해제 파일을 생성하지 않습니다. 문서 소유자의 신뢰할 수 있는 PDF 프로그램을 이용하세요.",
    "intro": [
      "여기서는 PDF 암호 해독이나 권한 제한 해제를 지원하지 않습니다. 암호화 여부만 확인하며 잠금 해제 파일은 생성하지 않습니다. 문서 소유자가 신뢰할 수 있는 PDF 프로그램으로 보호를 해제해야 합니다."
    ],
    "steps": [
      "확인할 PDF 파일을 선택하세요.",
      "보호 상태 확인을 누르세요.",
      "암호화 상태를 확인하세요. 수정되거나 잠금 해제된 PDF는 생성하지 않습니다."
    ],
    deepDive: unlockPdfDeepDive("ko" as Locale),
    "faqs": [
      {
        "q": "PDF 암호를 해독하거나 소유자 제한을 해제할 수 있나요?",
        "a": "여기서는 PDF 암호 해독이나 권한 제한 해제를 지원하지 않습니다. 암호화 여부만 확인하며 잠금 해제 파일은 생성하지 않습니다. 문서 소유자가 신뢰할 수 있는 PDF 프로그램으로 보호를 해제해야 합니다."
      },
      {
        "q": "확인 과정에서 파일이 변경되나요?",
        "a": "암호화 상태만 기기에서 읽습니다. 원본은 수정하지 않고 출력 파일도 제공하지 않습니다. 뷰어가 저장한 비밀번호는 이 도구에 전달되지 않으며 암호 해독 기능을 제공하지도 않습니다."
      }
    ]
  },
  "ar": {
    "name": "فحص حماية PDF",
    "tagline": "تحقق محليًا في المتصفح مما إذا كان PDF مشفّرًا. فك التشفير وإزالة القيود غير متاحين؛ لن يتم إنشاء ملف PDF مفتوح الحماية.",
    "intro": [
      "فك تشفير PDF وإزالة قيوده غير مدعومين هنا. يمكنك التحقق مما إذا كان الملف مشفّرًا؛ لن يتم إنشاء ملف مفتوح الحماية. على مالك المستند إزالة الحماية ببرنامج PDF موثوق."
    ],
    "steps": [
      "اختر ملف PDF لفحصه.",
      "اضغط على فحص الحماية.",
      "اقرأ حالة التشفير. لن يتم إنشاء ملف PDF معدل أو مفتوح الحماية."
    ],
    deepDive: unlockPdfDeepDive("ar" as Locale),
    "faqs": [
      {
        "q": "هل يمكنه فك تشفير PDF أو إزالة قيود المالك؟",
        "a": "فك تشفير PDF وإزالة قيوده غير مدعومين هنا. يمكنك التحقق مما إذا كان الملف مشفّرًا؛ لن يتم إنشاء ملف مفتوح الحماية. على مالك المستند إزالة الحماية ببرنامج PDF موثوق."
      },
      {
        "q": "ماذا يغير هذا الفحص في ملفي؟",
        "a": "يقرأ حالة التشفير محليًا فقط. لا يتغير الأصل ولا يتم توفير ملف ناتج. كلمة المرور المحفوظة في العارض لا تنتقل إلى هذه الأداة ولا تمنحها القدرة على فك التشفير."
      }
    ]
  },
  "hi": {
    "name": "PDF सुरक्षा जाँचें",
    "tagline": "ब्राउज़र में स्थानीय रूप से जाँचें कि PDF एन्क्रिप्टेड है या नहीं। डिक्रिप्शन और मालिक के प्रतिबंध हटाना उपलब्ध नहीं है; अनलॉक फ़ाइल नहीं बनती।",
    "intro": [
      "यहाँ PDF डिक्रिप्ट करना या प्रतिबंध हटाना समर्थित नहीं है। आप जाँच सकते हैं कि PDF एन्क्रिप्टेड है या नहीं; अनलॉक फ़ाइल नहीं बनेगी। दस्तावेज़ के मालिक को विश्वसनीय PDF सॉफ़्टवेयर से सुरक्षा हटानी चाहिए।"
    ],
    "steps": [
      "जाँचने के लिए PDF फ़ाइल चुनें।",
      "सुरक्षा जाँचें पर क्लिक करें।",
      "एन्क्रिप्शन स्थिति पढ़ें। संशोधित या अनलॉक PDF नहीं बनेगी।"
    ],
    deepDive: unlockPdfDeepDive("hi" as Locale),
    "faqs": [
      {
        "q": "क्या यह PDF डिक्रिप्ट कर सकता है या मालिक के प्रतिबंध हटा सकता है?",
        "a": "यहाँ PDF डिक्रिप्ट करना या प्रतिबंध हटाना समर्थित नहीं है। आप जाँच सकते हैं कि PDF एन्क्रिप्टेड है या नहीं; अनलॉक फ़ाइल नहीं बनेगी। दस्तावेज़ के मालिक को विश्वसनीय PDF सॉफ़्टवेयर से सुरक्षा हटानी चाहिए।"
      },
      {
        "q": "यह जाँच मेरी फ़ाइल में क्या बदलती है?",
        "a": "यह केवल स्थानीय रूप से एन्क्रिप्शन स्थिति पढ़ती है। मूल फ़ाइल नहीं बदलती और आउटपुट फ़ाइल नहीं मिलती। व्यूअर में सहेजा पासवर्ड इस टूल को नहीं मिलता और इससे यहाँ डिक्रिप्शन संभव नहीं होता।"
      }
    ]
  },
  "id": {
    "name": "Periksa perlindungan PDF",
    "tagline": "Periksa di browser apakah PDF dienkripsi. Dekripsi dan penghapusan pembatasan tidak tersedia; berkas PDF tanpa perlindungan tidak dibuat.",
    "intro": [
      "Dekripsi PDF dan penghapusan pembatasan tidak didukung di sini. Anda dapat memeriksa apakah PDF dienkripsi; berkas tanpa perlindungan tidak akan dibuat. Pemilik dokumen dapat menghapus perlindungan dengan perangkat lunak PDF tepercaya."
    ],
    "steps": [
      "Pilih PDF untuk diperiksa.",
      "Klik Periksa perlindungan.",
      "Baca status enkripsi. PDF yang diubah atau tanpa perlindungan tidak dibuat."
    ],
    deepDive: unlockPdfDeepDive("id" as Locale),
    "faqs": [
      {
        "q": "Bisakah alat ini mendekripsi PDF atau menghapus pembatasan pemilik?",
        "a": "Dekripsi PDF dan penghapusan pembatasan tidak didukung di sini. Anda dapat memeriksa apakah PDF dienkripsi; berkas tanpa perlindungan tidak akan dibuat. Pemilik dokumen dapat menghapus perlindungan dengan perangkat lunak PDF tepercaya."
      },
      {
        "q": "Apa yang diubah pemeriksaan ini dalam berkas saya?",
        "a": "Alat hanya membaca status enkripsi secara lokal. Berkas asli tidak diubah dan tidak ada berkas keluaran. Kata sandi yang disimpan penampil tidak diberikan ke alat ini dan tidak memungkinkan dekripsi di sini."
      }
    ]
  },
  "vi": {
    "name": "Kiểm tra bảo vệ PDF",
    "tagline": "Kiểm tra ngay trong trình duyệt xem PDF có mã hóa hay không. Không hỗ trợ giải mã hoặc gỡ hạn chế; không tạo tệp PDF đã mở khóa.",
    "intro": [
      "Công cụ này không hỗ trợ giải mã PDF hoặc gỡ hạn chế. Bạn có thể kiểm tra PDF có được mã hóa hay không; công cụ không tạo tệp đã mở khóa. Chủ tài liệu cần gỡ bảo vệ bằng phần mềm PDF đáng tin cậy."
    ],
    "steps": [
      "Chọn PDF cần kiểm tra.",
      "Nhấn Kiểm tra bảo vệ.",
      "Đọc trạng thái mã hóa. Không tạo PDF đã sửa hoặc đã mở khóa."
    ],
    deepDive: unlockPdfDeepDive("vi" as Locale),
    "faqs": [
      {
        "q": "Công cụ có giải mã PDF hoặc gỡ hạn chế của chủ tài liệu không?",
        "a": "Công cụ này không hỗ trợ giải mã PDF hoặc gỡ hạn chế. Bạn có thể kiểm tra PDF có được mã hóa hay không; công cụ không tạo tệp đã mở khóa. Chủ tài liệu cần gỡ bảo vệ bằng phần mềm PDF đáng tin cậy."
      },
      {
        "q": "Việc kiểm tra thay đổi gì trong tệp của tôi?",
        "a": "Công cụ chỉ đọc trạng thái mã hóa trên thiết bị. Tệp gốc không đổi và không có tệp đầu ra. Mật khẩu được trình đọc lưu không được chuyển cho công cụ này và không tạo ra khả năng giải mã."
      }
    ]
  }
};

export function unlockCopy(locale: Locale, _original: ToolCopy): ToolCopy {
  return { ...UNLOCK_COPY[locale] };
}

type DocumentCopyLabels = {
  wordName: string; redactName: string; scope: string; alternativeQuestion: string;
  alternative: string; reviewQuestion: string; review: string;
  chooseWord: string; convertWord: string; downloadWord: string;
  choosePdf: string; markPdf: string; downloadPdf: string;
};

const DOCUMENT_COPY: Record<Locale, DocumentCopyLabels> = {
  en: { wordName: "Word to PDF", redactName: "Redact PDF", scope: "What does this tool preserve and remove?", alternativeQuestion: "What if my document uses unsupported characters?", alternative: "Conversion stops before output instead of substituting characters. Export as PDF directly from Word or LibreOffice to keep unsupported scripts, images, tables and the document's original layout.", reviewQuestion: "Do I still need to review the exported PDF?", review: "Yes. Unmarked page content is intentionally retained, including duplicated content. Mark every occurrence of each secret on all pages and inspect the export. This is regional redaction, not a general-purpose PDF sanitization tool.", chooseWord: "Choose a text-focused .docx document and read the font limitation above.", convertWord: "Click Convert to PDF; all text is checked before typesetting.", downloadWord: "Download the PDF if validation succeeds. For unsupported characters, export from Word or LibreOffice.", choosePdf: "Choose a PDF and navigate to the page to redact.", markPdf: "Draw boxes over every region that must be removed, on every relevant page.", downloadPdf: "After successful export, download and review every page. Unmarked content is retained; mark duplicated secrets wherever they occur." },
  zh: { wordName: "Word 转 PDF", redactName: "涂黑 PDF", scope: "工具会保留和移除哪些内容?", alternativeQuestion: "文档包含不支持的字符时怎么办?", alternative: "转换会在输出前停止,不会替换字符。请直接使用 Word 或 LibreOffice 导出 PDF,以保留不支持的文字、图片、表格和原始版式。", reviewQuestion: "分享前还需要检查导出的 PDF 吗?", review: "需要。未标记页面的内容会有意保留,包括重复内容。请在所有页面标记敏感信息的每次出现,并检查导出结果。这是局部涂黑工具,不是通用 PDF 清理器。", chooseWord: "选择以文本为主的 .docx 文档,并阅读上方的字体限制。", convertWord: "点击“转换为 PDF”;排版前会检查全部文字。", downloadWord: "验证成功后下载 PDF。不支持的文字请使用 Word 或 LibreOffice 导出。", choosePdf: "选择 PDF 并转到需要涂黑的页面。", markPdf: "在每个相关页面上框选所有要删除的区域。", downloadPdf: "导出成功后下载并逐页检查。未标记内容会保留;请标记重复敏感信息的每处出现。" },
  ja: { wordName: "Word から PDF", redactName: "PDF を黒塗り", scope: "何が保持され、何が削除されますか？", alternativeQuestion: "非対応の文字が含まれる場合は？", alternative: "文字を置き換えず、出力前に変換を停止します。非対応の文字、画像、表、元のレイアウトを保持するには Word や LibreOffice から PDF に書き出してください。", reviewQuestion: "書き出した PDF の確認は必要ですか？", review: "はい。未マークの内容は重複分も意図的に保持します。すべてのページで秘密情報の出現箇所を漏れなくマークし、出力を確認してください。汎用的な PDF 無害化ツールではありません。", chooseWord: "テキスト中心の .docx を選び、上のフォント制限を確認します。", convertWord: "「PDF に変換」を押します。組版前にすべての文字を確認します。", downloadWord: "検証に成功したら PDF をダウンロードします。非対応の文字には Word や LibreOffice の書き出しを使ってください。", choosePdf: "PDF を選択し、黒塗りするページに移動します。", markPdf: "該当する各ページで削除するすべての領域を枠で囲みます。", downloadPdf: "書き出しに成功したらダウンロードし、全ページを確認します。未マークの内容は保持されるため、重複した秘密情報もすべてマークしてください。" },
  es: { wordName: "Word a PDF", redactName: "Censurar PDF", scope: "¿Qué conserva y qué elimina esta herramienta?", alternativeQuestion: "¿Y si mi documento usa caracteres no compatibles?", alternative: "La conversión se detiene antes de crear el archivo, sin sustituir caracteres. Exporta el PDF desde Word o LibreOffice para conservar otras escrituras, imágenes, tablas y el diseño original.", reviewQuestion: "¿Debo revisar el PDF exportado?", review: "Sí. El contenido sin marcar se conserva intencionalmente, incluido el duplicado. Marca cada aparición de cada dato sensible en todas las páginas y revisa la exportación. Es censura por regiones, no saneamiento general de PDF.", chooseWord: "Elige un .docx centrado en texto y lee el límite de fuentes indicado arriba.", convertWord: "Pulsa Convertir a PDF; todo el texto se valida antes de maquetarlo.", downloadWord: "Descarga el PDF si la validación se completa. Para caracteres no compatibles, exporta desde Word o LibreOffice.", choosePdf: "Elige un PDF y ve a la página que vas a censurar.", markPdf: "Dibuja recuadros sobre todas las regiones a eliminar en cada página correspondiente.", downloadPdf: "Tras exportar, descarga y revisa cada página. El contenido sin marcar se conserva; marca todos los datos sensibles duplicados." },
  pt: { wordName: "Word para PDF", redactName: "Tachar PDF", scope: "O que esta ferramenta preserva e remove?", alternativeQuestion: "E se meu documento usar caracteres não suportados?", alternative: "A conversão para antes da saída, sem substituir caracteres. Exporte o PDF pelo Word ou LibreOffice para preservar outros alfabetos, imagens, tabelas e o layout original.", reviewQuestion: "Ainda preciso revisar o PDF exportado?", review: "Sim. O conteúdo não marcado é mantido intencionalmente, inclusive o duplicado. Marque cada ocorrência de cada dado sensível em todas as páginas e confira a exportação. É tachadura por regiões, não sanitização geral de PDF.", chooseWord: "Escolha um .docx focado em texto e leia o limite de fontes acima.", convertWord: "Clique em Converter para PDF; todo o texto é validado antes da composição.", downloadWord: "Baixe o PDF se a validação for concluída. Para caracteres não suportados, exporte pelo Word ou LibreOffice.", choosePdf: "Escolha um PDF e vá até a página a tachar.", markPdf: "Desenhe retângulos sobre todas as regiões a remover em cada página relevante.", downloadPdf: "Após exportar, baixe e revise cada página. O conteúdo não marcado é mantido; marque todas as repetições de dados sensíveis." },
  fr: { wordName: "Word en PDF", redactName: "Caviarder un PDF", scope: "Que conserve et que supprime cet outil ?", alternativeQuestion: "Et si mon document contient des caractères non pris en charge ?", alternative: "La conversion s'arrête avant de créer le fichier, sans remplacer de caractères. Exportez depuis Word ou LibreOffice pour conserver les autres écritures, images, tableaux et la mise en page d'origine.", reviewQuestion: "Dois-je vérifier le PDF exporté ?", review: "Oui. Le contenu non marqué est volontairement conservé, y compris les doublons. Marquez chaque occurrence de chaque information sensible sur toutes les pages et vérifiez l’export. Ce n’est pas un outil général d’assainissement PDF.", chooseWord: "Choisissez un .docx principalement textuel et lisez la limite de polices ci-dessus.", convertWord: "Cliquez sur Convertir en PDF ; tout le texte est vérifié avant la composition.", downloadWord: "Téléchargez le PDF si la validation réussit. Sinon, exportez depuis Word ou LibreOffice.", choosePdf: "Choisissez un PDF et ouvrez la page à caviarder.", markPdf: "Encadrez chaque zone à supprimer sur toutes les pages concernées.", downloadPdf: "Après l’export, téléchargez et vérifiez chaque page. Le contenu non marqué est conservé ; marquez tous les doublons sensibles." },
  de: { wordName: "Word in PDF", redactName: "PDF schwärzen", scope: "Was erhält und entfernt dieses Tool?", alternativeQuestion: "Was ist bei nicht unterstützten Zeichen zu tun?", alternative: "Die Konvertierung stoppt vor der Ausgabe, ohne Zeichen zu ersetzen. Exportieren Sie aus Word oder LibreOffice, um andere Schriftsysteme, Bilder, Tabellen und das ursprüngliche Layout zu erhalten.", reviewQuestion: "Muss ich die exportierte PDF noch prüfen?", review: "Ja. Unmarkierter Inhalt bleibt bewusst erhalten, auch mehrfach vorhandener. Markieren Sie jedes Vorkommen vertraulicher Daten auf allen Seiten und prüfen Sie den Export. Dies ist keine allgemeine PDF-Bereinigung.", chooseWord: "Wählen Sie eine textorientierte .docx-Datei und lesen Sie die Schriftbeschränkung oben.", convertWord: "Klicken Sie auf In PDF umwandeln; der gesamte Text wird vor dem Satz geprüft.", downloadWord: "Laden Sie die PDF nach erfolgreicher Prüfung herunter. Für andere Zeichen exportieren Sie aus Word oder LibreOffice.", choosePdf: "Wählen Sie eine PDF und öffnen Sie die zu schwärzende Seite.", markPdf: "Ziehen Sie auf allen betroffenen Seiten Kästen um jeden zu entfernenden Bereich.", downloadPdf: "Nach erfolgreichem Export jede Seite prüfen. Unmarkierter Inhalt bleibt erhalten; markieren Sie auch alle mehrfach vorkommenden Geheimnisse." },
  ru: { wordName: "Word в PDF", redactName: "Скрыть данные в PDF", scope: "Что инструмент сохраняет и удаляет?", alternativeQuestion: "Что делать с неподдерживаемыми символами?", alternative: "Преобразование остановится до создания файла, не заменяя символы. Экспортируйте PDF из Word или LibreOffice, чтобы сохранить другие письменности, изображения, таблицы и исходную вёрстку.", reviewQuestion: "Нужно ли проверять готовый PDF?", review: "Да. Неотмеченное содержимое намеренно сохраняется, включая повторы. Отметьте каждое вхождение секретных данных на всех страницах и проверьте экспорт. Это не универсальная очистка PDF.", chooseWord: "Выберите текстовый .docx и прочитайте ограничение шрифтов выше.", convertWord: "Нажмите «Преобразовать в PDF»: весь текст проверяется до вёрстки.", downloadWord: "Скачайте PDF после успешной проверки. Для других символов используйте экспорт из Word или LibreOffice.", choosePdf: "Выберите PDF и перейдите к нужной странице.", markPdf: "Обведите все области для удаления на каждой нужной странице.", downloadPdf: "После экспорта скачайте и проверьте все страницы. Неотмеченное содержимое сохраняется; отметьте все повторения секретных данных." },
  it: { wordName: "Word in PDF", redactName: "Oscura PDF", scope: "Che cosa conserva e rimuove questo strumento?", alternativeQuestion: "E se il documento usa caratteri non supportati?", alternative: "La conversione si interrompe prima dell'output, senza sostituire i caratteri. Esporta da Word o LibreOffice per conservare altre scritture, immagini, tabelle e impaginazione originale.", reviewQuestion: "Devo controllare il PDF esportato?", review: "Sì. Il contenuto non segnato viene mantenuto intenzionalmente, inclusi i duplicati. Segna ogni occorrenza dei dati sensibili in tutte le pagine e controlla l’esportazione. Non è una bonifica generale dei PDF.", chooseWord: "Scegli un .docx prevalentemente testuale e leggi il limite dei font sopra.", convertWord: "Fai clic su Converti in PDF; tutto il testo viene verificato prima dell'impaginazione.", downloadWord: "Scarica il PDF se la verifica riesce. Per altri caratteri, esporta da Word o LibreOffice.", choosePdf: "Scegli un PDF e vai alla pagina da oscurare.", markPdf: "Disegna riquadri su ogni area da rimuovere in tutte le pagine interessate.", downloadPdf: "Dopo l’esportazione, scarica e controlla ogni pagina. Il contenuto non segnato rimane: segna anche tutti i dati sensibili duplicati." },
  tr: { wordName: "Word'den PDF'ye", redactName: "PDF karartma", scope: "Bu araç neleri korur ve kaldırır?", alternativeQuestion: "Belgem desteklenmeyen karakterler içeriyorsa ne yapmalıyım?", alternative: "Karakterler değiştirilmeden, çıktıdan önce dönüştürme durdurulur. Diğer yazıları, görselleri, tabloları ve özgün düzeni korumak için Word veya LibreOffice'ten PDF olarak dışa aktarın.", reviewQuestion: "Dışa aktarılan PDF'yi yine de incelemeli miyim?", review: "Evet. İşaretsiz içerik tekrarlarıyla birlikte bilerek korunur. Tüm sayfalarda her gizli bilginin geçtiği her yeri işaretleyin ve çıktıyı inceleyin. Bu, genel bir PDF temizleme aracı değildir.", chooseWord: "Metin ağırlıklı bir .docx seçin ve yukarıdaki yazı tipi sınırlamasını okuyun.", convertWord: "PDF'ye dönüştür düğmesine tıklayın; dizgiden önce tüm metin denetlenir.", downloadWord: "Doğrulama başarılıysa PDF'yi indirin. Diğer karakterler için Word veya LibreOffice'ten dışa aktarın.", choosePdf: "Bir PDF seçin ve karartılacak sayfaya gidin.", markPdf: "İlgili tüm sayfalarda kaldırılması gereken her bölgenin üzerine kutu çizin.", downloadPdf: "Dışa aktardıktan sonra indirin ve her sayfayı inceleyin. İşaretsiz içerik korunur; tekrarlanan gizli bilgilerin tümünü işaretleyin." },
  ko: { wordName: "Word를 PDF로", redactName: "PDF 가리기", scope: "어떤 내용이 유지되거나 제거되나요?", alternativeQuestion: "문서에 지원하지 않는 문자가 있으면 어떻게 하나요?", alternative: "문자를 바꾸지 않고 출력 전에 변환을 중단합니다. 다른 문자, 이미지, 표, 원래 레이아웃을 보존하려면 Word 또는 LibreOffice에서 PDF로 내보내세요.", reviewQuestion: "내보낸 PDF를 다시 확인해야 하나요?", review: "네. 미표시 내용은 중복 내용까지 의도적으로 유지합니다. 모든 페이지에서 비밀 정보가 나오는 모든 곳을 표시하고 내보낸 파일을 확인하세요. 범용 PDF 정리 도구는 아닙니다.", chooseWord: "텍스트 중심의 .docx를 선택하고 위의 글꼴 제한을 읽어보세요.", convertWord: "PDF로 변환을 누르세요. 배치 전에 모든 텍스트를 검사합니다.", downloadWord: "검사를 통과하면 PDF를 다운로드하세요. 다른 문자가 있으면 Word 또는 LibreOffice에서 내보내세요.", choosePdf: "PDF를 선택하고 가릴 페이지로 이동하세요.", markPdf: "관련된 모든 페이지에서 제거할 각 영역에 상자를 그리세요.", downloadPdf: "내보내기에 성공하면 다운로드하고 모든 페이지를 확인하세요. 미표시 내용은 유지되므로 중복된 비밀 정보도 모두 표시하세요." },
  ar: { wordName: "Word إلى PDF", redactName: "تنقيح PDF", scope: "ما الذي تحتفظ به الأداة وما الذي تزيله؟", alternativeQuestion: "ماذا إذا احتوى المستند على أحرف غير مدعومة؟", alternative: "يتوقف التحويل قبل إنشاء الملف دون استبدال الأحرف. صدّر PDF من Word أو LibreOffice للحفاظ على أنظمة الكتابة الأخرى والصور والجداول والتخطيط الأصلي.", reviewQuestion: "هل يجب مراجعة ملف PDF الناتج؟", review: "نعم. يُحتفظ بالمحتوى غير المحدد عمدًا، بما فيه المحتوى المكرر. حدّد كل ظهور للمعلومات الحساسة في جميع الصفحات وافحص التصدير. هذه ليست أداة عامة لتنظيف PDF.", chooseWord: "اختر مستند .docx نصيًا واقرأ حدود الخطوط أعلاه.", convertWord: "اضغط التحويل إلى PDF؛ يُفحص النص كله قبل التنضيد.", downloadWord: "نزّل PDF إذا نجح التحقق. للأحرف الأخرى، صدّر من Word أو LibreOffice.", choosePdf: "اختر PDF وانتقل إلى الصفحة المراد تنقيحها.", markPdf: "ارسم مربعات فوق كل منطقة يجب إزالتها في كل الصفحات المعنية.", downloadPdf: "بعد نجاح التصدير، نزّل وراجع كل صفحة. يبقى المحتوى غير المحدد؛ حدّد المعلومات الحساسة المكررة أينما ظهرت." },
  hi: { wordName: "Word से PDF", redactName: "PDF में जानकारी छिपाएँ", scope: "यह टूल क्या सुरक्षित रखता है और क्या हटाता है?", alternativeQuestion: "दस्तावेज़ में असमर्थित अक्षर हों तो क्या करें?", alternative: "अक्षर बदले बिना आउटपुट से पहले रूपांतरण रुक जाता है। दूसरी लिपियाँ, चित्र, टेबल और मूल लेआउट सुरक्षित रखने के लिए Word या LibreOffice से PDF निर्यात करें।", reviewQuestion: "क्या निर्यात की गई PDF की जाँच अभी भी ज़रूरी है?", review: "हाँ। बिना चिह्न वाला कंटेंट, दोहराव सहित, जानबूझकर सुरक्षित रहता है। सभी पेज पर संवेदनशील जानकारी की हर जगह चिह्नित करें और आउटपुट जाँचें। यह सामान्य PDF सफ़ाई टूल नहीं है।", chooseWord: "टेक्स्ट-केंद्रित .docx चुनें और ऊपर दी गई फ़ॉन्ट सीमा पढ़ें।", convertWord: "PDF में बदलें दबाएँ; टाइपसेटिंग से पहले पूरा टेक्स्ट जाँचा जाता है।", downloadWord: "सत्यापन सफल हो तो PDF डाउनलोड करें। दूसरी लिपियों के लिए Word या LibreOffice से निर्यात करें।", choosePdf: "PDF चुनें और जानकारी छिपाने वाले पेज पर जाएँ।", markPdf: "हर संबंधित पेज पर हटाने वाले सभी हिस्सों पर बॉक्स बनाएँ।", downloadPdf: "सफल निर्यात के बाद डाउनलोड करें और हर पेज जाँचें। बिना चिह्न वाला कंटेंट रहता है; दोहराई गई संवेदनशील जानकारी की हर जगह चिह्नित करें।" },
  id: { wordName: "Word ke PDF", redactName: "Redaksi PDF", scope: "Apa yang dipertahankan dan dihapus alat ini?", alternativeQuestion: "Bagaimana jika dokumen berisi karakter yang tidak didukung?", alternative: "Konversi berhenti sebelum keluaran tanpa mengganti karakter. Ekspor PDF dari Word atau LibreOffice untuk mempertahankan aksara lain, gambar, tabel, dan tata letak asli.", reviewQuestion: "Apakah PDF hasil ekspor masih perlu diperiksa?", review: "Ya. Konten tanpa tanda sengaja dipertahankan, termasuk duplikat. Tandai setiap kemunculan setiap rahasia pada semua halaman dan periksa hasil ekspor. Ini bukan alat sanitasi PDF serbaguna.", chooseWord: "Pilih .docx yang berfokus pada teks dan baca batasan font di atas.", convertWord: "Klik Konversi ke PDF; semua teks diperiksa sebelum ditata.", downloadWord: "Unduh PDF jika validasi berhasil. Untuk karakter lain, ekspor dari Word atau LibreOffice.", choosePdf: "Pilih PDF dan buka halaman yang akan disunting.", markPdf: "Gambar kotak pada setiap area yang harus dihapus di semua halaman terkait.", downloadPdf: "Setelah ekspor berhasil, unduh dan periksa setiap halaman. Konten tanpa tanda tetap ada; tandai semua rahasia yang berulang." },
  vi: { wordName: "Word sang PDF", redactName: "Bôi đen PDF", scope: "Công cụ giữ lại và xóa những gì?", alternativeQuestion: "Nếu tài liệu có ký tự không được hỗ trợ thì sao?", alternative: "Quá trình chuyển đổi dừng trước khi xuất, không thay thế ký tự. Hãy xuất PDF từ Word hoặc LibreOffice để giữ các hệ chữ khác, hình ảnh, bảng và bố cục gốc.", reviewQuestion: "Có cần kiểm tra PDF đã xuất không?", review: "Có. Nội dung chưa đánh dấu được cố ý giữ lại, kể cả bản trùng. Đánh dấu mọi lần xuất hiện của thông tin mật trên tất cả các trang và kiểm tra kết quả. Đây không phải công cụ làm sạch PDF tổng quát.", chooseWord: "Chọn .docx chủ yếu là văn bản và đọc giới hạn phông chữ ở trên.", convertWord: "Nhấn Chuyển sang PDF; toàn bộ văn bản được kiểm tra trước khi dàn trang.", downloadWord: "Tải PDF nếu kiểm tra thành công. Với ký tự khác, hãy xuất từ Word hoặc LibreOffice.", choosePdf: "Chọn PDF và chuyển đến trang cần bôi đen.", markPdf: "Vẽ khung trên mọi vùng cần xóa ở tất cả các trang liên quan.", downloadPdf: "Xuất thành công rồi tải và kiểm tra từng trang. Nội dung chưa đánh dấu vẫn còn; đánh dấu mọi thông tin mật bị lặp lại." },
};

const DOCUMENT_SUMMARIES: Record<Locale, { word: string; redact: string }> = {
  en: { word: "Convert supported DOCX text to PDF locally. Unsupported characters stop conversion; images, tables and exact Word layout are not preserved.", redact: "Redact PDF regions; retain supported unmarked content. External image/Form resources or complex fonts/resources on unmarked pages stop export." },
  zh: { word: "本地将支持的 DOCX 文本转为 PDF。不支持的字符会在输出前拦截;不保留图片、表格或 Word 原始版式。", redact: "涂黑 PDF 指定区域并保留支持的未标记内容。未标记页面的外部图像/Form 资源、自定义字体或复杂资源会阻止导出;请标记重复秘密。" },
  ja: { word: "対応する DOCX テキストを端末内で PDF に変換します。非対応の文字がある場合は出力を停止し、画像・表・元の Word レイアウトは保持しません。", redact: "PDF の指定領域を黒塗りし、対応する未マークの内容を保持します。未マークのページに外部画像・Form リソースや独自フォント等がある場合は出力を停止します。" },
  es: { word: "Convierte texto DOCX a PDF localmente. Los caracteres no compatibles detienen la conversión; no se conservan imágenes, tablas ni el diseño exacto.", redact: "Censura regiones PDF y conserva contenido sin marcar compatible. Recursos externos de imagen/Form, fuentes o recursos complejos sin marcar bloquean la exportación." },
  pt: { word: "Converta texto DOCX em PDF localmente. Caracteres não suportados interrompem a conversão; imagens, tabelas e o layout exato não são preservados.", redact: "Tache regiões PDF e mantenha conteúdo não marcado compatível. Recursos externos de imagem/Form, fontes ou recursos complexos sem marcação bloqueiam a exportação." },
  fr: { word: "Convertissez le texte DOCX en PDF localement. Les caractères non pris en charge arrêtent la conversion ; images, tableaux et mise en page ne sont pas conservés.", redact: "Caviardez des zones PDF et gardez le contenu non marqué compatible. Les ressources externes image/Form et autres ressources complexes bloquent l’export." },
  de: { word: "DOCX-Text lokal in PDF umwandeln. Nicht unterstützte Zeichen stoppen die Konvertierung; Bilder, Tabellen und das genaue Word-Layout werden nicht übernommen.", redact: "PDF-Bereiche schwärzen, unterstützte unmarkierte Inhalte erhalten. Externe Bild-/Form-Ressourcen oder komplexe Schriften/Ressourcen stoppen den Export." },
  ru: { word: "Преобразуйте текст DOCX в PDF локально. Неподдерживаемые символы остановят обработку; изображения, таблицы и точная вёрстка Word не сохраняются.", redact: "Скройте области PDF и сохраните поддерживаемый неотмеченный контент. Внешние ресурсы изображений/Form, сложные шрифты или ресурсы останавливают экспорт." },
  it: { word: "Converti testo DOCX in PDF in locale. I caratteri non supportati fermano la conversione; immagini, tabelle e impaginazione esatta non sono mantenute.", redact: "Oscura aree PDF e conserva il contenuto non segnato compatibile. Risorse esterne immagine/Form, font o risorse complesse bloccano l’esportazione." },
  tr: { word: "DOCX metnini yerel olarak PDF'ye dönüştürün. Desteklenmeyen karakterler işlemi durdurur; görseller, tablolar ve tam Word düzeni korunmaz.", redact: "PDF bölgelerini karartın, desteklenen işaretsiz içeriği koruyun. Harici görüntü/Form kaynakları, özel fontlar ve karmaşık kaynaklar dışa aktarmayı durdurur." },
  ko: { word: "지원되는 DOCX 텍스트를 기기에서 PDF로 변환합니다. 지원하지 않는 문자가 있으면 출력을 중단하며 이미지, 표, 정확한 Word 레이아웃은 유지하지 않습니다.", redact: "PDF 영역을 가리고 지원되는 미표시 내용은 유지합니다. 미표시 페이지의 외부 이미지/Form 리소스, 사용자 글꼴 또는 복잡한 리소스가 있으면 내보내기를 중단합니다. 중복된 비밀 정보도 모두 표시하세요." },
  ar: { word: "حوّل نص DOCX إلى PDF محليًا. توقف الأحرف غير المدعومة التحويل؛ لا تُحفظ الصور والجداول وتخطيطات Word الدقيقة. صدّر المستندات الأخرى من Word.", redact: "نقّح مناطق PDF واحتفظ بالمحتوى غير المحدد المدعوم. موارد الصور/Form الخارجية والخطوط أو الموارد المعقدة في الصفحات غير المحددة توقف التصدير." },
  hi: { word: "DOCX टेक्स्ट को स्थानीय रूप से PDF में बदलें। असमर्थित अक्षर रूपांतरण रोकते हैं; चित्र, टेबल और सटीक Word लेआउट सुरक्षित नहीं रहते।", redact: "PDF के हिस्से छिपाएँ और समर्थित बिना चिह्न वाला कंटेंट रखें। बाहरी इमेज/Form संसाधन, कस्टम फ़ॉन्ट या जटिल संसाधन निर्यात रोकते हैं। दोहराए रहस्य भी चिह्नित करें।" },
  id: { word: "Konversi teks DOCX ke PDF secara lokal. Karakter yang tidak didukung menghentikan konversi; gambar, tabel, dan tata letak Word asli tidak dipertahankan.", redact: "Redaksi area PDF dan simpan konten tanpa tanda yang didukung. Sumber daya gambar/Form eksternal, font kustom, atau sumber daya kompleks menghentikan ekspor." },
  vi: { word: "Chuyển văn bản DOCX sang PDF trên thiết bị. Ký tự không được hỗ trợ sẽ dừng chuyển đổi; không giữ hình ảnh, bảng và bố cục Word chính xác.", redact: "Bôi đen vùng PDF, giữ nội dung chưa đánh dấu được hỗ trợ. Tài nguyên ảnh/Form bên ngoài, phông tùy chỉnh hoặc tài nguyên phức tạp sẽ dừng xuất PDF." },
};

export function wordPdfCopy(locale: Locale, original?: ToolCopy): ToolCopy {
  const text = DOCUMENT_COPY[locale];
  return {
    name: original?.name ?? text.wordName,
    tagline: DOCUMENT_SUMMARIES[locale].word,
    intro: [PDF_CAPABILITY_LIMITS.word[locale]],
    steps: [text.chooseWord, text.convertWord, text.downloadWord],
    faqs: [
      { q: text.scope, a: PDF_CAPABILITY_LIMITS.word[locale] },
      { q: text.alternativeQuestion, a: text.alternative },
    ],
    deepDive: wordToPdfDeepDive(locale),
  };
}

export function redactPdfCopy(locale: Locale, original?: ToolCopy): ToolCopy {
  const text = DOCUMENT_COPY[locale];
  return {
    name: original?.name ?? text.redactName,
    tagline: DOCUMENT_SUMMARIES[locale].redact,
    intro: [PDF_CAPABILITY_LIMITS.redact[locale]],
    steps: [text.choosePdf, text.markPdf, text.downloadPdf],
    faqs: [
      { q: text.scope, a: PDF_CAPABILITY_LIMITS.redact[locale] },
      { q: text.reviewQuestion, a: text.review },
    ],
    deepDive: redactPdfDeepDive(locale),
  };
}
