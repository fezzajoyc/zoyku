import type { Locale } from "@/lib/site";

export type ImageColorPickerMessages = {
  drop: string;
  localNote: string;
  reading: string;
  xLabel: string;
  yLabel: string;
  coordinates: string;
  pixel: string;
  hex: string;
  hex8: string;
  rgb: string;
  rgba: string;
  copyHex: string;
  copyFormat: string;
  copyRgba: string;
  clear: string;
  statusReady: string;
  errors: {
    fileTooLarge: string;
    imageTooLarge: string;
    sideTooLarge: string;
    decode: string;
    noImage: string;
    invalidCoord: string;
  };
};

const en: ImageColorPickerMessages = {
  drop: "Drop one image or choose a file",
  localNote: "The image stays in your browser. PNG, JPG, JPEG, WebP, GIF, BMP and other browser-decodable raster formats are accepted.",
  reading: "Reading image…",
  xLabel: "X coordinate",
  yLabel: "Y coordinate",
  coordinates: "Pixel coordinates",
  pixel: "Sampled pixel",
  hex: "HEX value",
  hex8: "HEX8 with alpha",
  rgb: "RGB value",
  rgba: "RGBA",
  copyHex: "Copy HEX",
  copyFormat: "Copy format",
  copyRgba: "Copy RGBA",
  clear: "Clear image",
  statusReady: "Choose a pixel on the image or enter coordinates.",
  errors: {
    fileTooLarge: "This file is larger than the 25 MiB limit.",
    imageTooLarge: "This image exceeds the 40 megapixel limit.",
    sideTooLarge: "Each image side must be 16,384 pixels or smaller.",
    decode: "This image could not be decoded by your browser.",
    noImage: "Choose an image before sampling a pixel.",
    invalidCoord: "Enter an integer coordinate inside the image.",
  },
};

const translations: Record<Locale, ImageColorPickerMessages> = {
  en,
  zh: {
    drop: "拖入一张图片或选择文件", localNote: "图片只在浏览器内处理。支持 PNG、JPG、JPEG、WebP、GIF、BMP 及浏览器能解码的其他位图格式。", reading: "正在读取图片…", xLabel: "X 坐标", yLabel: "Y 坐标", coordinates: "像素坐标", pixel: "取样像素", hex: "HEX 值", hex8: "带透明度的 HEX8", rgb: "RGB 值", rgba: "RGBA 值", copyHex: "复制 HEX", copyFormat: "复制格式", copyRgba: "复制 RGBA", clear: "清除图片", statusReady: "点击图片取色,或输入坐标。", errors: { fileTooLarge: "文件超过 25 MiB 上限。", imageTooLarge: "图片超过 4000 万像素上限。", sideTooLarge: "图片单边必须不超过 16,384 像素。", decode: "浏览器无法解码这张图片。", noImage: "请先选择图片再取样。", invalidCoord: "请输入图片范围内的整数坐标。" },
  },
  ja: {
    drop: "画像を 1 枚ドロップまたは選択", localNote: "画像はブラウザ内だけで処理します。PNG、JPG、JPEG、WebP、GIF、BMP などのラスター形式に対応します。", reading: "画像を読み込み中…", xLabel: "X 座標", yLabel: "Y 座標", coordinates: "ピクセル座標", pixel: "サンプルしたピクセル", hex: "HEX 値", hex8: "アルファ付き HEX8", rgb: "RGB 値", rgba: "RGBA 値", copyHex: "HEX をコピー", copyFormat: "形式をコピー", copyRgba: "RGBA をコピー", clear: "画像をクリア", statusReady: "画像をクリックするか座標を入力してください。", errors: { fileTooLarge: "ファイルが 25 MiB の上限を超えています。", imageTooLarge: "画像が 4,000 万ピクセルの上限を超えています。", sideTooLarge: "各辺は 16,384 ピクセル以下にしてください。", decode: "ブラウザで画像をデコードできませんでした。", noImage: "ピクセルを取得する前に画像を選択してください。", invalidCoord: "画像内の整数座標を入力してください。" },
  },
  es: {
    drop: "Suelta una imagen o elige un archivo", localNote: "La imagen se procesa solo en tu navegador. Se aceptan PNG, JPG, JPEG, WebP, GIF, BMP y otros formatos rasterizados compatibles.", reading: "Leyendo imagen…", xLabel: "Coordenada X", yLabel: "Coordenada Y", coordinates: "Coordenadas del píxel", pixel: "Píxel muestreado", hex: "Valor HEX", hex8: "HEX8 con alfa", rgb: "Valor RGB", rgba: "Valor RGBA", copyHex: "Copiar HEX", copyFormat: "Copiar formato", copyRgba: "Copiar RGBA", clear: "Borrar imagen", statusReady: "Haz clic en la imagen o introduce coordenadas.", errors: { fileTooLarge: "El archivo supera el límite de 25 MiB.", imageTooLarge: "La imagen supera el límite de 40 megapíxeles.", sideTooLarge: "Cada lado debe tener como máximo 16.384 píxeles.", decode: "El navegador no pudo decodificar esta imagen.", noImage: "Elige una imagen antes de muestrear un píxel.", invalidCoord: "Introduce coordenadas enteras dentro de la imagen." },
  },
  pt: {
    drop: "Solte uma imagem ou escolha um arquivo", localNote: "A imagem é processada apenas no navegador. PNG, JPG, JPEG, WebP, GIF, BMP e outros formatos raster compatíveis são aceitos.", reading: "Lendo imagem…", xLabel: "Coordenada X", yLabel: "Coordenada Y", coordinates: "Coordenadas do pixel", pixel: "Pixel amostrado", hex: "Valor HEX", hex8: "HEX8 com alfa", rgb: "Valor RGB", rgba: "Valor RGBA", copyHex: "Copiar HEX", copyFormat: "Copiar formato", copyRgba: "Copiar RGBA", clear: "Limpar imagem", statusReady: "Clique na imagem ou informe as coordenadas.", errors: { fileTooLarge: "O arquivo excede o limite de 25 MiB.", imageTooLarge: "A imagem excede o limite de 40 megapixels.", sideTooLarge: "Cada lado deve ter no máximo 16.384 pixels.", decode: "O navegador não conseguiu decodificar esta imagem.", noImage: "Escolha uma imagem antes de amostrar um pixel.", invalidCoord: "Informe coordenadas inteiras dentro da imagem." },
  },
  fr: { ...en, drop: "Déposez une image ou choisissez un fichier", localNote: "L’image reste dans votre navigateur. Formats raster PNG, JPG, JPEG, WebP, GIF et BMP acceptés.", reading: "Lecture de l’image…", xLabel: "Coordonnée X", yLabel: "Coordonnée Y", coordinates: "Coordonnées du pixel", pixel: "Pixel échantillonné", hex: "Valeur HEX", hex8: "HEX8 avec alpha", rgb: "Valeur RGB", rgba: "Valeur RGBA", copyHex: "Copier HEX", copyFormat: "Copier le format", copyRgba: "Copier RGBA", clear: "Effacer l’image", statusReady: "Cliquez sur l’image ou saisissez les coordonnées.", errors: { fileTooLarge: "Le fichier dépasse la limite de 25 Mio.", imageTooLarge: "L’image dépasse la limite de 40 mégapixels.", sideTooLarge: "Chaque côté doit mesurer au plus 16 384 pixels.", decode: "Le navigateur ne peut pas décoder cette image.", noImage: "Choisissez une image avant l’échantillonnage.", invalidCoord: "Saisissez des coordonnées entières dans l’image." } },
  de: { ...en, drop: "Bild ablegen oder Datei auswählen", localNote: "Das Bild bleibt im Browser. Unterstützt werden PNG, JPG, JPEG, WebP, GIF, BMP und weitere Rasterformate.", reading: "Bild wird gelesen…", xLabel: "X-Koordinate", yLabel: "Y-Koordinate", coordinates: "Pixelkoordinaten", pixel: "Abgetastetes Pixel", hex: "HEX-Wert", hex8: "HEX8 mit Alpha", rgb: "RGB-Wert", rgba: "RGBA-Wert", copyHex: "HEX kopieren", copyFormat: "Format kopieren", copyRgba: "RGBA kopieren", clear: "Bild löschen", statusReady: "Klicken Sie auf das Bild oder geben Sie Koordinaten ein.", errors: { fileTooLarge: "Die Datei überschreitet 25 MiB.", imageTooLarge: "Das Bild überschreitet 40 Megapixel.", sideTooLarge: "Jede Seite darf höchstens 16.384 Pixel haben.", decode: "Der Browser konnte dieses Bild nicht dekodieren.", noImage: "Wählen Sie vor dem Abtasten ein Bild aus.", invalidCoord: "Geben Sie ganzzahlige Koordinaten im Bild ein." } },
  ru: { ...en, drop: "Перетащите изображение или выберите файл", localNote: "Изображение остаётся в браузере. Поддерживаются PNG, JPG, JPEG, WebP, GIF, BMP и другие растровые форматы.", reading: "Читаем изображение…", xLabel: "Координата X", yLabel: "Координата Y", coordinates: "Координаты пикселя", pixel: "Выбранный пиксель", hex: "Значение HEX", hex8: "HEX8 с альфа-каналом", rgb: "Значение RGB", rgba: "Значение RGBA", copyHex: "Копировать HEX", copyFormat: "Копировать формат", copyRgba: "Копировать RGBA", clear: "Очистить изображение", statusReady: "Щёлкните изображение или введите координаты.", errors: { fileTooLarge: "Файл превышает ограничение 25 МиБ.", imageTooLarge: "Изображение превышает ограничение 40 мегапикселей.", sideTooLarge: "Каждая сторона должна быть не больше 16 384 пикселей.", decode: "Браузер не смог декодировать изображение.", noImage: "Выберите изображение перед выбором пикселя.", invalidCoord: "Введите целочисленные координаты внутри изображения." } },
  it: { ...en, drop: "Trascina un’immagine o scegli un file", localNote: "L’immagine resta nel browser. Sono supportati PNG, JPG, JPEG, WebP, GIF, BMP e altri formati raster.", reading: "Lettura dell’immagine…", xLabel: "Coordinata X", yLabel: "Coordinata Y", coordinates: "Coordinate del pixel", pixel: "Pixel campionato", hex: "Valore HEX", hex8: "HEX8 con alfa", rgb: "Valore RGB", rgba: "Valore RGBA", copyHex: "Copia HEX", copyFormat: "Copia formato", copyRgba: "Copia RGBA", clear: "Cancella immagine", statusReady: "Fai clic sull’immagine o inserisci le coordinate.", errors: { fileTooLarge: "Il file supera il limite di 25 MiB.", imageTooLarge: "L’immagine supera il limite di 40 megapixel.", sideTooLarge: "Ogni lato deve essere al massimo di 16.384 pixel.", decode: "Il browser non ha potuto decodificare l’immagine.", noImage: "Scegli un’immagine prima di campionare un pixel.", invalidCoord: "Inserisci coordinate intere dentro l’immagine." } },
  tr: { ...en, drop: "Bir görüntü bırakın veya dosya seçin", localNote: "Görüntü tarayıcınızda kalır.", reading: "Görüntü okunuyor…", xLabel: "X koordinatı", yLabel: "Y koordinatı", coordinates: "Piksel koordinatları", pixel: "Örneklenen piksel", copyHex: "HEX’i kopyala", copyRgba: "RGBA’yı kopyala", clear: "Görüntüyü temizle", statusReady: "Görüntüye tıklayın veya koordinat girin.", errors: { fileTooLarge: "Dosya 25 MiB sınırını aşıyor.", imageTooLarge: "Görüntü 40 megapiksel sınırını aşıyor.", sideTooLarge: "Her kenar en fazla 16.384 piksel olmalıdır.", decode: "Tarayıcı bu görüntüyü çözümleyemedi.", noImage: "Piksel örneklemeden önce bir görüntü seçin.", invalidCoord: "Görüntü içindeki tam koordinatları girin." } },
  ko: { ...en, drop: "이미지를 놓거나 파일을 선택하세요", localNote: "이미지는 브라우저 안에서만 처리됩니다.", reading: "이미지 읽는 중…", xLabel: "X 좌표", yLabel: "Y 좌표", coordinates: "픽셀 좌표", pixel: "샘플링한 픽셀", copyHex: "HEX 복사", copyRgba: "RGBA 복사", clear: "이미지 지우기", statusReady: "이미지를 클릭하거나 좌표를 입력하세요.", errors: { fileTooLarge: "파일이 25MiB 제한을 초과합니다.", imageTooLarge: "이미지가 4천만 픽셀 제한을 초과합니다.", sideTooLarge: "각 변은 16,384픽셀 이하여야 합니다.", decode: "브라우저가 이미지를 디코딩하지 못했습니다.", noImage: "픽셀을 샘플링하기 전에 이미지를 선택하세요.", invalidCoord: "이미지 안의 정수 좌표를 입력하세요." } },
  ar: { ...en, drop: "أفلت صورة أو اختر ملفاً", localNote: "تبقى الصورة داخل متصفحك.", reading: "جارٍ قراءة الصورة…", xLabel: "إحداثي X", yLabel: "إحداثي Y", coordinates: "إحداثيات البكسل", pixel: "البكسل المأخوذ", copyHex: "نسخ HEX", copyRgba: "نسخ RGBA", clear: "مسح الصورة", statusReady: "انقر على الصورة أو أدخل الإحداثيات.", errors: { fileTooLarge: "يتجاوز الملف حد 25 ميبيبايت.", imageTooLarge: "تتجاوز الصورة حد 40 مليون بكسل.", sideTooLarge: "يجب ألا يتجاوز كل جانب 16,384 بكسلاً.", decode: "تعذر على المتصفح فك ترميز الصورة.", noImage: "اختر صورة قبل أخذ عينة بكسل.", invalidCoord: "أدخل إحداثيات صحيحة داخل الصورة." } },
  hi: { ...en, drop: "एक छवि छोड़ें या फ़ाइल चुनें", localNote: "छवि आपके ब्राउज़र में ही रहती है।", reading: "छवि पढ़ी जा रही है…", xLabel: "X निर्देशांक", yLabel: "Y निर्देशांक", coordinates: "पिक्सेल निर्देशांक", pixel: "सैंपल किया गया पिक्सेल", copyHex: "HEX कॉपी करें", copyRgba: "RGBA कॉपी करें", clear: "छवि साफ़ करें", statusReady: "छवि पर क्लिक करें या निर्देशांक दर्ज करें।", errors: { fileTooLarge: "फ़ाइल 25 MiB सीमा से बड़ी है।", imageTooLarge: "छवि 40 मेगापिक्सेल सीमा से बड़ी है।", sideTooLarge: "हर किनारा 16,384 पिक्सेल या कम होना चाहिए।", decode: "ब्राउज़र इस छवि को डिकोड नहीं कर सका।", noImage: "पिक्सेल सैंपल करने से पहले छवि चुनें।", invalidCoord: "छवि के अंदर पूर्णांक निर्देशांक दर्ज करें।" } },
  id: { ...en, drop: "Letakkan gambar atau pilih file", localNote: "Gambar tetap berada di browser Anda.", reading: "Membaca gambar…", xLabel: "Koordinat X", yLabel: "Koordinat Y", coordinates: "Koordinat piksel", pixel: "Piksel sampel", copyHex: "Salin HEX", copyRgba: "Salin RGBA", clear: "Hapus gambar", statusReady: "Klik gambar atau masukkan koordinat.", errors: { fileTooLarge: "File melebihi batas 25 MiB.", imageTooLarge: "Gambar melebihi batas 40 megapiksel.", sideTooLarge: "Setiap sisi maksimal 16.384 piksel.", decode: "Browser tidak dapat mendekode gambar ini.", noImage: "Pilih gambar sebelum mengambil sampel piksel.", invalidCoord: "Masukkan koordinat bilangan bulat di dalam gambar." } },
  vi: { ...en, drop: "Thả một ảnh hoặc chọn tệp", localNote: "Ảnh chỉ được xử lý trong trình duyệt.", reading: "Đang đọc ảnh…", xLabel: "Tọa độ X", yLabel: "Tọa độ Y", coordinates: "Tọa độ điểm ảnh", pixel: "Điểm ảnh đã lấy mẫu", copyHex: "Sao chép HEX", copyRgba: "Sao chép RGBA", clear: "Xóa ảnh", statusReady: "Nhấp vào ảnh hoặc nhập tọa độ.", errors: { fileTooLarge: "Tệp vượt quá giới hạn 25 MiB.", imageTooLarge: "Ảnh vượt quá giới hạn 40 megapixel.", sideTooLarge: "Mỗi cạnh phải từ 16.384 pixel trở xuống.", decode: "Trình duyệt không thể giải mã ảnh này.", noImage: "Hãy chọn ảnh trước khi lấy mẫu điểm ảnh.", invalidCoord: "Nhập tọa độ số nguyên bên trong ảnh." } },
};

export const IMAGE_COLOR_PICKER_MESSAGES = translations;
