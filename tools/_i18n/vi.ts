import type { ToolCopy } from "../_lib/types";

/**
 * Lớp phủ tiếng Việt (vi) cho các công cụ trong registry: một khối ToolCopy đầy đủ mỗi slug.
 * Hợp đồng: phủ kín mọi slug của registry (tests/overlays.test.ts + tests/registry.test.ts).
 * "Zoyku" và các token kỹ thuật (PDF, JPG, JSON…) giữ nguyên vẹn.
 */
export const vi: Record<string, ToolCopy> = {
  /* ------------------------------------------------------------------ */
  /* PDF                                                                 */
  /* ------------------------------------------------------------------ */
  "compress-pdf": {
    name: "Nén PDF",
    tagline:
      "Thu nhỏ PDF nặng bằng cách raster hóa từng trang theo DPI và chất lượng JPEG bạn chọn — xử lý hàng loạt, hiện chính xác dung lượng trước/sau, hoàn toàn offline.",
    intro: [
      "Bản scan và báo cáo nhiều hình ảnh thường nặng gấp 10 lần mức cần thiết. Công cụ này vẽ lại từng trang ở độ phân giải bạn chọn (72–150 DPI đủ cho đọc trên màn hình và phần lớn việc in ấn) rồi mã hóa lại thành JPEG được tối ưu, thường giúp giảm 50–90% dung lượng.",
      "Xử lý nhiều file cùng lúc và xem chính xác mức tiết kiệm của từng file trước khi tải xuống. Chế độ xám (grayscale) giúp bản scan đen trắng còn nhẹ hơn nữa. Mọi thứ chạy ngay trên thiết bị của bạn — nén hay không, tài liệu vẫn ở nguyên chỗ.",
    ],
    steps: [
      "Kéo thả một hoặc nhiều file PDF (xử lý hàng loạt càng tốt).",
      "Chọn DPI và chất lượng JPEG, hoặc bật chế độ xám.",
      "Bấm Nén, so sánh dung lượng trước/sau rồi tải xuống.",
    ],
    faqs: [
      {
        q: "PDF của tôi còn giữ được văn bản chọn được sau khi nén?",
        a: "Không — phương pháp này raster hóa các trang thành ảnh nên chữ trở thành điểm ảnh. Đó là cái giá của mức giảm dung lượng lớn. Nếu cần văn bản tìm kiếm được, hãy giữ bản gốc và chỉ chia sẻ bản nén ở nơi dung lượng thực sự quan trọng.",
      },
      {
        q: "Nên chọn thông số nào?",
        a: "96 DPI với chất lượng khoảng 60% là mặc định tốt cho email và web. Dùng 150 DPI nếu PDF cần in; 72 DPI kèm chế độ xám khá mạnh tay nhưng ổn cho kho lưu trữ thuần văn bản.",
      },
      {
        q: "Nếu file hầu như không nhỏ lại thì sao?",
        a: "Những PDF rất đơn giản, thuần văn bản vốn đã tối ưu nên có thể không nén được thêm — bảng kết quả sẽ nói thật với bạn. Hạ DPI hoặc chất lượng rồi thử lại, hoặc chấp nhận rằng bản gốc đã nhẹ.",
      },
    ],
  },
  "delete-pdf-pages": {
    name: "Xóa trang PDF",
    tagline:
      "Loại bỏ những trang không cần khỏi PDF trong vài giây — nhập số trang cần xóa, tải file đã tinh gọn về, toàn bộ xử lý ngay trong trình duyệt của bạn.",
    intro: [
      "Trang trắng, trang bìa cũ, trang chứa dữ liệu của người khác — nhập dạng “1, 3-5” và nhận về một bản PDF sạch với mọi thứ còn lại nguyên vẹn. Công cụ hiển thị tổng số trang của tài liệu để bạn kiểm tra lại số thứ tự trước khi cắt.",
      "Các trang còn lại được sao chép từng byte nên chữ vẫn chọn được và ảnh giữ nguyên chất lượng. Mọi thứ diễn ra cục bộ với pdf-lib; file không bao giờ bị gửi đi.",
    ],
    steps: [
      "Kéo thả PDF cần tinh gọn.",
      "Nhập các trang cần xóa, ví dụ “2, 6-8”.",
      "Bấm Xóa trang và tải tài liệu còn lại về.",
    ],
    faqs: [
      {
        q: "Tôi có thể xóa tất cả các trang của tài liệu?",
        a: "Không — một PDF phải còn ít nhất một trang. Nếu nhập đủ mọi trang, công cụ sẽ từ chối; thay vào đó hãy xóa bớt để lại một trang nếu đó là điều bạn cần.",
      },
      {
        q: "Làm sao chỉ giữ lại vài trang?",
        a: "Đơn giản hơn là nghĩ ngược lại: xóa hết những gì bạn không cần. Nhập “2-10, 12” cho tài liệu 12 trang sẽ giữ lại trang 1 và 11.",
      },
      {
        q: "Đánh số trang thay đổi thế nào?",
        a: "Các trang tự khép lại: sau khi xóa trang 2-4, trang 5 cũ trở thành trang 2. Các liên kết nội bộ trỏ tới trang đã xóa có thể ngừng hoạt động.",
      },
    ],
  },
  "image-to-pdf": {
    name: "Ảnh sang PDF",
    tagline:
      "Gộp ảnh ở mọi định dạng — JPG, PNG, WebP, GIF và hơn nữa — thành một file PDF duy nhất, tự động chuyển đổi và không tải lên bất cứ đâu.",
    intro: [
      "Một công cụ cho mọi loại ảnh: kéo thả lô file JPG, PNG, WebP, GIF hoặc BMP trộn lẫn và tất cả sẽ vào chung một PDF. Định dạng nào chưa sẵn sàng cho PDF sẽ được chuyển đổi cục bộ qua canvas, nên lô ảnh lẫn loại vẫn hoạt động bình thường.",
      "Sắp xếp thứ tự trang, chọn khít theo ảnh hoặc A4/Letter có lề rồi xuất file. Đây là bản “dao đa năng” của các công cụ chuyển JPG và PNG của chúng tôi, với cùng lời hứa: file không bao giờ rời khỏi thiết bị của bạn.",
    ],
    steps: [
      "Kéo thả ảnh theo bất kỳ tổ hợp định dạng được hỗ trợ nào.",
      "Sắp xếp lại danh sách và chọn khổ trang.",
      "Bấm Tạo PDF và tải tài liệu của bạn về.",
    ],
    faqs: [
      {
        q: "Hỗ trợ những định dạng nào?",
        a: "Mọi thứ trình duyệt hiển thị được: JPG, PNG, WebP, GIF, BMP và AVIF trên đa số hệ thống. File vốn là JPG hoặc PNG được nhúng nguyên bản không mã hóa lại; các loại khác được chuyển sang PNG không mất dữ liệu trước.",
      },
      {
        q: "Ảnh HEIC từ iPhone thì sao?",
        a: "Các trình duyệt mới thường không giải mã trực tiếp được HEIC. Hãy chuyển chúng bằng công cụ HEIC sang JPG trước, rồi gộp các JPG tại đây.",
      },
      {
        q: "GIF động có còn động trong PDF?",
        a: "Không — trang PDF là tĩnh nên bạn chỉ nhận được khung hình đầu tiên. Hãy chuyển ảnh động thành video hoặc chia sẻ chính file GIF.",
      },
    ],
  },
  "jpg-to-pdf": {
    name: "JPG sang PDF",
    tagline:
      "Biến ảnh JPG thành một PDF gọn gàng ngay trong trình duyệt — nhập hàng loạt, sắp xếp không cần kéo thả, khổ A4, Letter hoặc khít theo ảnh.",
    intro: [
      "Chuyển bao nhiêu ảnh JPG tùy ý thành một PDF ngăn nắp: ảnh thẻ, biên lai, bài tập scan hay cả album cần gửi dưới dạng một tệp đính kèm duy nhất. Thêm tất cả ảnh cùng lúc, sắp xếp bằng các nút mũi tên, rồi chọn mỗi trang ôm khít theo ảnh hay dùng khổ A4/Letter có lề.",
      "Ảnh được nhúng ở chất lượng gốc — không thu nhỏ, không nén lại, không watermark. Việc chuyển đổi diễn ra trên thiết bị của bạn, nên dù là ảnh riêng tư cũng chẳng bao giờ chạm tới máy chủ.",
    ],
    steps: [
      "Kéo thả tất cả ảnh JPG muốn đưa vào.",
      "Sắp xếp thứ tự và chọn khổ trang (khít, A4 hoặc Letter).",
      "Bấm Tạo PDF và tải kết quả về.",
    ],
    faqs: [
      {
        q: "Ảnh có bị giảm chất lượng trong PDF?",
        a: "Không. File JPG của bạn được nhúng nguyên từng byte nên dữ liệu ảnh bên trong PDF y hệt bản gốc. Chất lượng chỉ giảm nếu bạn nén PDF sau đó.",
      },
      {
        q: "Một lần chuyển được bao nhiêu ảnh?",
        a: "Càng nhiều càng tốt miễn bộ nhớ trình duyệt cho phép — vài chục là chuyện thường; vài trăm ảnh nhiều MB có thể chậm nhưng vẫn chạy hoàn toàn cục bộ.",
      },
      {
        q: "Có thể trộn JPG với PNG hoặc định dạng khác?",
        a: "Có — dùng công cụ tổng quát Ảnh sang PDF cho các lô lẫn loại; nó tự chuyển các định dạng khác trước khi nhúng.",
      },
    ],
  },
  "merge-pdf": {
    name: "Gộp PDF",
    tagline:
      "Gộp nhiều file PDF thành một tài liệu ngay trong trình duyệt — sắp thứ tự tùy ý, không tải lên, không watermark, không cần đăng ký.",
    intro: [
      "Kéo thả bao nhiêu PDF tùy ý, sắp xếp đúng thứ tự bạn muốn rồi gộp thành một file duy nhất. Vé đặt chỗ, hóa đơn, các chương scan, hồ sơ ứng tuyển — mọi thứ vốn là mười tệp đính kèm rời rạc sẽ trở thành một tài liệu gọn gàng.",
      "Khác với các dịch vụ gộp trực tuyến đưa file của bạn lên máy chủ, công cụ này đọc và ghi PDF hoàn toàn trên thiết bị bằng pdf-lib. Hợp đồng, giấy tờ tùy thân và tài liệu tài chính không bao giờ rời khỏi trình duyệt.",
    ],
    steps: [
      "Kéo thả hai file PDF trở lên vào khung (hoặc bấm để chọn).",
      "Sắp xếp lại danh sách bằng các nút ↑ / ↓ cho đến khi thứ tự ưng ý.",
      "Bấm Gộp PDF và tải file kết hợp về.",
    ],
    faqs: [
      {
        q: "Gộp được bao nhiêu PDF, dung lượng tối đa bao nhiêu?",
        a: "Không có giới hạn cứng nào — trần thực tế là bộ nhớ thiết bị của bạn. Laptop hiện đại gộp thoải mái 20+ file hay khoảng 100–200 MB; bản scan rất lớn có thể chậm hơn nhưng vẫn chạy được.",
      },
      {
        q: "Bookmark, biểu mẫu và chú thích có giữ được sau khi gộp?",
        a: "Nội dung trang, hình ảnh và phần lớn chú thích được giữ nguyên. Các thành phần cấp tài liệu như bookmark và giá trị biểu mẫu không được chuyển sang — file gộp chứa các trang trực quan của từng bản gốc.",
      },
      {
        q: "File của tôi có bị tải lên đâu không?",
        a: "Không. Việc gộp diễn ra cục bộ trong trình duyệt bằng JavaScript. Không gì được gửi đến máy chủ nào, và PDF gộp được tạo ngay trên thiết bị của bạn.",
      },
    ],
  },
  "ocr-pdf": {
    name: "OCR PDF",
    tagline:
      "Chạy OCR cho bản scan PDF hoàn toàn trong trình duyệt — nhận dạng tiếng Anh, Trung, Nhật và hơn nữa, rồi sao chép hoặc lưu văn bản.",
    intro: [
      "Hợp đồng, hóa đơn và sách scan không có văn bản chọn được — OCR bổ sung khả năng đó. Mỗi trang được kết xuất trong trình duyệt rồi đọc bằng engine Tesseract, hỗ trợ tiếng Anh, Trung giản thể, Nhật, Tây Ban Nha, Bồ Đào Nha, Pháp và Đức.",
      "Lần đầu sử dụng, trình duyệt tải engine OCR và mô hình ngôn ngữ (10–20 MB) từ CDN công cộng — đó là toàn bộ lưu lượng mạng, và không bao gồm tài liệu của bạn. Việc nhận dạng diễn ra ngay trên thiết bị.",
    ],
    steps: [
      "Kéo thả PDF scan và chọn ngôn ngữ của tài liệu.",
      "Tùy chọn giới hạn OCR vào vài trang cụ thể, rồi bấm Chạy OCR.",
      "Sao chép văn bản nhận dạng được hoặc tải xuống dưới dạng .txt.",
    ],
    faqs: [
      {
        q: "Vì sao lần chạy đầu cần mạng?",
        a: "Engine OCR Tesseract và mô hình ngôn ngữ được tải từ CDN ở lần dùng đầu (10–20 MB, sau đó được cache). Bản PDF không bao giờ bị tải lên — nhận dạng chạy cục bộ ngay khi mô hình đã tải xong.",
      },
      {
        q: "Làm sao tăng độ chính xác?",
        a: "Scan ở 300 DPI, giữ trang thẳng và chọn đúng ngôn ngữ. Trang đen trắng sạch đạt hơn 90% chính xác; ảnh nghiêng, nhiều bóng đổ cho kết quả kém hơn nhiều.",
      },
      {
        q: "Đọc được chữ viết tay không?",
        a: "Không đáng tin. Tesseract được huấn luyện trên chữ in — typography ngay ngắn thì ổn, chữ viết tay khó đọc thường ra rác.",
      },
    ],
  },
  "page-numbers-pdf": {
    name: "Thêm số trang vào PDF",
    tagline:
      "Đóng dấu số trang lên PDF — chọn định dạng, góc và số bắt đầu, tất cả xử lý cục bộ ngay trong trình duyệt của bạn.",
    intro: [
      "Thêm số trang chuẩn chỉnh cho PDF trước khi in hay gửi đi: chọn định dạng (1, 1/N hoặc Page 1 of N), chọn một trong sáu góc, đặt số bắt đầu — file được dựng lại ngay trên thiết bị và sẵn sàng tải xuống.",
      "Hữu ích cho báo cáo, hợp đồng, hồ sơ scan và bất cứ tài liệu nào được trích dẫn theo trang trong cuộc họp.",
    ],
    steps: [
      "Kéo thả PDF cần đánh số.",
      "Chọn định dạng, góc và số bắt đầu.",
      "Bấm Thêm số trang và tải file đã đóng dấu về.",
    ],
    faqs: [
      {
        q: "Có thể bỏ qua trang bìa?",
        a: "Đặt “Bắt đầu đánh số từ” thành 0 để trang bìa nhận số 0 — hoặc tách trang bìa ra trước, đánh số phần còn lại rồi gộp lại.",
      },
      {
        q: "Số trang có nhất quán giữa các khổ giấy?",
        a: "Mỗi trang được đóng dấu theo đúng chiều rộng và cao của chính nó, nên các trang khác hướng và khác khổ đều nhận số ở cùng một góc nhìn trực quan.",
      },
    ],
  },
  "pdf-to-excel": {
    name: "PDF sang Excel",
    tagline:
      "Trích xuất hàng và cột của PDF thành bảng tính Excel (.xlsx) có thể chỉnh sửa — chuyển đổi theo từng dòng ngay trong trình duyệt, miễn phí.",
    intro: [
      "Sao kê ngân hàng, bảng giá và báo cáo bị khóa trong PDF trở thành dữ liệu dùng được trở lại: mỗi dòng hiển thị thành một hàng trong bảng tính, và phần chữ phân tách bằng khoảng cách lớn được tự động tách thành các cột. Số trang được giữ ở cột đầu tiên để bạn lần ngược lại dễ dàng.",
      "Đây là trích xuất dựa trên văn bản, thực dụng — không phải tái tạo bảng bằng AI. Nó phát huy với bản in phông cố định và danh sách căn thẳng hàng; bảng lộn xộn nhiều dòng có thể cần dọn nhanh trong Excel. Đổi lại: dữ liệu của bạn không bao giờ rời khỏi thiết bị.",
    ],
    steps: [
      "Kéo thả PDF dạng văn bản (chữ chọn được, không phải ảnh scan).",
      "Bấm Chuyển sang Excel.",
      "Tải file .xlsx về và dọn các hàng dính ở Excel.",
    ],
    faqs: [
      {
        q: "Cột được nhận diện thế nào?",
        a: "Mỗi dòng được tách thành các ô tại chỗ có từ hai khoảng trắng trở lên — dấu hiệu căn hàng quen thuộc của văn bản PDF. Bảng căn thẳng sẽ chuyển rất gọn; văn xuôi thì mỗi dòng thành một ô.",
      },
      {
        q: "Bản scan của tôi cho ra sheet trống.",
        a: "Bản scan không có lớp văn bản. Hãy chạy file qua công cụ OCR trước, rồi dán văn bản nhận dạng vào Excel, hoặc chuyển kết quả OCR tại đây.",
      },
      {
        q: "Con số có giữ nguyên định dạng?",
        a: "Giá trị được đưa vào dạng văn bản đúng như bản in, giữ số 0 ở đầu và dấu phẩy thập phân theo vùng miền — Excel coi đó là chuỗi cho tới khi bạn chuyển đổi cột.",
      },
    ],
  },
  "pdf-to-jpg": {
    name: "PDF sang JPG",
    tagline:
      "Xuất từng trang PDF thành ảnh JPG ở tới 300 DPI — trang đơn hoặc gói ZIP cho nhiều trang, chuyển đổi ngay trên thiết bị của bạn.",
    intro: [
      "Biến PDF thành ảnh dễ chia sẻ: mỗi trang thành một JPG ở độ phân giải bạn chọn, kết xuất đúng như trang hiển thị — đủ font, màu sắc và hình ảnh. Mười trang cho bạn mười file đánh số; từ hai trang trở lên bạn còn nhận thêm ZIP.",
      "JPG là định dạng chat, slide và mạng xã hội nào cũng chấp nhận. Kết xuất diễn ra cục bộ bằng pdf.js — PDF không bao giờ bị tải lên, điều quan trọng với hợp đồng và tài liệu cá nhân.",
    ],
    steps: [
      "Kéo thả PDF cần chuyển đổi.",
      "Chọn độ phân giải đầu ra (150 DPI phù hợp đa số màn hình).",
      "Bấm Chuyển đổi và tải từng trang hoặc cả ZIP về.",
    ],
    faqs: [
      {
        q: "Nên chọn độ phân giải nào?",
        a: "96 DPI đủ xem trên màn hình, 150 DPI là mặc định cân bằng, còn 200–300 DPI hợp để in. DPI càng cao thì file càng lớn và kết xuất càng chậm với tài liệu dài.",
      },
      {
        q: "Vì sao chữ trông mềm hơn so với PDF?",
        a: "JPG là định dạng ảnh nén có mất dữ liệu — ở chất lượng thấp, cạnh chữ sắc bị lỗi nhẹ. Hãy tăng DPI hoặc dùng công cụ PDF sang PNG để có chữ sắc tuyệt đối.",
      },
      {
        q: "Chỉ chuyển được một vài trang?",
        a: "Công cụ chuyển cả tài liệu và đặt tên file theo số trang nên bạn giữ lại đúng những trang cần. Muốn chọn trước một vùng trang cụ thể, hãy dùng Tách PDF trước.",
      },
    ],
  },
  "pdf-to-png": {
    name: "PDF sang PNG",
    tagline:
      "Chuyển trang PDF thành ảnh PNG không mất dữ liệu ở độ phân giải bạn chọn — slide và bản scan sắc nét, kèm ZIP khi có nhiều trang.",
    intro: [
      "Khi không chấp nhận lỗi nén JPG — chụp slide, sơ đồ, biểu mẫu chữ nhỏ — hãy xuất trang dưới dạng PNG. Định dạng không mất dữ liệu này giữ cạnh chữ và đường mảnh sắc từng điểm ảnh, từ 96 tới 300 DPI.",
      "Mỗi trang được kết xuất cục bộ bằng pdf.js đúng diện mạo mà PDF định nghĩa. File được đặt tên theo số trang và kết quả nhiều trang có thêm ZIP tải một lần.",
    ],
    steps: [
      "Kéo thả PDF vào khung.",
      "Chọn độ phân giải — 150 DPI là mặc định tốt.",
      "Bấm Chuyển sang PNG, rồi tải từng trang hoặc ZIP.",
    ],
    faqs: [
      {
        q: "Khi nào nên dùng PNG thay vì JPG?",
        a: "Bất cứ khi nào trang chứa chữ, màu phẳng hoặc đường nét: PNG giữ chúng sắc tuyệt đối. JPG hợp với trang chụp ảnh, nơi dung lượng nhỏ quan trọng hơn.",
      },
      {
        q: "Vì sao file PNG to thế?",
        a: "Nén không mất dữ liệu giữ nguyên từng điểm ảnh nên dung lượng tăng theo DPI. Scan 300 DPI của trang dày chữ có thể nặng vài MB; hãy giảm về 96–150 DPI nếu chỉ dùng trên màn hình.",
      },
      {
        q: "Độ trong suốt có được giữ lại?",
        a: "Trang được kết xuất trên nền trắng nên kết quả là PNG đặc. Điều đó trùng với cách PDF in ra và tránh tình trạng nền đen bất ngờ trong trình xem.",
      },
    ],
  },
  "pdf-to-ppt": {
    name: "PDF sang PowerPoint",
    tagline:
      "Chuyển từng trang PDF thành slide PowerPoint dạng ảnh độ phân giải cao — slide giữ đúng bố cục, tạo ngay trên thiết bị của bạn.",
    intro: [
      "Cần đưa PDF vào bộ slide? Mỗi trang được kết xuất ở độ phân giải cao và đặt trên một slide 16:9 riêng, nên kết quả hiển thị trùng khớp bản gốc — font, màu sắc và đồ họa giữ nguyên vị trí, kể cả khi máy xem không cài font đó.",
      "Slide là ảnh chứ không phải hộp văn bản chỉnh sửa được: đó là chủ đích, vì slide ảnh không bao giờ vỡ layout giữa các máy. Kết hợp với công cụ PDF sang Word khi bạn cần cả văn bản.",
    ],
    steps: [
      "Kéo thả PDF bạn muốn đưa vào bộ slide.",
      "Bấm Chuyển sang PowerPoint và chờ từng trang kết xuất.",
      "Tải file .pptx về và mở bằng PowerPoint, Keynote hoặc Google Slides.",
    ],
    faqs: [
      {
        q: "Chỉnh sửa được chữ trên slide không?",
        a: "Không — mỗi slide chứa một bức ảnh trung thành của trang, không phải hộp văn bản. Điều đó đảm bảo hiển thị giống nhau ở mọi nơi. Hãy trích văn bản riêng bằng PDF sang Word nếu cần chỉnh.",
      },
      {
        q: "Slide dùng khổ nào?",
        a: "Màn rộng 16:9 (13,33 × 7,5 inch), mặc định của PowerPoint. Trang có tỉ lệ khác được căn giữa và thu vừa không méo.",
      },
      {
        q: "File .pptx nặng bao nhiêu?",
        a: "Xấp xỉ tổng dung lượng các ảnh trang — PDF 20 trang ở độ phân giải cao có thể tới vài chục MB. Hãy nén PDF gốc trước nếu cần bộ slide nhẹ hơn.",
      },
    ],
  },
  "pdf-to-text": {
    name: "PDF sang Text",
    tagline:
      "Rút văn bản thuần từ bất kỳ PDF nào tức thì — xem trước, sao chép vào clipboard hoặc lưu thành .txt, trích theo từng trang ngay trong trình duyệt.",
    intro: [
      "Lấy nguyên văn bản từ PDF mà không cần copy-paste từng trang. Bộ trích xuất đi qua tài liệu, dựng lại thứ tự đọc và trao cho bạn văn bản thuần sạch sẽ để xem trước, sao chép một lần hoặc tải về thành file .txt.",
      "Dùng nó để đưa trích dẫn vào ghi chú, chạy văn bản qua công cụ khác, hoặc tạo bản lưu trữ chỉ chữ của một tài liệu. Số từ hiển thị ngay khi trích, và mọi thứ diễn ra tức thì vì toàn bộ chạy cục bộ.",
    ],
    steps: [
      "Kéo thả PDF có văn bản chọn được.",
      "Bấm Trích văn bản và đọc bản xem trước.",
      "Sao chép kết quả hoặc tải xuống dưới dạng .txt.",
    ],
    faqs: [
      {
        q: "Kết quả trống — vì sao?",
        a: "PDF của bạn có lẽ là bản scan: các trang là ảnh chụp chữ, không có lớp văn bản. Hãy dùng công cụ OCR thay thế; nó đọc chữ từ trong ảnh.",
      },
      {
        q: "Thứ tự đọc được xác định thế nào?",
        a: "Các phần tử văn bản được nhóm thành dòng theo tọa độ và các dòng được xếp từ trên xuống, trái sang phải. Bố cục nhiều cột có thể đan xen; tách PDF theo vùng cột trước có thể giúp.",
      },
      {
        q: "Có giới hạn trang hay dung lượng?",
        a: "Không giới hạn nhân tạo. Vài trăm trang vẫn ổn; trần thực tế là bộ nhớ trình duyệt, thường vượt xa tài liệu 100 MB.",
      },
    ],
  },
  "pdf-to-word": {
    name: "PDF sang Word",
    tagline:
      "Biến văn bản PDF thành tài liệu Word (.docx) chỉnh sửa được ngay trong trình duyệt — chuyển đổi tập trung vào văn bản, miễn phí, không tải lên.",
    intro: [
      "Trích chữ từ PDF thành file .docx bạn có thể chỉnh trong Word, Google Docs hoặc LibreOffice. Tiêu đề được nhận diện theo cỡ font, đoạn văn được dựng lại theo vị trí dòng, và kết quả là một tài liệu gọn nhẹ để bạn viết lại.",
      "Đây là chuyển đổi tập trung vào văn bản, nói thẳng: nó không dựng lại bố cục trang phức tạp, cột hay vị trí ảnh. Điểm cộng là riêng tư tuyệt đối — phân tích và tạo .docx diễn ra hoàn toàn trên thiết bị của bạn.",
    ],
    steps: [
      "Kéo thả PDF dạng văn bản (những cái bạn chọn được chữ).",
      "Bấm Chuyển sang Word và chờ một lát.",
      "Tải file .docx về và chỉnh ở bất cứ đâu.",
    ],
    faqs: [
      {
        q: "Vì sao bố cục khác bản PDF gốc?",
        a: "Đây là chuyển đổi tập trung vào văn bản: nó dựng lại đoạn văn và cấp tiêu đề thay vì sao chép trang từng điểm ảnh. Cùng những từ đó trong một mạch văn bản sạch, chỉnh sửa được — không phải bản sao trực quan.",
      },
      {
        q: "PDF của tôi là bản scan và cho ra tài liệu trống.",
        a: "PDF scan chứa ảnh chụp chữ chứ không phải chữ. Hãy chạy qua công cụ OCR trước, rồi dán hoặc chuyển văn bản nhận dạng được sang Word.",
      },
      {
        q: "Bảng và ảnh có giữ lại được không?",
        a: "Ảnh không được đưa vào .docx. Bảng chuyển thành các dòng văn bản thuần — dùng được, nhưng bảng phức tạp bạn sẽ cần dựng lại trong Word.",
      },
    ],
  },
  "png-to-pdf": {
    name: "PNG sang PDF",
    tagline:
      "Chuyển ảnh chụp màn hình và hình PNG thành một file PDF không cần nén lại — nhập hàng loạt, thứ tự tùy chọn, xử lý ngay trên thiết bị.",
    intro: [
      "Ảnh chụp màn hình, biểu đồ, sơ đồ và sản phẩm thiết kế thường là PNG — và người ta thường cần chúng dưới dạng PDF. Kéo thả cả lô, sắp thứ tự bằng các nút mũi tên và nhận về PDF không mất dữ liệu: dữ liệu PNG được nhúng nguyên bản nên chữ trong ảnh chụp màn hình vẫn sắc như dao cạo.",
      "Chọn trang khít theo ảnh để có kích thước chuẩn từng điểm ảnh, hoặc A4/Letter có lề để in. Mọi thứ được dựng bằng pdf-lib ngay trên thiết bị; không tải lên, không đánh cược chất lượng.",
    ],
    steps: [
      "Kéo thả các file PNG muốn gộp.",
      "Sắp thứ tự và chọn trang khít theo ảnh hoặc A4/Letter.",
      "Bấm Tạo PDF và tải về.",
    ],
    faqs: [
      {
        q: "Chất lượng PNG có được giữ nguyên tuyệt đối?",
        a: "Có. Luồng PNG được nhúng không đổi nên cạnh sắc, chữ nhỏ và vùng nền trong suốt nhìn đúng như các file nguồn.",
      },
      {
        q: "Nên chọn khổ nào cho ảnh chụp màn hình?",
        a: "“Khít theo ảnh” giữ mỗi ảnh ở đúng kích thước điểm ảnh gốc — tốt nhất để đọc trên màn hình. Chọn A4 hay Letter có lề khi PDF cần in.",
      },
      {
        q: "Vì sao PDF gốc PNG của tôi vẫn nặng?",
        a: "Dữ liệu PNG không mất dữ liệu vốn lớn. Nếu cần file nhỏ hơn, hãy chạy kết quả qua Nén PDF — đổi một chút độ trung thực lấy dung lượng.",
      },
    ],
  },
  "rearrange-pdf-pages": {
    name: "Sắp xếp lại trang PDF",
    tagline:
      "Sắp lại thứ tự trang PDF bằng thumbnail trực quan — di chuyển trang lên xuống, đảo ngược toàn bộ, xuất PDF mới hoàn toàn cục bộ.",
    intro: [
      "Scan tài liệu bị lệch thứ tự? Mỗi trang hiện lên như một thumbnail thật để bạn thấy chính xác mình đang di chuyển gì. Xáo trộn bằng các nút mũi tên, đảo cả tài liệu bằng Đảo ngược, và đặt lại thứ tự gốc bất cứ lúc nào.",
      "Trình tự mới được ghi vào một file PDF mới ngay trên thiết bị — các trang được sao chép từng byte nên chất lượng, font và văn bản chọn được đều nguyên vẹn sau khi xáo lại.",
    ],
    steps: [
      "Kéo thả PDF và chờ thumbnail các trang hiện ra.",
      "Di chuyển trang bằng ↑ / ↓, hoặc dùng Đảo ngược cho thứ tự ngược lại.",
      "Bấm Áp dụng thứ tự & tải xuống để nhận PDF mới.",
    ],
    faqs: [
      {
        q: "Vì sao PDF rất dài hiện số thay vì thumbnail ở các trang sau?",
        a: "Thumbnail được kết xuất trước cho 60 trang đầu để trình duyệt không đơ. Từ đó trở đi bạn vẫn thấy số trang và sắp xếp lại y hệt.",
      },
      {
        q: "Di chuyển trang từ vị trí 40 lên vị trí 2 được không?",
        a: "Được, nhưng phải bấm nhiều lần bằng nút mũi tên. Với bước nhảy lớn, thường nhanh hơn nếu đảo ngược tài liệu trước, hoặc tách rồi gộp các phần theo thứ tự mới.",
      },
      {
        q: "Sắp xếp lại có ảnh hưởng chất lượng?",
        a: "Hoàn toàn không. Các trang được sao chép nguyên vẹn vào tài liệu mới — chỉ thứ tự thay đổi.",
      },
    ],
  },
  "rotate-pdf": {
    name: "Xoay PDF",
    tagline:
      "Xoay trang PDF 90, 180 hoặc 270 độ và lưu vĩnh viễn vào file — sửa bản scan bị nằm ngang ngay trong trình duyệt, không tải lên.",
    intro: [
      "Scan bị nằm ngang hay lộn ngược? Xoay mọi trang cùng lúc, hoặc chỉ nhắm đúng những trang cần sửa với danh sách dạng “1, 3-5”. Thông tin xoay được ghi thẳng vào PDF nên file mở đúng chiều trong mọi trình đọc.",
      "Nhiều trình xem chỉ xoay tạm thời — công cụ này thay thuộc tính /Rotate của trang bằng pdf-lib ngay trên thiết bị của bạn, vì thế bản sửa được giữ nguyên khi in, chia sẻ hay tải lên lại.",
    ],
    steps: [
      "Kéo thả PDF có trang cần xoay.",
      "Chọn 90°, 180° hoặc 270°, tùy chọn giới hạn vào vài trang cụ thể.",
      "Bấm Xoay trang và tải PDF đã sửa về.",
    ],
    faqs: [
      {
        q: "Việc xoay có vĩnh viễn không?",
        a: "Có. Thuộc tính xoay được cập nhật ngay trong file nên mọi trình đọc PDF, máy in và bản xem trước đều hiển thị đúng chiều — không chỉ tab trình duyệt này.",
      },
      {
        q: "Xoay một vài trang thì làm sao?",
        a: "Điền danh sách vào ô trang, ví dụ “2, 5-7”. Để trống để xoay cả tài liệu. Cú pháp vùng giống các công cụ trang khác.",
      },
      {
        q: "Xoay có mã hóa lại hay nén trang không?",
        a: "Không. Chỉ cờ xoay thay đổi; nội dung trang nguyên vẹn nên chất lượng y hệt và chữ vẫn chọn được.",
      },
    ],
  },
  "sign-pdf": {
    name: "Ký PDF",
    tagline:
      "Vẽ chữ ký bằng chuột hoặc ngón tay và đặt lên bất kỳ trang PDF nào — dấu chữ ký nét mực tự nhiên, tạo và lưu hoàn toàn offline.",
    intro: [
      "Ký hợp đồng, giấy ủy quyền và biểu mẫu mà không cần in ra. Vẽ chữ ký trên bàn ký, đặt vị trí theo lưới 3×3 (góc dưới phải là chỗ quen thuộc), chỉnh độ rộng và tùy chọn thêm ngày hôm nay bên dưới. Ảnh PNG trong suốt được nhúng thẳng vào PDF.",
      "Đây là chữ ký dạng ảnh, hiển thị rõ — phù hợp tài liệu hằng ngày. Nó không phải chữ ký chứng thực số bằng mật mã, và việc có được chấp nhận về pháp lý hay không tùy quy định từng nơi.",
    ],
    steps: [
      "Kéo thả PDF, rồi vẽ chữ ký trên bàn ký.",
      "Chọn vị trí, độ rộng và trang đích (mặc định trang 1).",
      "Bấm Ký & tải xuống và lưu PDF đã ký.",
    ],
    faqs: [
      {
        q: "Chữ ký này có giá trị pháp lý?",
        a: "Ảnh chữ ký vẽ tay được chấp nhận rộng rãi cho thỏa thuận hằng ngày, nhưng hiệu lực pháp lý khác nhau tùy quốc gia và loại tài liệu. Với giao dịch bắt buộc chứng thực, hãy dùng chứng thư số đủ điều kiện.",
      },
      {
        q: "Chữ ký có được bảo mật không?",
        a: "Có. Bạn vẽ ngay trong trình duyệt, ảnh được nhúng vào PDF trên chính thiết bị của bạn và không có gì được truyền đi — kể cả chữ ký.",
      },
      {
        q: "Ký được mọi trang của tài liệu?",
        a: "Được. Điền danh sách vào ô trang như “1-5” hoặc để một trang; chữ ký được đóng ở cùng vị trí trên từng trang được chọn.",
      },
    ],
  },
  "split-pdf": {
    name: "Tách PDF",
    tagline:
      "Tách PDF thành nhiều file theo số trang cố định hoặc vùng tùy chỉnh — mọi kết quả tạo ngay cục bộ, không tải lên bất cứ đâu.",
    intro: [
      "Cắt PDF dài thành các file nhỏ theo hai cách: cứ mỗi N trang cắt một lần (tiện cho mỗi trang một file hoặc khổ theo chương), hoặc tự định nghĩa các vùng như “1-3, 4-6, 8” và nhận một file cho mỗi vùng. Nhiều kết quả được đóng gói thành ZIP tự động.",
      "Việc tách chạy trên thiết bị của bạn bằng pdf-lib — file gốc nguyên vẹn, và các phần không hề đi qua máy chủ nào. Lý tưởng cho tài liệu mật mà bạn không muốn tải lên đâu cả.",
    ],
    steps: [
      "Kéo thả PDF cần tách.",
      "Chọn “mỗi N trang” hoặc vùng tùy chỉnh rồi nhập giá trị.",
      "Bấm Tách PDF, rồi tải từng phần hoặc cả ZIP.",
    ],
    faqs: [
      {
        q: "Tách PDF thành từng trang đơn thế nào?",
        a: "Chọn “Mỗi N trang”, đặt là 1, và mỗi trang thành một PDF riêng. Từ hai file kết quả trở lên bạn còn nhận thêm ZIP chứa tất cả.",
      },
      {
        q: "Cú pháp vùng hỗ trợ những gì?",
        a: "Các giá trị cách nhau bằng dấu phẩy và vùng dùng gạch ngang, ví dụ “1-3, 5, 8-10”. Các vùng có thể chồng nhau và được xử lý theo thứ tự bạn nhập.",
      },
      {
        q: "Tách có làm giảm chất lượng trang?",
        a: "Không. Trang được sao chép từng byte vào tài liệu mới nên chữ vẫn chọn được và ảnh giữ nguyên chất lượng gốc.",
      },
    ],
  },
  "watermark-pdf": {
    name: "Watermark PDF",
    tagline:
      "Đóng watermark chữ lên mọi trang PDF — căn giữa hoặc phủ kín, kiểm soát trọn kích thước, độ mờ, góc xoay và màu, hoàn toàn offline.",
    intro: [
      "Đánh dấu bản nháp là CONFIDENTIAL, DRAFT hay FOR REVIEW trước khi rời khỏi tay bạn. Chọn một con dấu căn giữa hoặc phủ lặp khắp trang, chỉnh độ mờ để chữ bên dưới vẫn đọc được, và chọn màu phù hợp với tài liệu.",
      "Watermark trở thành chữ PDF thật được vẽ trên từng trang — không phải ảnh, không đi qua máy chủ. Vì xử lý bằng pdf-lib ngay trên thiết bị, kể cả hợp đồng nhạy cảm cũng được đánh dấu mà không cần tải lên.",
    ],
    steps: [
      "Kéo thả PDF cần đánh dấu.",
      "Nhập chữ watermark rồi chỉnh bố cục, kích thước, độ mờ và màu.",
      "Bấm Thêm watermark và tải PDF đã đóng dấu về.",
    ],
    faqs: [
      {
        q: "Độ mờ bao nhiêu là đẹp?",
        a: "Từ 10% đến 25% cho đa số tài liệu: nhìn thấy ngay nhưng vẫn đủ nhẹ để chữ chính đọc được. Bản nháp cần khó đọc có thể lên tới 40–50%.",
      },
      {
        q: "Xóa được watermark sẵn có bằng công cụ này?",
        a: "Không. Công cụ này chỉ thêm watermark. Muốn xóa phải sửa luồng nội dung trang — một việc khác (và thường đáng ngờ về pháp lý).",
      },
      {
        q: "Watermark dùng được ký tự nào?",
        a: "Font PDF chuẩn gồm chữ Latinh, dấu câu và ký hiệu quen như ©. Các chữ hệ khác (Trung, Nhật, Ả Rập…) bị thay bằng ? — hãy giữ watermark bằng chữ Latinh.",
      },
    ],
  },
  "word-to-pdf": {
    name: "Word sang PDF",
    tagline:
      "Chuyển tài liệu Word .docx thành PDF ngay trong trình duyệt — dàn trang tập trung vào văn bản với tiêu đề và chữ đậm, không tải lên bất cứ gì.",
    intro: [
      "Biến .docx thành PDF sạch, dễ chia sẻ: đoạn văn, tiêu đề và chữ đậm được dàn lại trên các trang A4 có lề chuẩn, nên kết quả trông ngăn nắp dù máy không cài Word. Đọc, in và gửi đi đều suôn sẻ.",
      "Đây là chuyển đổi tập trung văn bản, nói thật, không phải bản sao từng điểm ảnh của layout Word: ảnh, bảng và trang trí từ bản gốc không được chuyển sang. Bạn nhận được phần chữ của tài liệu trong một PDF đáng tin, ai cũng đọc được — tạo hoàn toàn trên thiết bị của bạn.",
    ],
    steps: [
      "Kéo thả file .docx (Word 2007 trở lên).",
      "Bấm Chuyển sang PDF.",
      "Tải PDF đã dàn trang về.",
    ],
    faqs: [
      {
        q: "Vì sao PDF trông khác Word?",
        a: "Công cụ dàn lại chữ bằng layout riêng gọn gàng thay vì mô phỏng engine của Word. Font, khoảng cách và ảnh trong bản gốc không được tái tạo — nhưng từ ngữ, tiêu đề và phần nhấn mạnh thì có.",
      },
      {
        q: "Ảnh và bảng có được đưa vào không?",
        a: "Không, chỉ văn bản — gồm tiêu đề và chữ đậm. Với tài liệu mà hình ảnh quan trọng, hãy xuất PDF từ chính Word và dùng công cụ này cho bản thảo ưu tiên chữ, ghi chú.",
      },
      {
        q: "Hỗ trợ file .doc cũ hay chữ không Latinh?",
        a: "Chỉ hỗ trợ .docx. Văn bản dùng font chuẩn PDF nên các ngôn ngữ gốc Latinh hiển thị đúng, còn hệ chữ khác (Trung, Ả Rập…) tạm thời bị thay bằng ?.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Image                                                               */
  /* ------------------------------------------------------------------ */
  "crop-image": {
    name: "Cắt ảnh",
    tagline:
      "Cắt ảnh theo 1:1, 4:3, 16:9 hoặc vùng tự do với tay nắm kéo và tọa độ chính xác từng điểm ảnh — nhanh, riêng tư, hỗ trợ hàng loạt.",
    intro: [
      "Kéo các tay nắm ở góc để chọn đúng vùng cần giữ, hoặc nhập thẳng X, Y, rộng và cao để cắt chính xác từng điểm ảnh. Các tỉ lệ có sẵn — 1:1 cho avatar, 4:3 và 3:2 cho ảnh in, 16:9 và 9:16 cho video và stories — tự khít khung chọn đúng hình ngay lập tức.",
      "Đang xử lý cả bộ ảnh? Vùng chọn được thu phóng theo tỉ lệ cho từng file trong lô, nên cả thư mục được cắt đồng đều. Cắt chỉ bỏ bớt điểm ảnh — không thu phóng lại — nên vùng giữ lại giữ trọn chất lượng gốc.",
    ],
    steps: [
      "Kéo thả một hoặc nhiều ảnh; bấm tên file để xem trước và cắt từng tấm.",
      "Chọn tỉ lệ có sẵn hoặc kéo tay nắm vùng chọn; tinh chỉnh bằng các ô X / Y / W / H.",
      "Áp dụng cắt và tải kết quả về.",
    ],
    faqs: [
      {
        q: "Cắt có làm giảm chất lượng ảnh?",
        a: "Không. Cắt chỉ bỏ phần điểm ảnh bên ngoài — vùng giữ lại được sao chép ở trọn độ phân giải gốc. Chất lượng chỉ đổi nếu sau đó bạn thu phóng hoặc nén kết quả.",
      },
      {
        q: "Cắt hàng loạt với ảnh kích thước khác nhau hoạt động ra sao?",
        a: "Vùng chọn được lưu tương đối theo ảnh bạn xem trước. Khi áp lên file khác, nó được thu phóng theo tỉ lệ với kích thước riêng của từng ảnh, nên bố cục vùng cắt đồng nhất trên cả lô.",
      },
      {
        q: "Ảnh đại diện nên dùng tỉ lệ nào?",
        a: "1:1 (vuông). Đa số nền tảng xã hội cắt avatar thành hình tròn trong khung vuông, nên đặt chủ thể vào giữa vùng chọn 1:1 là an toàn nhất.",
      },
    ],
  },
  "exif-remover": {
    name: "Xóa EXIF",
    tagline:
      "Loại bỏ EXIF, GPS và metadata ẩn khỏi ảnh bằng cách mã hóa lại cục bộ — chia sẻ ảnh mà không lộ vị trí hay thiết bị chụp.",
    intro: [
      "Mỗi ảnh chụp điện thoại có thể mang theo hành lý ẩn: tọa độ GPS nơi chụp, model máy, dấu thời gian, thậm chí số serial. Công cụ này xóa sạch tất cả bằng cách vẽ lại ảnh từ chính các điểm ảnh gốc — metadata không còn chỗ trốn trong một canvas mới, nên EXIF, GPS, thumbnail và ghi chú đều biến mất.",
      "Kết quả giữ nguyên định dạng gốc và bức ảnh nhìn không khác (chất lượng 92% cho JPG và WebP), mỗi dòng hiển thị dung lượng trước và sau. Chế độ hàng loạt quét sạch cả thư mục ảnh trong một lần, hoàn toàn offline trên thiết bị của bạn.",
    ],
    steps: [
      "Kéo thả ảnh bạn định chia sẻ — một tấm hoặc cả lô.",
      "Chờ một lát trong lúc từng ảnh được mã hóa lại cục bộ mà không kèm metadata.",
      "Tải các ảnh đã làm sạch về từng cái hoặc tất cả một lần.",
    ],
    faqs: [
      {
        q: "Mã hóa lại xóa metadata thế nào?",
        a: "Ảnh được giải mã thành điểm ảnh thô và vẽ lại lên canvas trống rồi mã hóa lần nữa. Metadata nằm trong các phần riêng của file, ngoài vùng điểm ảnh, và lần mã hóa mới đơn giản là không chứa chúng — nên EXIF, GPS, thumbnail và lịch sử chỉnh sửa bị bỏ lại hoàn toàn.",
      },
      {
        q: "Xóa EXIF có làm thay đổi diện mạo ảnh?",
        a: "Không có thay đổi thấy được. Điểm ảnh được giữ ở chất lượng 92% JPEG/WebP (PNG không mất dữ liệu) nên ảnh nhìn y hệt. Một hệ quả: hướng xoay vốn chỉ lưu bằng cờ EXIF được “nướng” vào điểm ảnh — thực ra giúp file hiển thị nhất quán hơn giữa các app.",
      },
      {
        q: "Xóa metadata mà không nén lại ảnh được không?",
        a: "Không có cách an toàn nào trong trình duyệt. Loại bỏ metadata không mất dữ liệu đòi hỏi viết lại cấu trúc file — PNG có thể làm sạch không mất dữ liệu bằng công cụ chuyên dụng, nhưng với JPEG, cách đáng tin và đơn giản chính là mã hóa lại. Ảnh PNG đầu vào ở đây giữ từng điểm ảnh nguyên vẹn.",
      },
    ],
  },
  "favicon-generator": {
    name: "Trình tạo Favicon",
    tagline:
      "Biến bất kỳ logo hay ảnh nào thành bộ favicon hoàn chỉnh — PNG từ 16 tới 512 px, tùy chọn bo góc, kèm mã HTML dán ngay. Chạy trong trình duyệt.",
    intro: [
      "Kéo thả một ảnh gần vuông và nhận sáu kích thước PNG mà dự án thật cần: favicon 16, 32 và 48 px, apple-touch-icon 180 px, và icon 192 / 512 px cho Android và PWA manifest. Ảnh không vuông được đặt giữa canvas vuông, đệm bằng màu nền bạn chọn, còn góc có thể vuông, bo tròn hoặc thành hình tròn trọn.",
      "Mỗi kích thước được kết xuất đúng số điểm ảnh thật và tải về riêng lẻ hoặc chung một file .zip, cùng đoạn mã <head> dán vào là xong, trỏ đúng tên file — nên các file thả thẳng vào thư mục public của dự án.",
    ],
    steps: [
      "Kéo thả một ảnh — logo vuông cho kết quả đẹp nhất.",
      "Chọn màu nền đệm và kiểu góc (vuông, bo tròn hoặc tròn).",
      "Tạo bộ icon, rồi tải từng kích thước hoặc cả file .zip.",
      "Dán đoạn HTML vào <head> của trang và tải các PNG lên.",
    ],
    faqs: [
      {
        q: "Thực ra cần những kích thước favicon nào?",
        a: "16 và 32 px cho tab trình duyệt, 48 px giúp shortcut và bookmark, 180 px là thứ màn hình chính iOS đòi hỏi, còn 192 / 512 px là kích thước Android và web app manifest tìm kiếm. Tạo đủ sáu cái một lần là khỏi phải nghĩ nữa.",
      },
      {
        q: "Vì sao logo của tôi mờ ở 16 px?",
        a: "Icon tab 16 px chỉ có 256 điểm ảnh, nên chi tiết nhỏ và nét mảnh đơn giản là biến mất. Bộ favicon đẹp nhất khi tạo từ một dấu hiệu đậm, tương phản cao — nếu logo nhiều chi tiết, hãy vẽ một phiên bản đơn giản hóa làm ảnh nguồn.",
      },
      {
        q: "Vẫn cần file .ico không?",
        a: "Trình duyệt hiện đại dùng PNG favicon qua thẻ <link> thoải mái, và đoạn mã công cụ tạo ra là đủ. .ico kiểu cũ chỉ còn ý nghĩa với trình duyệt rất già, hiếm đến mức đa số trang web có thể bỏ qua.",
      },
    ],
  },
  "grayscale-image": {
    name: "Ảnh đen trắng",
    tagline:
      "Chuyển ảnh sang đen trắng theo lô — loại bỏ màu khỏi bản scan, bản in và bộ ảnh, tất cả xử lý cục bộ.",
    intro: [
      "Biến cả bộ ảnh thành phiên bản đen trắng sạch trong một lần: kéo thả lô ảnh, chọn đầu ra JPG hoặc PNG, và mọi ảnh được khử màu ngay trên thiết bị bằng engine màu của chính trình duyệt.",
      "Hữu ích khi chuẩn bị bản scan sẵn sàng in, đồng nhất một bộ ảnh, hoặc loại màu khỏi tài liệu trước khi OCR.",
    ],
    steps: [
      "Kéo thả một ảnh hoặc cả lô.",
      "Chọn đầu ra JPG (nhẹ hơn) hoặc PNG (không mất dữ liệu).",
      "Chạy chuyển đổi và tải từng bản đen trắng về.",
    ],
    faqs: [
      {
        q: "Có giống khử màu bằng phần mềm chỉnh ảnh?",
        a: "Nó dùng bộ lọc grayscale chuẩn của trình duyệt — phép chuyển độ sáng trung tính. Ảnh nghệ thuật cần đường cong tương phản thì dùng trình chỉnh sửa; khử màu đều và sạch thì đây là lựa chọn.",
      },
      {
        q: "Vì sao PNG của tôi to hơn sau khi chuyển?",
        a: "Grayscale không đổi cách nén: ảnh nhiều nhiễu có thể nén khác đi chút ít. Chọn JPG cho ảnh chụp và PNG chỉ cho đồ họa phẳng.",
      },
    ],
  },
  "heic-to-jpg": {
    name: "HEIC sang JPG",
    tagline:
      "Chuyển ảnh HEIC của iPhone sang JPG hoặc PNG để mở được ở mọi nơi — chuyển hàng loạt có chỉnh chất lượng, tất cả ngay trên thiết bị.",
    intro: [
      "iPhone lưu ảnh ở định dạng HEIC — tiết kiệm dung lượng nhưng Windows, nhiều trang web và app cũ vẫn từ chối mở. Kéo thả file .heic vào đây và nhận bản JPG đọc được ở mọi nơi (hoặc PNG không mất dữ liệu) trong vài giây — bộ giải mã chạy cục bộ nên ảnh của bạn chẳng bao giờ chạm tới máy chủ.",
      "Chế độ hàng loạt xử lý trọn cuộn ảnh cùng lúc, và thanh trượt chất lượng giúp bạn cân bằng giữa dung lượng JPG và độ trung thực. Ảnh lớn mất vài giây mỗi tấm vì việc giải mã HEIC diễn ra ngay trong trình duyệt.",
    ],
    steps: [
      "Kéo thả file .heic hoặc .heif (chuyển qua AirDrop hoặc tải từ iPhone trước).",
      "Chọn đầu ra JPG hoặc PNG và đặt chất lượng JPEG.",
      "Bấm chuyển đổi và tải các ảnh mở được ở mọi nơi về.",
    ],
    faqs: [
      {
        q: "HEIC là gì và vì sao ảnh của tôi dùng nó?",
        a: "HEIC (High Efficiency Image Container) là định dạng ảnh mặc định trên iPhone từ iOS 11. Nó lưu ảnh nhỏ hơn JPEG khoảng một nửa, nhưng hỗ trợ ngoài hệ sinh thái Apple còn lỏng lẻo — vì thế chuyển sang JPG vẫn là lựa chọn đáng tin khi chia sẻ.",
      },
      {
        q: "Chuyển HEIC sang JPG có mất chất lượng?",
        a: "Một chút, nhưng ở chất lượng mặc định 90% khác biệt là vô hình trong thực tế. Nếu muốn không thêm bất kỳ mất mát nào, chọn đầu ra PNG — đổi lại file to hơn nhiều.",
      },
      {
        q: "Ảnh iPhone của tôi có bị tải lên đâu không?",
        a: "Không. Việc chuyển đổi diễn ra trong trình duyệt bằng bộ giải mã HEIC cục bộ. Ảnh ở lại thiết bị của bạn suốt quá trình — công cụ thậm chí chạy được cả khi offline sau khi trang đã tải.",
      },
    ],
  },
  "image-compressor": {
    name: "Nén ảnh",
    tagline:
      "Nén ảnh JPG, PNG và WebP với thanh trượt chất lượng trực tiếp, xử lý hàng loạt và dung lượng trước/sau tức thì — tất cả trong trình duyệt.",
    intro: [
      "Kéo thả một ảnh hoặc cả lô và xem dung lượng giảm ngay theo thời gian thực. Thanh trượt chất lượng từ 10% tới 100% cho bạn cân bằng giữa trọng lượng và độ sắc, và mỗi dòng hiển thị dung lượng gốc cạnh kết quả nén để bạn biết chính xác đã tiết kiệm bao nhiêu.",
      "Đầu ra có thể là JPG (nhẹ nhất cho ảnh chụp), WebP (thường nhỏ hơn JPG 20–30% ở cùng chất lượng) hoặc PNG (không mất dữ liệu). Mọi thứ chạy trên thiết bị bằng bộ mã hóa ảnh của chính trình duyệt — không tải lên, không xếp hàng, không watermark.",
    ],
    steps: [
      "Kéo thả ảnh vào khung (hoặc bấm để chọn) — bao nhiêu cũng được.",
      "Chọn định dạng đầu ra và kéo thanh chất lượng tới khi cột dung lượng ưng ý.",
      "Tải từng ảnh đã nén, hoặc tải tất cả cùng lúc.",
    ],
    faqs: [
      {
        q: "Vì sao nén JPEG hai lần lại tệ hơn?",
        a: "JPEG là nén có mất dữ liệu: mỗi lần lưu bỏ đi chi tiết không thể lấy lại. Nén một JPEG đã nén thêm lỗi mới chồng lên lỗi cũ. Để có kết quả tốt nhất, luôn nén từ file gốc và tránh lưu JPEG đi lưu lại nhiều lần.",
      },
      {
        q: "Định dạng nào cho file nhỏ nhất?",
        a: "Với ảnh chụp, WebP thường nhỏ hơn JPEG 20–30% ở cùng chất lượng nhìn thấy được, và JPEG thắng PNG. PNG chỉ thắng với đồ họa phẳng, ảnh chụp màn hình và logo ít màu. Thử WebP ở chất lượng 75–85 làm điểm khởi đầu.",
      },
      {
        q: "Ảnh của tôi có bị tải lên máy chủ?",
        a: "Không. Việc nén do bộ mã hóa canvas dựng sẵn của trình duyệt thực hiện. File không bao giờ rời khỏi thiết bị — bạn thậm chí có thể ngắt mạng và nó vẫn chạy.",
      },
    ],
  },
  "image-metadata-viewer": {
    name: "Xem Metadata Ảnh",
    tagline:
      "Xem kích thước ảnh, định dạng file, dung lượng và chi tiết EXIF — máy ảnh, ống kính, phơi sáng, ngày chụp và GPS — không cần tải lên bất cứ gì.",
    intro: [
      "Kéo thả một bức ảnh và xem mọi thứ nó mang theo: kích thước điểm ảnh, số megapixel, định dạng và dung lượng file ngay lập tức. Với ảnh JPEG, bộ đọc EXIF dựng sẵn đào sâu hơn — hãng và model máy ảnh, ống kính, thời gian phơi sáng, khẩu độ, ISO, tiêu cự, ngày chụp và hướng ảnh, được phân tích bởi một bộ đọc tối giản chạy hoàn toàn trên thiết bị của bạn.",
      "Nếu ảnh chứa tọa độ GPS, chúng hiển thị dạng thập phân kèm tra cứu bản đồ một cú bấm — tiện để kiểm tra điện thoại đã nhúng gì vào ảnh trước khi chia sẻ. File không phải JPEG hiển thị độ sâu bit và kiểu màu của PNG, vì EXIF là chuẩn thời JPEG mà chúng không mang.",
    ],
    steps: [
      "Kéo thả một hoặc nhiều ảnh vào khung.",
      "Đọc thẻ tổng quan: kích thước, định dạng, dung lượng và mọi trường EXIF tìm được.",
      "Mở vị trí GPS trên bản đồ nếu có — hoặc nhảy sang trình xóa EXIF để gỡ bỏ.",
    ],
    faqs: [
      {
        q: "Dữ liệu EXIF là gì?",
        a: "EXIF (Exchangeable Image File Format) là chuẩn metadata mà máy ảnh nhúng vào ảnh JPEG: model thiết bị, ống kính, thông số phơi sáng, dấu thời gian, hướng ảnh và đôi khi cả tọa độ GPS. Nó vô hình trong bức ảnh nhưng có thể tiết lộ ảnh chụp ở đâu và bằng máy gì.",
      },
      {
        q: "Vì sao file PNG hay WebP của tôi không có EXIF?",
        a: "EXIF chủ yếu do JPEG mang theo. PNG, GIF và phần lớn file WebP không nhúng nó nên thực sự không có gì để hiển thị — trình xem báo kích thước của chúng, và với PNG là độ sâu bit cùng kiểu màu lấy từ phần đầu file.",
      },
      {
        q: "Xem metadata có làm thay đổi ảnh?",
        a: "Không. File được mở ở chế độ chỉ đọc; công cụ giải mã một bản sao trong bộ nhớ và không bao giờ ghi đè lên file gốc. Ảnh của bạn được hiển thị và phân tích hoàn toàn trên thiết bị.",
      },
    ],
  },
  "image-resizer": {
    name: "Đổi kích thước ảnh",
    tagline:
      "Đổi kích thước ảnh theo điểm ảnh chính xác hoặc theo phần trăm, khóa tỉ lệ khung hình, xử lý cả lô cùng lúc — không gì rời khỏi thiết bị của bạn.",
    intro: [
      "Nhập chiều rộng và cao chính xác bằng điểm ảnh, hoặc thu phóng theo phần trăm (25%, 50%, 200%…). Chốt khóa tỉ lệ giữ đúng hình dạng khi bạn đổi một chiều, còn mở khóa cho phép ép mọi kích thước tùy ý — hữu ích cho kích thước avatar hay banner của từng nền tảng.",
      "Chế độ hàng loạt áp cùng thiết lập cho mọi file bạn kéo vào, nên cả thư mục ảnh có thể thu nhỏ cho web trong một lần. Thu nhỏ dùng thuật toán làm mượt chất lượng cao, và đầu ra giữ nguyên định dạng gốc.",
    ],
    steps: [
      "Kéo thả một hoặc nhiều ảnh vào khung.",
      "Nhập chiều rộng/cao theo điểm ảnh hoặc phần trăm phóng; bật/tắt khóa để giữ hay buông tỉ lệ khung hình.",
      "Tải các ảnh đã đổi kích thước về từng cái hoặc tất cả cùng lúc.",
    ],
    faqs: [
      {
        q: "Phóng to ảnh có giảm chất lượng?",
        a: "Có. Phóng to phải “sáng chế” điểm ảnh mới, gây mềm hoặc mờ — không công cụ nào thêm được chi tiết chưa từng được ghi lại. Thu nhỏ thì an toàn: bỏ bớt điểm ảnh bằng nội suy sạch. Khi phóng to, hãy kỳ vọng vừa phải (dưới ~150% thường vẫn ổn).",
      },
      {
        q: "Khóa tỉ lệ khung hình làm gì?",
        a: "Khi khóa bật, đổi chiều rộng sẽ tự tính lại chiều cao (và ngược lại) để ảnh không bao giờ bị kéo giãn hay bẹp. Chỉ tắt khi bạn chủ ý muốn hình dạng khác — ảnh sẽ bị méo.",
      },
      {
        q: "Ảnh PNG sau khi đổi kích thước còn giữ độ trong suốt?",
        a: "Có. Việc đổi kích thước giữ nguyên định dạng gốc nên độ trong suốt của PNG và kênh alpha của WebP nguyên vẹn. Chỉ khi chuyển sang JPG, độ trong suốt mới bị phủ trắng.",
      },
    ],
  },
  "jpg-to-png": {
    name: "JPG sang PNG",
    tagline:
      "Chuyển ảnh JPG sang PNG tức thì với đầu ra không mất dữ liệu và hỗ trợ hàng loạt — miễn phí, riêng tư, không tải lên, ngay trong trình duyệt.",
    intro: [
      "Kéo thả file .jpg và nhận bản .png trùng khít từng điểm ảnh chỉ với một cú bấm. PNG lưu ảnh không thêm bất kỳ mất mát nào, khiến nó là lựa chọn để chỉnh lại, lưu trữ, hoặc cho nền tảng và công cụ từ chối file JPEG.",
      "Chế độ hàng loạt chuyển cả chồng ảnh trong một lần và hiển thị dung lượng kết quả của từng file. Lưu ý PNG thường cho file lớn hơn JPG — đó là cái giá của việc lưu không mất dữ liệu, không phải lỗi của việc chuyển đổi.",
    ],
    steps: [
      "Kéo thả ảnh JPG (hoặc bấm để chọn) — nhiều file càng tốt.",
      "Chờ một lát trong lúc từng file được chuyển cục bộ.",
      "Tải các file PNG về từng cái hoặc tất cả cùng lúc.",
    ],
    faqs: [
      {
        q: "File PNG có đẹp hơn JPG?",
        a: "Không — nó trông y hệt. Chuyển đổi không thể phục hồi nén đã xảy ra; PNG chỉ giữ nguyên diện mạo hiện tại mà không thêm lỗi mới nếu bạn chỉnh sửa và lưu lại sau. Hãy dùng nó vì quy trình làm việc, không phải để tăng chất lượng.",
      },
      {
        q: "Vì sao PNG của tôi lớn hơn JPG gốc?",
        a: "JPG dùng nén có mất dữ liệu rất mạnh cho ảnh chụp, còn PNG lưu chính xác từng điểm ảnh. Cùng một bức tranh vì thế chiếm nhiều chỗ hơn dưới dạng PNG. Nếu dung lượng quan trọng hơn chỉnh sửa không mất dữ liệu, JPG hoặc WebP là đích đến tốt hơn.",
      },
      {
        q: "Chuyển JPG sang PNG có thêm độ trong suốt?",
        a: "Không. JPEG chưa bao giờ lưu độ trong suốt nên không gì lấy lại được — PNG chuyển đổi của bạn hoàn toàn đặc. Muốn tách nền, bạn cần công cụ xóa nền chuyên dụng.",
      },
    ],
  },
  "merge-images": {
    name: "Gộp ảnh",
    tagline:
      "Gộp 2–9 ảnh thành một — xếp ngang, xếp dọc hoặc dạng lưới, kèm chỉnh khoảng cách và màu nền, ghép ở trọn độ phân giải ngay trên thiết bị của bạn.",
    intro: [
      "Tạo ảnh trước/sau, dải so sánh và sprite sheet: kéo thả 2 tới 9 ảnh, chọn bố cục, đặt khoảng cách và màu nền, và ảnh gộp được ghép ngay trên thiết bị ở trọn độ phân giải.",
      "Các ảnh được thu về cùng chiều cao (xếp ngang), cùng chiều rộng (xếp dọc) hoặc cùng ô (lưới) nên không gì bị cắt hay méo.",
    ],
    steps: [
      "Kéo thả 2–9 ảnh theo thứ tự muốn gộp.",
      "Chọn bố cục và tinh chỉnh khoảng cách cùng màu nền.",
      "Bấm Gộp ảnh và tải kết quả về.",
    ],
    faqs: [
      {
        q: "Độ phân giải đầu ra là bao nhiêu?",
        a: "Trọn độ phân giải: canvas được tính từ kích thước (đã thu) của đầu vào, nên gộp 3 × ảnh 2000px cho ra bức rộng cỡ 6000px.",
      },
      {
        q: "Thứ tự có quan trọng?",
        a: "Có — ảnh được đặt theo thứ tự trong danh sách, từ trái sang phải, từ trên xuống. Xóa và thêm lại để đổi thứ tự.",
      },
    ],
  },
  "ocr-image": {
    name: "Ảnh sang Text (OCR)",
    tagline:
      "Trích chữ từ ảnh, bản scan và ảnh chụp màn hình ở 7 ngôn ngữ — xem lại, chỉnh, sao chép hoặc tải .txt. Nhận dạng chạy hoàn toàn trong trình duyệt.",
    intro: [
      "Chỉ vào bất kỳ ảnh nào chứa chữ — ảnh chụp trang sách, bản scan, ảnh chụp màn hình — và nhận lại các ký tự thành văn bản chỉnh được. Nhận dạng được vận hành bởi Tesseract, tải theo yêu cầu ngay trong tab trình duyệt; bản thân ảnh không bao giờ bị gửi đi đâu cả.",
      "Kết quả nằm trong ô chỉnh sửa được, nên bạn sửa các chỗ đọc nhầm trước khi sao chép hay tải về thành file .txt. Ảnh nét, ánh sáng đều và chụp thẳng cho kết quả tốt nhất.",
    ],
    steps: [
      "Kéo thả một ảnh (PNG, JPG hoặc WebP) có chứa chữ.",
      "Chọn ngôn ngữ của chữ — mô hình tương ứng tải ở lần dùng đầu.",
      "Chạy nhận dạng và chỉnh văn bản trích được nếu cần.",
      "Sao chép hoặc tải xuống dưới dạng file .txt.",
    ],
    faqs: [
      {
        q: "Ảnh của tôi có bị tải lên máy chủ?",
        a: "Không. Ảnh được đọc và nhận dạng ngay trong trình duyệt của bạn. Lưu ý engine OCR và mô hình ngôn ngữ được tải từ CDN công cộng ở lần dùng đầu (khoảng 10–20 MB mỗi ngôn ngữ) — lượt tải đó đi từ CDN tới bạn, còn bản thân ảnh không bao giờ rời khỏi thiết bị.",
      },
      {
        q: "Hỗ trợ những ngôn ngữ nào?",
        a: "Tiếng Anh, Trung giản thể, Nhật, Tây Ban Nha, Bồ Đào Nha, Đức và Pháp. Mỗi ngôn ngữ tải mô hình riêng ở lần chọn đầu tiên; sau đó trình duyệt cache lại và lần nhận dạng sau nhanh hơn.",
      },
      {
        q: "Vì sao có chỗ chữ bị sai?",
        a: "Độ chính xác của OCR phụ thuộc nhiều vào nguồn: ảnh mờ, trang cong, font nhỏ và nền rối đều gây đọc nhầm. Dùng ảnh sắc nhất bạn có, cắt đúng vùng chữ, và chuẩn bị soát lỗi — nhất là các con số và ký tự trông giống nhau.",
      },
    ],
  },
  "png-to-jpg": {
    name: "PNG sang JPG",
    tagline:
      "Chuyển ảnh PNG sang JPG và giảm dung lượng ngoạn mục — vùng trong suốt được phủ nền trắng sạch, chất lượng vẫn chỉnh được.",
    intro: [
      "Biến file .png nặng thành bản .jpg gọn tải lên nhanh hơn và mở được ở mọi nơi. Thanh trượt chất lượng (mặc định 92%) giữ kết quả nhìn không phân biệt được trong khi cắt 60–90% dung lượng với ảnh chụp màn hình và ảnh chụp thông thường.",
      "Độ trong suốt của PNG không thể sống sót trong JPG, nên vùng trong suốt được phủ lên nền trắng tinh — cách xử lý chuẩn cho biểu mẫu, avatar và sàn thương mại chỉ nhận JPEG. Chế độ hàng loạt dọn cả thư mục trong một lần.",
    ],
    steps: [
      "Kéo thả ảnh PNG — một tấm hoặc nhiều.",
      "Chỉnh chất lượng JPG nếu muốn file nhỏ hơn hay trung thực tối đa.",
      "Tải các file JPG về từng cái hoặc tất cả cùng lúc.",
    ],
    faqs: [
      {
        q: "Vùng trong suốt sẽ thế nào khi chuyển PNG sang JPG?",
        a: "JPG không có kênh alpha nên điểm ảnh trong suốt được tô trắng đặc trước khi lưu. Nếu cần màu nền khác, hay phải giữ thật sự độ trong suốt, hãy ở lại với PNG (hoặc dùng WebP).",
      },
      {
        q: "JPG sẽ nhỏ hơn bao nhiêu?",
        a: "Thường nhỏ hơn 60–90% với ảnh chụp màn hình và ảnh chụp. Đồ họa phẳng cạnh sắc nén bớt ngoạn mục và có thể hơi mờ ở chất lượng thấp — giữ thanh trượt trên 85% cho ảnh chữ và giao diện.",
      },
      {
        q: "Chuyển đổi có làm ảnh sắc hơn hay sửa lỗi nén?",
        a: "Không. Chuyển đổi chỉ đổi cách mã hóa; không thể thêm chi tiết. Nếu bản PNG đã trông mềm, bản JPG sẽ mềm y hệt (thêm nhiễu nén nhẹ nếu chất lượng quá thấp).",
      },
    ],
  },
  "rotate-image": {
    name: "Xoay ảnh",
    tagline:
      "Xoay ảnh 90°, 180° hoặc 270° và lật ngang hay dọc — thân thiện hàng loạt, tức thì và hoàn toàn trong trình duyệt của bạn.",
    intro: [
      "Đặt ảnh thẳng đứng đúng chiều, chỉnh bản scan bị nằm ngang, hay đối xứng ảnh cho bố cục lật. Mỗi nút áp dụng cho mọi file đang tải lên cùng lúc, và một dòng trạng thái nhỏ luôn hiển thị góc xoay và lật hiện tại để bạn không bao giờ lạc.",
      "Xoay và lật được “nướng” vào chính các điểm ảnh, nghĩa là file lưu ra hiển thị giống nhau ở mọi nơi — không trình xem nào “sửa” lại được. Đầu ra giữ nguyên định dạng gốc của từng ảnh.",
    ],
    steps: [
      "Kéo thả một hoặc nhiều ảnh vào khung.",
      "Bấm các nút xoay và lật cho đến khi bản xem trước đúng ý.",
      "Tải các ảnh đã sửa về từng cái hoặc tất cả cùng lúc.",
    ],
    faqs: [
      {
        q: "Xoay JPEG có không mất dữ liệu?",
        a: "Xoay trong công cụ này được áp bằng cách mã hóa lại điểm ảnh, nên file được tạo lại (ở chất lượng JPEG 92% mặc định cho JPG). Thực tế khác biệt là vô hình, nhưng không phải trùng khít từng bit — các công cụ quảng cáo “xoay không mất dữ liệu” chỉ hoạt động với kích thước là bội số của lưới khối JPEG.",
      },
      {
        q: "Vì sao một bức ảnh xoay lệch trong app này mà đúng trong app khác?",
        a: "Một số ảnh chỉ lưu cờ hướng trong dữ liệu EXIF thay vì điểm ảnh xoay thật, và không phải app nào cũng áp cờ đó. Công cụ này ghi việc xoay thẳng vào điểm ảnh và bỏ cờ đi, nên kết quả hiển thị giống nhau ở mọi nơi.",
      },
      {
        q: "Lật ảnh ngang như gương được không?",
        a: "Được — dùng nút “Lật ngang” để đối xứng trái–phải, hoặc “Lật dọc” cho trên–dưới. Có thể kết hợp với mọi góc xoay.",
      },
    ],
  },
  "round-corners-image": {
    name: "Bo góc ảnh",
    tagline:
      "Bo góc cho một ảnh hoặc cả lô — góc PNG trong suốt hoặc màu đặc, xem trước trực tiếp, xuất PNG hay JPG. Chạy trong trình duyệt của bạn.",
    intro: [
      "Góc bo tròn làm mềm ảnh chụp màn hình, avatar và ảnh sản phẩm mà không cần mở phần mềm chỉnh sửa. Kéo thả một ảnh hoặc cả lô, kéo thanh bán kính và xem bản preview cập nhật trực tiếp — bán kính tới được cả hình tròn trọn, chặn tại nửa cạnh ngắn hơn.",
      "Chọn để góc bị cắt trong suốt (PNG) hay tô bằng màu đặc — màu đặc cũng là điều đầu ra JPG cần vì nó không có kênh alpha. Mỗi file được xử lý ngay trên thiết bị và tải về riêng lẻ.",
    ],
    steps: [
      "Kéo thả một ảnh hoặc cả lô.",
      "Kéo thanh bán kính — bản xem trước hiện ảnh đầu tiên trực tiếp.",
      "Chọn góc trong suốt hay màu đặc và định dạng đầu ra.",
      "Bo góc tất cả và tải từng kết quả về.",
    ],
    faqs: [
      {
        q: "Góc có thể trong suốt thay vì trắng?",
        a: "Có — chọn đầu ra PNG cùng tùy chọn Trong suốt, góc sẽ nhìn xuyên qua được. JPG không có kênh alpha nên luôn tô góc bằng màu đặc bạn đã chọn.",
      },
      {
        q: "Cùng một bán kính trông khác nhau trên mỗi ảnh — vì sao?",
        a: "Thanh trượt đặt bán kính theo điểm ảnh và mọi file được bo với đúng bán kính đó, chặn tại nửa cạnh ngắn hơn của chính nó. Để đồng đều giữa các ảnh khác kích thước, hãy làm đồng bộ kích thước trước (ví dụ bằng công cụ đổi kích thước ảnh).",
      },
      {
        q: "Bo góc có giảm chất lượng ảnh?",
        a: "Chỉ các góc bị đụng tới — điểm ảnh bên trong nguyên vẹn. Đầu ra PNG không mất dữ liệu, còn JPG được mã hóa lại ở chất lượng cao nên dung lượng có thể nhích lên hay xuống chút ít.",
      },
    ],
  },
  "screenshot-tool": {
    name: "Công cụ chụp màn hình",
    tagline:
      "Chụp một khung hình duy nhất của màn hình, cắt chính xác và lưu thành PNG — một lần chụp được cấp quyền, không ghi hình, không tải lên.",
    intro: [
      "Bấm chụp, chọn màn hình, cửa sổ hoặc tab trong hộp thoại chia sẻ của chính trình duyệt, và công cụ lấy đúng một khung hình tĩnh. Phiên chia sẻ kết thúc ngay lập tức — không ghi hình, không phiên làm việc, và không gì rời khỏi thiết bị. Bạn nhận được một PNG bình thường sẵn sàng lưu.",
      "Chỉ cần một phần khung chụp? Bật chế độ cắt và kéo vùng chọn chính xác trước khi lưu, được vận hành bởi chính widget cắt theo điểm ảnh của công cụ cắt ảnh. Hoàn hảo cho báo lỗi, tài liệu nhanh và biên lai.",
    ],
    steps: [
      "Bấm “Chọn màn hình & chụp” và cấp quyền trong hộp thoại của trình duyệt.",
      "Chọn màn hình, cửa sổ hoặc tab muốn chụp; một khung hình được chụp ngay và chia sẻ dừng lại.",
      "Tùy chọn cắt khung hình, rồi lưu PNG vào thư mục tải xuống.",
    ],
    faqs: [
      {
        q: "Màn hình của tôi có đang bị ghi hình?",
        a: "Không. Công cụ yêu cầu một lần chụp khung hình qua quyền chia sẻ màn hình chuẩn của trình duyệt. Luồng được dừng ngay khi khung hình lưu vào bộ nhớ, nên không gì tiếp tục chạy và không gì được tải lên bất cứ đâu.",
      },
      {
        q: "Vì sao trình duyệt hỏi quyền?",
        a: "Chụp màn hình là khả năng mạnh, nên trình duyệt luôn yêu cầu lựa chọn tường minh qua hộp thoại gốc của chính nó. Bạn chọn chính xác màn hình, cửa sổ hay tab nào để chia sẻ — công cụ không bao giờ thấy những gì bạn không chọn.",
      },
      {
        q: "Chạy trên điện thoại hay tablet không?",
        a: "Không. Trình duyệt trên iOS và Android không cho trang web chụp màn hình, nên công cụ sẽ nói rõ là không khả dụng ở đó. Trên máy tính, Chrome, Edge, Firefox và Safari đều hỗ trợ.",
      },
    ],
  },
  "svg-converter": {
    name: "Chuyển đổi SVG",
    tagline:
      "Biến icon và đồ họa SVG thành raster PNG sắc nét ở 1× tới 4× hoặc tỷ lệ tùy ý — giữ nguyên độ trong suốt, hoàn hảo cho tài nguyên ứng dụng.",
    intro: [
      "SVG tuyệt vời cho thiết kế nhưng nhiều nơi — app store, trình chỉnh sửa, ứng dụng nhắn tin, CMS cũ — đòi raster PNG. Công cụ này kết xuất file vector của bạn đúng kích thước cần: 1× cho xem trước, 2× cho màn hình retina, 3×–4× hoặc hệ số tùy chỉnh cho bản in chất lượng cao.",
      "PNG giữ nền trong suốt của SVG, và vector được kết xuất lại ở độ phân giải đích thay vì bị kéo giãn nên cạnh vẫn sắc từng milimet. Kéo thả cả bộ icon cùng lúc — mỗi file được chuyển trong một lần chạy.",
    ],
    steps: [
      "Kéo thả một hoặc nhiều file .svg.",
      "Chọn tỷ lệ: 1×–4× hoặc nhập hệ số tùy ý.",
      "Tải các file PNG về từng cái hoặc tất cả cùng lúc.",
    ],
    faqs: [
      {
        q: "Nên xuất ở tỷ lệ nào?",
        a: "Dùng 2× cho icon hiển thị trên màn hình retina/độ phân giải cao, 1× khi biết chính xác kích thước cuối, và 3×–4× làm bản gốc để thu nhỏ về sau. Với favicon, xuất cỡ 512 px rồi thu xuống.",
      },
      {
        q: "Chuyển sang PNG có mất tính co giãn của SVG?",
        a: "Có — PNG là độ phân giải cố định. Vì thế công cụ kết xuất thẳng theo kích thước đích thay vì raster nhỏ rồi kéo giãn. Hãy giữ file .svg nguồn để chỉnh sau và xuất PNG mới mỗi khi cần kích thước khác.",
      },
      {
        q: "Nền trong suốt còn giữ được sau khi chuyển?",
        a: "Có. Kết quả là PNG có đầy đủ kênh alpha nên icon giữ nguyên độ trong suốt như trong SVG. Chỉ font và ảnh ngoài được SVG tham chiếu có thể cần nhúng vào file để hiển thị.",
      },
    ],
  },
  "convert-image": {
    name: "Chuyển đổi ảnh",
    tagline:
      "Chuyển ảnh giữa PNG, JPG và WebP với chất lượng chỉnh được — kéo thả cả thư mục và tải mọi kết quả về chỉ trong một cú bấm.",
    intro: [
      "Một bộ chuyển đổi cho ba định dạng quan trọng nhất: PNG cho đồ họa không mất dữ liệu và độ trong suốt, JPG cho tương thích ảnh phổ quát, WebP cho file nhỏ nhất ở chất lượng cao. Chọn định dạng đích, chỉnh thanh chất lượng khi định dạng cho phép, và mọi file kéo vào được chuyển đổi tại chỗ.",
      "Việc chuyển đổi chạy trên thiết bị bằng bộ mã hóa canvas của trình duyệt — chẳng có bước tải lên nào cả. Mỗi dòng kết quả hiển thị dung lượng trước và sau nên bạn thấy ngay việc đổi định dạng có thực sự giúp ích.",
    ],
    steps: [
      "Kéo thả bất kỳ ảnh nào — trộn định dạng vẫn ổn.",
      "Chọn PNG, JPG hoặc WebP làm đầu ra; đặt chất lượng cho JPG hoặc WebP.",
      "Tải các file đã chuyển về từng cái hoặc tất cả cùng lúc.",
    ],
    faqs: [
      {
        q: "Nên chọn định dạng đầu ra nào?",
        a: "JPG cho ảnh chụp phải mở được ở mọi nơi; WebP cho web khi file nhỏ quan trọng; PNG cho ảnh chụp màn hình, logo và mọi thứ cần độ trong suốt hay lưu không mất dữ liệu. Phân vân với ảnh chụp thì WebP ở chất lượng ~85 là mặc định tốt.",
      },
      {
        q: "Chuyển JPG sang PNG có cải thiện chất lượng?",
        a: "Không. Lỗi nén JPEG đã in vào điểm ảnh rồi và chuyển đổi không thể xóa — PNG chỉ lưu y hệt diện mạo đó một cách không mất dữ liệu, thường với dung lượng lớn hơn. Chuyển đổi chỉ đổi container và cách mã hóa, không đổi chi tiết đã chụp.",
      },
      {
        q: "Mọi trình duyệt có hỗ trợ chuyển WebP?",
        a: "Chrome, Edge, Firefox và Safari 17+ lưu được WebP. Nếu trình duyệt không mã hóa được WebP, công cụ sẽ báo và chuyển sang JPG để bạn luôn nhận được file dùng được.",
      },
    ],
  },
  "watermark-image": {
    name: "Watermark ảnh",
    tagline:
      "Thêm watermark chữ vào ảnh — chọn vị trí, độ mờ, kích thước hay phủ kín, xử lý hoàn toàn trong trình duyệt của bạn.",
    intro: [
      "Bảo vệ bản nháp, bản duyệt và ảnh chụp bằng watermark chữ bạn kiểm soát trọn vẹn: đặt ở bất kỳ góc nào hay giữa, phủ lặp khắp ảnh, chỉnh kích thước và độ mờ — các bản có watermark được tạo ngay trên thiết bị của bạn.",
      "Không có gì được tải lên, nên bạn có thể đóng dấu cho tác phẩm chưa phát hành, bản duyệt khách hàng và bản scan mật mà không gửi chúng đi bất cứ đâu.",
    ],
    steps: [
      "Kéo thả một ảnh hoặc cả lô.",
      "Nhập chữ watermark rồi đặt độ mờ, kích thước, vị trí — hoặc bật chế độ phủ lặp.",
      "Áp dụng và tải từng bản đã watermark về.",
    ],
    faqs: [
      {
        q: "Người khác xóa được watermark của tôi?",
        a: "Watermark nhìn thấy được là răn đe, không phải mã hóa — thứ gì nhìn thấy được thì có thể xóa bằng công sức. Bảo vệ thật sự thì hãy chia sẻ bản duyệt độ phân giải thấp thay thế.",
      },
      {
        q: "Chạy với PNG trong suốt được không?",
        a: "Đầu ra là JPG nên độ trong suốt bị phủ trắng. Hãy watermark bản PNG gốc kèm màu nền tùy chọn nếu cần giữ kênh alpha.",
      },
    ],
  },
  "webp-converter": {
    name: "Chuyển đổi WebP",
    tagline:
      "Chuyển ảnh sang WebP hoặc đưa file WebP ngược lại thành JPG và PNG — chọn định dạng đích, chỉnh chất lượng, xử lý hàng loạt số lớn.",
    intro: [
      "Chuyển sang WebP giảm 25–35% dung lượng so với JPG ở cùng chất lượng nhìn thấy — lý tưởng cho trang web và ứng dụng. Đưa WebP ngược về JPG hay PNG giúp ảnh mở được trong phần mềm cũ chưa từng học định dạng của Google.",
      "Kéo thả hỗn hợp WebP, JPG, PNG và nhiều hơn, chọn định dạng đầu ra, và mọi file chuyển cùng lúc với dung lượng trước/sau hiển thị từng dòng. Mọi thứ được mã hóa bởi trình duyệt ngay trên thiết bị của bạn — không tải lên, không bao giờ.",
    ],
    steps: [
      "Kéo thả file WebP để chuyển ra ngoài, hoặc ảnh bất kỳ để chuyển thành WebP.",
      "Chọn định dạng đầu ra (WebP, JPG hoặc PNG) và đặt chất lượng cho định dạng có nén.",
      "Tải các file đã chuyển về từng cái hoặc tất cả cùng lúc.",
    ],
    faqs: [
      {
        q: "Vì sao nên dùng WebP thay vì JPG?",
        a: "WebP nén nhỏ hơn JPG 25–35% ở chất lượng tương đương và hỗ trợ cả độ trong suốt lẫn ảnh động. Mọi trình duyệt hiện tại đều hiển thị được nên đây là lựa chọn chuẩn cho ảnh web. Chỉ chọn JPG khi bạn bắt buộc hỗ trợ phần mềm rất cũ.",
      },
      {
        q: "File WebP mở được trong mọi app?",
        a: "Tất cả trình duyệt hiện đại và các phiên bản mới của Windows, macOS, Android và iOS đều xử lý WebP. Một số phần mềm chỉnh ảnh cũ và vài biểu mẫu web vẫn từ chối — đúng lúc đó bạn chuyển ngược về JPG hay PNG tại đây.",
      },
      {
        q: "Chuyển sang WebP có không mất dữ liệu?",
        a: "Bạn chọn: WebP hỗ trợ cả hai kiểu. Ở chất lượng mặc định 90, kết quả nhìn không phân biệt được nhưng nhẹ hơn nhiều; kéo thanh trượt xuống để tiết kiệm tối đa, hoặc chọn đầu ra PNG để không mất dữ liệu tuyệt đối.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Text                                                                */
  /* ------------------------------------------------------------------ */
  "case-converter": {
    name: "Đổi kiểu chữ",
    tagline:
      "Chuyển văn bản giữa CHỮ IN, chữ thường, Viết Hoa Từ Đầu, camelCase, snake_case và 6 kiểu nữa — ngay tức thì.",
    intro: [
      "Mười một kiểu chữ trên một trang: viết hoa câu cho bài viết, Viết Hoa Từ Đầu cho tiêu đề, camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE cho code, cùng kiểu xen kẽ và đảo ngược cho vui.",
      "Mọi thứ tính lại ngay khi bạn gõ — không cần bấm đi bấm lại, và việc chuyển đổi không bao giờ rời khỏi trình duyệt.",
    ],
    steps: [
      "Dán hoặc gõ văn bản vào ô nhập.",
      "Bấm nút kiểu — kết quả cập nhật tức thì.",
      "Sao chép kết quả hoặc chuyển sang kiểu khác để so sánh.",
    ],
    faqs: [
      {
        q: "camelCase khác PascalCase thế nào?",
        a: "camelCase bắt đầu bằng chữ thường (myVariableName), PascalCase bằng chữ hoa (MyVariableName). Cả hai đều bỏ khoảng trắng và dấu gạch dưới trước khi nối các từ.",
      },
      {
        q: "Viết Hoa Từ Đầu có giữ chữ nhỏ ở những từ ngắn?",
        a: "Có. Mạo từ và giới từ ngắn (a, the, of, in…) giữ nguyên chữ thường trừ khi đứng đầu hay cuối, theo thông lệ biên tập phổ biến.",
      },
      {
        q: "Văn bản của tôi có bị tải lên đâu không?",
        a: "Không. Việc chuyển đổi diễn ra cục bộ trong trình duyệt bằng JavaScript — không gửi gì đến máy chủ nào.",
      },
    ],
  },
  "character-counter": {
    name: "Đếm ký tự",
    tagline:
      "Đếm ký tự có và không có khoảng trắng, cùng từ, câu, đoạn và dòng ngay khi gõ — hoàn hảo cho tweet, tiêu đề và mô tả meta.",
    intro: [
      "Bộ đếm ký tự dành cho các giới hạn cứng: bài đăng mạng xã hội, thẻ tiêu đề meta, mô tả meta, nội dung quảng cáo, SMS và các ô nhập ứng dụng đếm từng ký tự. Bảng hiển thị ký tự có và không có khoảng trắng để bạn luôn biết nền tảng quan tâm con số nào.",
      "Số liệu cập nhật ngay khi bạn gõ, và không gì rời khỏi trình duyệt — dán bản thảo chưa đăng, nội dung khách hàng hay văn bản mật mà khỏi lo bị lưu hay gửi đi đâu.",
    ],
    steps: [
      "Dán hoặc gõ văn bản vào ô.",
      "Đọc bảng ký tự được làm nổi trước, rồi xem các số còn lại khi cần.",
      "Rút gọn văn bản tới khi dưới giới hạn — các con số cập nhật trực tiếp.",
    ],
    faqs: [
      {
        q: "Khoảng trắng và xuống dòng có tính là ký tự?",
        a: "Có — con số chính đếm mọi ký tự gồm khoảng trắng và xuống dòng, đúng như đa số nền tảng. Con số “Không khoảng trắng” bỏ hết khoảng trắng để bạn so sánh.",
      },
      {
        q: "Emoji được đếm thế nào?",
        a: "Emoji được đếm theo mã điểm Unicode nên phần lớn emoji hiện đại tính là một ký tự. Các chuỗi phức tạp ghép từ nhiều mã điểm (màu da, emoji gia đình) có thể tính nhiều hơn một.",
      },
      {
        q: "Nền tảng nào giới hạn theo ký tự?",
        a: "Bài đăng X/Twitter, thẻ tiêu đề meta (khoảng 60) và mô tả (khoảng 160), mỗi phân đoạn SMS (160) và đa số nền tảng quảng cáo — luôn kiểm tra ô nhập cụ thể bạn đang viết.",
      },
    ],
  },
  "emoji-picker": {
    name: "Bảng chọn Emoji",
    tagline:
      "Duyệt hơn 670 emoji phổ biến trong 8 nhóm chọn lọc, tìm theo tên tiếng Anh, bấm để sao chép ngay, tái dùng 16 emoji mới nhất — tất cả trong trình duyệt.",
    intro: [
      "Bảng emoji tuyển tay với 677 mục xếp theo cách bạn nghĩ: Mặt cười, Người, Động vật, Đồ ăn, Hoạt động, Du lịch, Đồ vật và Ký hiệu. Tìm kiếm khớp tên chính thức tiếng Anh — gõ “star” tìm ngay ⭐, 🌟 và ✨ cùng lúc.",
      "Một cú bấm sao chép ký tự vào clipboard, kèm xác nhận rõ ràng để bạn không bao giờ hoài nghi. 16 emoji mới nhất được giữ trên thiết bị qua localStorage, nên mục yêu thích hôm qua chỉ cách một cú chạm. Không tải ảnh nào — lưới hiển thị glyph emoji gốc của hệ thống tức thì.",
    ],
    steps: [
      "Gõ tên vào ô tìm kiếm hoặc chọn tab nhóm.",
      "Bấm bất kỳ emoji nào — nó được sao chép vào clipboard ngay lập tức.",
      "Xem các emoji mới dùng ở hàng trên cùng, được lưu trên thiết bị này.",
    ],
    faqs: [
      {
        q: "Emoji lấy từ đâu?",
        a: "Chúng là glyph gốc do font emoji của hệ điều hành bạn hiển thị. Không tải gì xuống nên trang vẫn nhanh và chạy offline sau khi đã mở.",
      },
      {
        q: "Vì sao một số emoji trông khác trên điện thoại của tôi?",
        a: "Mỗi nền tảng vẽ emoji theo phong cách riêng. Lưới hiển thị cách thiết bị hiện tại vẽ chúng; ký tự được sao chép cũng sẽ hiển thị y như vậy trong app nhận.",
      },
      {
        q: "“Dùng gần đây” hoạt động ra sao?",
        a: "Mỗi emoji bạn sao chép được ghi nhớ trong localStorage của trình duyệt (tối đa 16). Xóa dữ liệu trình duyệt sẽ đặt lại danh sách.",
      },
    ],
  },
  "fancy-text-generator": {
    name: "Trình tạo chữ nghệ thuật",
    tagline:
      "Biến văn bản thường thành 12 kiểu Unicode — đậm, nghiêng, viết tay, viền đôi, tròn, fullwidth và hơn nữa — sao chép bất kỳ kiểu nào chỉ một cú bấm.",
    intro: [
      "Gõ một lần và nhận mười hai biến thể Unicode cùng lúc: chữ đậm toán học, nghiêng, đậm nghiêng, viết tay, viết tay đậm, viền đôi, monospace, tròn, vuông và bảng chữ fullwidth, cùng gạch ngang và gạch chân bằng ký tự ghép.",
      "Vì đây là ký tự Unicode thật — không phải font — kết quả dán nguyên vẹn vào bio Instagram, caption TikTok, biệt danh Discord, bản nháp tweet và app nhắn tin. Ký tự ngoài bảng chữ Latinh như Trung, Nhật hay emoji được giữ nguyên để không biến thành ô vuông mất glyph.",
    ],
    steps: [
      "Gõ hoặc dán văn bản của bạn — sẵn có một mẫu để thử.",
      "Cuộn danh sách trực tiếp: mọi kiểu hiển thị văn bản của bạn ngay lập tức.",
      "Bấm Sao chép ở kiểu ưng ý và dán vào bất cứ đâu nhận văn bản.",
    ],
    faqs: [
      {
        q: "Vì sao chữ trông như cũ trên một số trang web?",
        a: "Chữ nghệ thuật dùng ký tự Unicode, và font của trang có thể thiếu glyph cho một số kiểu (nhất là viết tay và viền đôi). Nếu một kiểu hiển thị lạ ở đâu đó, hãy thử đậm, tròn hay fullwidth — những kiểu này có độ phủ font rộng nhất.",
      },
      {
        q: "Dùng cho bio Instagram hay biệt danh TikTok được không?",
        a: "Được. Kết quả là văn bản Unicode thuần nên hoạt động trong bio, tên hiển thị, bình luận và bất cứ đâu nhận ký tự thường.",
      },
      {
        q: "Ký tự như emoji hay chữ Trung thì sao?",
        a: "Chúng được giữ nguyên như đã gõ. Bộ tạo chỉ ánh xạ chữ cái và chữ số Latinh nên emoji, chữ CJK và ký tự có dấu đi qua không đổi thay vì biến thành ô trống.",
      },
    ],
  },
  "find-and-replace": {
    name: "Tìm và thay thế",
    tagline:
      "Tìm và thay thế trên cả nghìn từ với chế độ phân biệt chữ hoa, nguyên từ và regex — xem số lượng khớp trước khi áp dụng.",
    intro: [
      "Một ô tìm, một ô thay, ba chế độ khớp. Văn bản thường để đổi nhanh, chế độ nguyên từ để “cat” không bao giờ rơi vào “category”, và biểu thức chính quy cho các mẫu — ngày tháng, thẻ tag, khoảng trắng lặp hay bất cứ gì bạn mô tả được.",
      "Số lần khớp được đếm ngay khi bạn gõ và phần thay thế xem trước trực tiếp, nên bạn thấy chính xác điều gì sẽ thay đổi trước khi sao chép bất cứ thứ gì.",
    ],
    steps: [
      "Dán văn bản, rồi gõ nội dung cần tìm và nội dung thay thế.",
      "Chọn chế độ: phân biệt chữ hoa thường, chỉ nguyên từ, hoặc biểu thức chính quy.",
      "Kiểm tra số lần khớp, rồi sao chép kết quả đã thay.",
    ],
    faqs: [
      {
        q: "Dùng được nhóm bắt trong chế độ regex?",
        a: "Có. Bọc phần mẫu trong ngoặc đơn và tham chiếu trong phần thay thế là $1, $2 v.v. — ví dụ tìm '(\\d{4})-(\\d{2})' và thay bằng '$2/$1'.",
      },
      {
        q: "Chế độ “chỉ nguyên từ” ngăn được gì?",
        a: "Nó chỉ khớp khi từ đứng độc lập: tìm “cat” sẽ không còn khớp “category” hay “concatenate”.",
      },
      {
        q: "Dấu $ trong phần thay thế có bị coi là ký tự đặc biệt?",
        a: "Ở chế độ thường thì không — “$100” vẫn là “$100”. Ở chế độ regex, $ là ký tự đặc biệt ($1 nghĩa là nhóm 1); cần ký tự $ thật thì viết \\$.",
      },
    ],
  },
  "lorem-ipsum-generator": {
    name: "Trình tạo Lorem Ipsum",
    tagline:
      "Tạo 1–50 đoạn lorem ipsum cổ điển cho mockup, wireframe và thử nghiệm CMS — một cú bấm để tạo lại và sao chép.",
    intro: [
      "Lorem ipsum là chỗ dựa của ngành in ấn từ những năm 1500: tiếng Latinh xáo trộn trích từ “De Finibus” của Cicero, trông như văn bản thật nhưng không mang nghĩa nào, nên không ai nhầm bản nháp với nội dung hoàn thiện. Chọn số đoạn, bấm nút và dán vào bố cục của bạn.",
      "Văn bản được tạo cục bộ bằng bộ sinh giả ngẫu nhiên có seed, nên mỗi lô đều khác — và không gì bạn làm trên trang này rời khỏi trình duyệt.",
    ],
    steps: [
      "Đặt số đoạn bạn cần (1–50).",
      "Bấm nút để tạo một lô mới.",
      "Sao chép văn bản thẳng vào thiết kế, template hay CMS của bạn.",
    ],
    faqs: [
      {
        q: "Lorem ipsum chính xác là gì?",
        a: "Tiếng Latinh bị làm hỏng từ một đoạn trong De Finibus Bonorum et Malorum của Cicero, cắt ngắn và xáo trộn thành chỗ điền vô nghĩa. Phân bố chữ cái mô phỏng ngôn ngữ thật, khiến nó lý tưởng để đánh giá bố cục mà không bị nội dung kéo sự chú ý.",
      },
      {
        q: "Vì sao không dùng “text text text” cho rồi?",
        a: "Từ giả lặp lại tạo hình dạng phi thực tế và giấu các vấn đề về xuống dòng và nhịp điệu. Lorem ipsum bắt chước độ dài từ và phân bố của ngôn ngữ thật.",
      },
      {
        q: "Lấy được hơn 50 đoạn không?",
        a: "Mỗi lô giới hạn 50 đoạn để trang luôn nhanh; cứ bấm nút lần nữa khi cần thêm lô mới.",
      },
    ],
  },
  "remove-duplicate-lines": {
    name: "Xóa dòng trùng lặp",
    tagline:
      "Xóa dòng lặp khỏi danh sách và log nhưng giữ nguyên thứ tự gốc — kèm tùy chọn phân biệt chữ hoa và trim.",
    intro: [
      "Dán bất kỳ danh sách nào — email, URL, từ khóa, dòng log — và nhận lại chính danh sách đó đã loại bỏ trùng lặp trong một lần. Các tùy chọn phủ những biến thể quen thuộc: bỏ qua chữ hoa thường, trim khoảng trắng trước khi so sánh, bỏ dòng trống, hoặc sắp xếp kết quả.",
    ],
    steps: [
      "Dán danh sách vào ô nhập — mỗi mục một dòng.",
      "Bật tùy chọn nếu cần so khớp không phân biệt chữ hoa hay làm sạch.",
      "Sao chép kết quả đã lọc trùng; thứ tự gốc được giữ trừ khi bạn bật sắp xếp.",
    ],
    faqs: [
      {
        q: "Có giữ thứ tự dòng gốc?",
        a: "Có. Lần xuất hiện đầu tiên của mỗi dòng được giữ nguyên vị trí. Sắp xếp chỉ xảy ra nếu bạn bật tùy chọn sắp xếp.",
      },
      {
        q: "Có coi “Apple” và “apple” là trùng nhau?",
        a: "Bật “Bỏ qua chữ hoa thường” và chúng được coi là cùng một dòng; biến thể xuất hiện trước được giữ.",
      },
    ],
  },
  "remove-extra-spaces": {
    name: "Xóa khoảng trắng thừa",
    tagline:
      "Gộp khoảng trắng đôi thành một, chuyển tab, trim mép dòng và xóa dòng trống — dọn văn bản dán vào chỉ trong một lần.",
    intro: [
      "Văn bản sao chép từ PDF, bảng tính, terminal và app nhắn tin thường đầy khoảng trắng đôi, tab lạc loài và dòng trống. Công cụ này đè phẳng các khoảng trắng lặp thành một và trao cho bạn công tắc cho phần còn lại: chuyển tab thành khoảng trắng, trim mép từng dòng, và bỏ dòng trống.",
      "Mọi thứ chạy cục bộ ngay khi bạn gõ, nên cứ thoải mái dán log, bản thảo hay bất cứ nội dung nhạy cảm nào.",
    ],
    steps: [
      "Dán văn bản lộn xộn vào ô nhập.",
      "Bật chuyển tab, trim dòng hay xóa dòng trống khi cần.",
      "Sao chép kết quả sạch thẳng lại vào tài liệu hay trình soạn thảo của bạn.",
    ],
    faqs: [
      {
        q: "Công cụ gộp khoảng trắng bên trong dòng hay chỉ ở mép?",
        a: "Khoảng trắng lặp ở bất kỳ đâu trong văn bản đều được gộp thành một. Khoảng trắng ở mép chỉ bị xóa khi bạn bật “Trim mép dòng”.",
      },
      {
        q: "Có làm hỏng thụt lề code của tôi?",
        a: "Có thể — thụt lề dựa vào khoảng trắng hay tab ở đầu dòng. Với code, hãy để “Trim mép dòng” tắt hoặc dùng trình định dạng chuyên dụng.",
      },
      {
        q: "Xuống dòng có được giữ lại?",
        a: "Có. Công cụ chỉ đụng tới khoảng trắng ngang và dòng trống; cấu trúc dòng của văn bản giữ nguyên vẹn.",
      },
    ],
  },
  "reverse-text": {
    name: "Đảo ngược văn bản",
    tagline:
      "Lật ngược bất kỳ văn bản nào từng ký tự, hoặc đảo thứ tự nguyên các dòng — an toàn Unicode, tức thì và hoàn toàn cục bộ.",
    intro: [
      "Hai kiểu đảo trong một công cụ: đối xứng các ký tự (trò “txet esrever” kinh điển cho game, bio và câu đố) hay lật thứ tự các dòng để dòng cuối thành dòng đầu — tiện cho log, bản xuất chat và danh sách bị dán ngược từ dưới lên.",
      "Việc đảo hoạt động trên các mã điểm Unicode chứ không phải byte thô, nên ký tự có dấu và phần lớn emoji nguyên vẹn thay vì biến thành chữ vỡ (mojibake).",
    ],
    steps: [
      "Dán hoặc gõ văn bản muốn lật.",
      "Để “Chỉ đảo các dòng” tắt để đối xứng ký tự, hoặc bật lên để đảo thứ tự dòng.",
      "Sao chép kết quả đã đảo.",
    ],
    faqs: [
      {
        q: "Emoji và ký tự có dấu sống sót được không?",
        a: "Với trường hợp phổ biến thì có: công cụ đảo theo mã điểm Unicode nên é, ñ và emoji chuẩn giữ nguyên. Emoji rất phức tạp ghép từ nhiều phần vẫn có thể vỡ khi đối xứng.",
      },
      {
        q: "“Chỉ đảo các dòng” chính xác làm gì?",
        a: "Nó giữ nguyên từng dòng và chỉ lật thứ tự của các dòng — dòng đầu thành dòng cuối. Dùng khi danh sách bị dán ngược từ dưới lên.",
      },
      {
        q: "Dùng để kiểm tra palindrome được không?",
        a: "Gián tiếp — dán văn bản, đảo lại và so bằng mắt, hoặc ghép với công cụ so sánh văn bản (text diff).",
      },
    ],
  },
  "sentence-counter": {
    name: "Đếm câu",
    tagline:
      "Đếm câu tức thì và xem từ, đoạn, thời gian đọc cạnh bên — kiểm tra độ dễ đọc nhanh cho biên tập viên và người viết.",
    intro: [
      "Số câu là tín hiệu dễ đọc nhanh nhất mà người viết có. Công cụ đếm câu ngay khi bạn gõ và đặt cạnh số từ, đoạn, dòng và thời gian đọc, để bạn liếc một cái biết đoạn văn có đang quá dày đặc.",
      "Nó nhận diện đúng dấu câu kết thúc câu trong văn bản đa ngôn ngữ: dấu chấm Latinh, dấu hỏi và chấm than, cộng các dấu rộng 。!?… dùng trong tiếng Trung và Nhật.",
    ],
    steps: [
      "Dán bản thảo, email hay bài viết vào ô.",
      "Xem số câu được làm nổi và so với số từ.",
      "Tách hay gộp câu để đạt độ dài trung bình mục tiêu.",
    ],
    faqs: [
      {
        q: "Cái gì được tính là một câu?",
        a: "Mọi đoạn văn bản kết thúc bằng dấu chấm, dấu hỏi, chấm than hay tương đương CJK 。!?… — miễn là nó chứa thứ gì đó ngoài khoảng trắng.",
      },
      {
        q: "Vì sao số câu khác với trình soạn thảo của tôi?",
        a: "Các từ viết tắt như “Mr.” hay “e.g.” kết thúc bằng dấu chấm và bị tính là hết câu — công cụ dùng quy tắc dấu câu chứ không phân tích ngôn ngữ đầy đủ.",
      },
      {
        q: "Một đoạn nên có bao nhiêu câu?",
        a: "Các cẩm nang văn phong thường khuyên 2–5. Không có quy tắc sắt đá: dùng con số này để phát hiện “bức tường chữ” trước khi người đọc của bạn kịp mệt.",
      },
    ],
  },
  "slug-generator": {
    name: "Trình tạo Slug",
    tagline:
      "Biến bất kỳ tiêu đề nào thành slug URL sạch sẽ — chữ thường, bỏ dấu, nối bằng gạch ngang — sẵn sàng cho đường dẫn thân thiện SEO.",
    intro: [
      "Slug là phần URL đặt tên cho trang — ví dụ /tools/slug-generator. Slug tốt là chữ thường, dùng gạch ngang thay vì khoảng trắng và chỉ giữ chữ cái cùng số, giúp đường dẫn dễ đọc trong kết quả tìm kiếm, dễ sao chép và an toàn trên mọi máy chủ hay framework.",
      "Dán tiêu đề bằng bất kỳ ngôn ngữ nào: dấu bị loại bỏ (café → cafe), dấu câu và khoảng trắng gộp thành gạch ngang đơn, và kết quả được cắt gọn nên không slug nào mở đầu hay kết thúc bằng gạch.",
    ],
    steps: [
      "Gõ hoặc dán tiêu đề trang vào ô nhập.",
      "Xem slug xuất hiện ngay khi gõ — chỉnh tiêu đề tới khi đọc ưng ý.",
      "Sao chép slug vào CMS, router hay bộ sinh trang tĩnh của bạn.",
    ],
    faqs: [
      {
        q: "Slug URL tốt trông thế nào?",
        a: "Ngắn, chữ thường, cách nhau bằng gạch ngang và mô tả được. Công cụ tìm kiếm đọc slug như một tín hiệu xếp hạng và người dùng đọc chúng trong kết quả, nên “blue-running-shoes” thắng “/p?id=8123”.",
      },
      {
        q: "Vì sao dấu bị loại bỏ?",
        a: "Ký tự ngoài ASCII bị mã hóa phần trăm trong URL (é thành %C3%A9), tạo ra đường dẫn dài, xấu và dễ lỗi. Slug ASCII giữ ngắn và chạy được ở mọi nơi.",
      },
      {
        q: "Có nên giữ stop words như “the” hay “of”?",
        a: "Nhiều hướng dẫn SEO khuyên bỏ chúng để slug gọn — chỉnh slug tự do trước khi sao chép; công cụ cho bạn bản gốc đầy đủ với gạch ngang.",
      },
    ],
  },
  "text-cleaner": {
    name: "Trình làm sạch văn bản",
    tagline:
      "Loại bỏ ký tự vô hình, dấu ngoặc kép thông minh, khoảng trắng thừa và dòng trống khỏi văn bản dán từ PDF, Word và app nhắn tin.",
    intro: [
      "Copy-paste là nơi văn bản sạch gặp chuyện buồn: PDF để lại ký tự zero-width, Word thay dấu ngoặc thẳng bằng ngoặc cong và thêm khoảng trắng không ngắt, app chat chèn ký tự điều khiển. Công cụ này gỡ bỏ rác vô hình và sửa lại dấu câu trong một lần.",
      "Mỗi tùy chọn là một công tắc, nên bạn quyết định mức dọn dẹp — từ chỉ trim dòng tới quét toàn bộ loại ký tự không in được và chuẩn hóa dấu ngoặc, gạch ngang và dấu ba chấm.",
    ],
    steps: [
      "Dán văn bản lộn xộn vào ô nhập.",
      "Bật các tùy chọn mong muốn: trim dòng, gộp khoảng trắng, xóa dòng trống, gỡ ký tự vô hình, chuẩn hóa dấu câu.",
      "Sao chép kết quả sạch trở lại tài liệu, CMS hay trình soạn thảo của bạn.",
    ],
    faqs: [
      {
        q: "Ký tự vô hình là gì và từ đâu ra?",
        a: "Khoảng trắng zero-width, dấu BOM và ký tự điều khiển — do PDF, một số trang web và phần mềm văn phòng thêm vào. Chúng vô hình nhưng làm hỏng tìm kiếm, regex và nhập dữ liệu vào cơ sở dữ liệu, nên việc gỡ bỏ thường là an toàn.",
      },
      {
        q: "“Chuẩn hóa dấu câu” đổi những gì?",
        a: "Dấu ngoặc cong thành thẳng, gạch en và em thành gạch thường, ký tự ba chấm thành ba dấu chấm, và khoảng trắng không ngắt thành khoảng trắng thường. Dùng khi cần dấu câu thuần, an toàn cho code.",
      },
      {
        q: "Việc dọn dẹp có bảo toàn dữ liệu?",
        a: "Không công cụ nào hiểu chắc ý bạn. Ô kết quả luôn hiển thị trước, nên hãy xem lại trước khi thay bản gốc.",
      },
    ],
  },
  "text-diff": {
    name: "So sánh văn bản",
    tagline:
      "So sánh hai phiên bản văn bản từng từ, làm nổi phần thêm và bớt — không tài khoản, không tải lên, không lo giới hạn dung lượng.",
    intro: [
      "Dán bản gốc bên trái và bản sửa bên phải: các từ thay đổi sáng lên ngay lập tức, phần xóa một màu và phần thêm một màu. Đây là cách nhanh nhất để rà soát bản sửa đổi hợp đồng, bản viết lại của biên tập viên hay chỉnh sửa phút chót của đồng nghiệp.",
      "Việc so sánh chạy hoàn toàn trong trình duyệt — hợp đồng dài, bản thảo chưa xuất bản và văn bản mật không bao giờ chạm tới máy chủ nào.",
    ],
    steps: [
      "Dán văn bản gốc vào ô bên trái.",
      "Dán văn bản đã sửa vào ô bên phải.",
      "Đọc khung ghép bên dưới: gạch ngang đánh dấu phần xóa, màu xanh đánh dấu phần thêm.",
    ],
    faqs: [
      {
        q: "Khác biệt được hiển thị thế nào?",
        a: "Văn bản không đổi giữ nguyên; từ bị xóa bị gạch ngang màu cam và từ thêm vào được tô xanh lá, nên đoạn văn đọc như bản theo dõi thay đổi.",
      },
      {
        q: "Đây là diff theo ký tự hay theo từ?",
        a: "Theo từ. Chỉnh nhỏ bên trong một từ được hiển thị là một từ xóa cộng một từ thêm, dễ đọc hơn diff theo ký tự.",
      },
      {
        q: "Có giới hạn dung lượng?",
        a: "Chỉ bộ nhớ trình duyệt của bạn — so sánh dài bằng cả cuốn sách vẫn chạy, dù văn bản rất lớn cần một lát để hiển thị.",
      },
    ],
  },
  "text-sorter": {
    name: "Sắp xếp văn bản",
    tagline:
      "Sắp xếp bất kỳ danh sách dòng nào theo bảng chữ cái, ngược lại, theo độ dài hay theo số — nhận diện ngôn ngữ, tức thì, ngay trong trình duyệt.",
    intro: [
      "Dán danh sách tên, URL, giá, công việc hay dòng log và sắp lại chỉ với một cú bấm: A→Z cho danh bạ và chỉ mục, Z→A cho danh sách xếp hạng, ngắn→dài cho lần dọn dẹp, theo số để “item 10” nằm sau “item 2” thay vì giữa “item 1” và “item 2”.",
      "Việc sắp xếp dùng collation nhận diện ngôn ngữ của trình duyệt, nên ký tự có dấu được xếp đúng chỗ người đọc mong đợi thay vì bị đẩy ra sau cả bảng chữ cái.",
    ],
    steps: [
      "Dán danh sách vào ô nhập — mỗi mục một dòng.",
      "Chọn thứ tự: A→Z, Z→A, ngắn→dài hoặc theo số.",
      "Sao chép kết quả đã sắp, hoặc sắp lại theo thứ tự khác để so sánh.",
    ],
    faqs: [
      {
        q: "Sắp theo số khác A→Z thế nào?",
        a: "Sắp theo bảng chữ cái so từng ký tự nên “10” đứng trước “2”. Chế độ số đọc từng dòng là một con số rồi xếp theo giá trị.",
      },
      {
        q: "Xử lý được ký tự có dấu và chữ không Latinh?",
        a: "Có. Việc sắp dùng Intl.Collator — phép so sánh nhận diện ngôn ngữ của trình duyệt — nên é, ñ, ü và chữ CJK được xếp theo quy ước ngôn ngữ thay vì mã điểm thô.",
      },
      {
        q: "Danh sách gốc có bị sửa?",
        a: "Không — đầu vào nguyên vẹn và kết quả đã sắp xuất hiện trong ô đầu ra, nên bạn luôn có thể quay lại.",
      },
    ],
  },
  "word-counter": {
    name: "Đếm từ",
    tagline:
      "Đếm từ, ký tự, câu và thời gian đọc trực tiếp khi bạn gõ — xử lý đúng văn bản CJK, không lưu hay tải lên bất cứ gì.",
    intro: [
      "Bộ đếm từ theo thời gian thực cho tiểu luận, bài đăng, nội dung SEO và bản dịch. Nó hiển thị từ, ký tự có và không có khoảng trắng, câu, đoạn, dòng và thời gian đọc ước tính trong một bảng duy nhất.",
      "Văn bản đa ngôn ngữ được đếm đúng: từ kiểu tiếng Anh được tách theo khoảng trắng trong khi chữ Trung, Nhật và Hàn được đếm từng ký tự, khớp cách giới hạn từ thực sự hoạt động ở những ngôn ngữ đó.",
    ],
    steps: [
      "Dán hoặc viết văn bản vào ô — số liệu cập nhật tức thì.",
      "Xem bảng nổi bật cho số liệu bạn quan tâm.",
      "Cứ chỉnh sửa tiếp; không gì được lưu hay tải lên nên an toàn cho bản thảo chưa đăng.",
    ],
    faqs: [
      {
        q: "Từ được đếm thế nào với văn bản Trung hay Nhật?",
        a: "Ký tự CJK được đếm từng ký tự và cộng vào số từ, vì các ngôn ngữ này không tách từ bằng khoảng trắng. Đoạn Trung 500 ký tự sẽ báo khoảng 500 “từ”.",
      },
      {
        q: "Thời gian đọc được ước tính thế nào?",
        a: "Với tốc độ khoảng 220 từ mỗi phút cho văn bản Latinh (CJK tính theo số ký tự), làm tròn lên phút gần nhất.",
      },
      {
        q: "Có giới hạn độ dài?",
        a: "Không giới hạn cứng — bộ đếm chỉ bị chặn bởi bộ nhớ trình duyệt, vốn xử lý thoải mái văn bản dài bằng cả cuốn sách.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Developer                                                           */
  /* ------------------------------------------------------------------ */
  "base64-decoder": {
    name: "Base64 Decoder",
    tagline:
      "Giải mã Base64 trở lại thành văn bản đọc được với xử lý UTF-8 đúng chuẩn — data URI, payload API và giá trị cấu hình mã hóa rõ ràng tức thì. Riêng tư và miễn phí.",
    intro: [
      "Dán Base64 và xem văn bản giải mã trực tiếp. Việc giải mã đi qua TextDecoder chuẩn nên nội dung UTF-8 nhiều byte — dấu, emoji, chữ CJK — ra đúng thay vì thành chữ vỡ.",
      "Nó khoan dung đúng chỗ cần: khoảng trắng và xuống dòng trong đầu vào bị bỏ qua, và tiền tố data URI như data:image/png;base64, được tự động cắt trước khi giải mã.",
    ],
    steps: [
      "Dán chuỗi Base64 vào ô nhập.",
      "Văn bản giải mã xuất hiện ngay — sao chép chỉ với một cú bấm.",
      "Nếu giải mã thất bại, kiểm tra đầu vào có bị cắt cụt hay chứa ký tự ngoài Base64.",
    ],
    faqs: [
      {
        q: "Kết quả toàn ký tự lạ — vì sao?",
        a: "Đầu vào có lẽ không phải văn bản UTF-8. Base64 có thể mã hóa byte tùy ý: ảnh, PDF, dữ liệu nhị phân. Công cụ này giải mã byte thành văn bản UTF-8 nên dữ liệu nhị phân hiển thị thành ký tự thay thế.",
      },
      {
        q: "Giải mã được Base64 URL-safe?",
        a: "Có — được thiết kế cho dữ liệu kiểu JWT, nơi - và _ thay + và /. Base64 chuẩn có hay không có padding đều chạy.",
      },
      {
        q: "Việc giải mã có chạy trên máy chủ?",
        a: "Không. Mọi thứ chạy trong trình duyệt của bạn; chuỗi không bao giờ rời khỏi thiết bị.",
      },
    ],
  },
  "base64-encoder": {
    name: "Base64 Encoder",
    tagline:
      "Mã hóa văn bản thành Base64 tức thì với hỗ trợ UTF-8 đầy đủ — emoji, dấu và chữ CJK giữ nguyên vẹn. Miễn phí, riêng tư, không gì rời khỏi trình duyệt.",
    intro: [
      "Gõ hay dán văn bản bất kỳ và nhận biểu diễn Base64 trực tiếp ngay khi gõ. Mã hóa an toàn UTF-8 qua TextEncoder chuẩn nên văn bản đa ngôn ngữ, emoji và ký hiệu cho ra chính xác những byte mà hàm base64 của mọi ngôn ngữ lập trình tạo ra.",
      "Dùng cho header HTTP Basic Auth, tiền tố data URI, tệp đính kèm email khi đang di chuyển, hay bất kỳ API nào nhận payload Base64 — không cần terminal hay đoạn code nào.",
    ],
    steps: [
      "Dán hoặc gõ văn bản cần mã hóa.",
      "Kết quả Base64 cập nhật trực tiếp — sao chép khi bạn sẵn sàng.",
      "Dán Base64 vào bộ giải mã liên kết để kiểm tra khớp hai chiều.",
    ],
    faqs: [
      {
        q: "Vì sao Base64 làm văn bản dài ra?",
        a: "Base64 biểu diễn mỗi 3 byte thành 4 ký tự nên kết quả lớn hơn đầu vào khoảng 33% — đó là cái giá để có văn bản an toàn nhị phân.",
      },
      {
        q: "Base64 có phải mã hóa bảo mật?",
        a: "Không. Base64 là mã hóa biểu diễn (encoding), không phải mã hóa bảo mật (encryption) — ai cũng giải mã được ngay. Đừng bao giờ dùng nó để giấu bí mật; hãy dùng mật mã thật.",
      },
      {
        q: "Hỗ trợ Unicode và emoji?",
        a: "Có. Đầu vào được chuyển thành byte UTF-8 trước khi mã hóa, trùng khớp với kết quả của btoa-kèm-TextEncoder, Python, Java và Node cho cùng chuỗi.",
      },
    ],
  },
  "css-minifier": {
    name: "CSS Minifier",
    tagline:
      "Nén CSS trực tuyến: loại bỏ chú thích và khoảng trắng thừa để giảm dung lượng stylesheet cho trang tải nhanh hơn. Tức thì, riêng tư, an toàn cho mọi rule.",
    intro: [
      "Dán stylesheet bất kỳ và nhận phiên bản gọn một dòng theo thời gian thực: chú thích bị gỡ, khoảng trắng dư bị gộp, dấu phân cách siết chặt — trong khi nội dung chuỗi, giá trị url() và ngữ nghĩa selector/property giữ nguyên như bản gốc.",
      "Dùng để chuẩn bị critical CSS, làm gọn theme trước khi commit, hay xem việc dọn dẹp tiết kiệm thực sự bao nhiêu byte. Bảng dung lượng trực tiếp hiển thị kích thước vào, ra và phần trăm tiết kiệm.",
    ],
    steps: [
      "Dán CSS của bạn vào ô nhập.",
      "Kết quả nén xuất hiện ngay, kèm dung lượng tiết kiệm hiển thị bên dưới.",
      "Sao chép stylesheet gọn gàng hoặc xóa đầu vào để nén file khác.",
    ],
    faqs: [
      {
        q: "Nén CSS có làm thay đổi hành vi?",
        a: "Không. Chỉ chú thích và khoảng trắng bị gỡ — và cả hai đều được xử lý cẩn thận: chuỗi và nội dung url() được giữ nguyên từng byte nên giá trị content và data URI nguyên vẹn.",
      },
      {
        q: "Có tối ưu màu, gộp rule hay autoprefix?",
        a: "Không — đây là trình nén an toàn ở cấp cú pháp. Tối ưu cấu trúc (gộp rule trùng, rút gọn màu) cần bộ hậu xử lý đầy đủ; công cụ này cam kết không đổi ngữ nghĩa.",
      },
      {
        q: "CSS của tôi đi đến đâu?",
        a: "Không đi đâu cả. Việc nén chạy cục bộ trong trình duyệt; không có gì được tải lên hay lưu lại.",
      },
    ],
  },
  "csv-to-json": {
    name: "CSV sang JSON",
    tagline:
      "Chuyển CSV thành JSON với suy luận kiểu tự động — số, boolean và null được nhận diện, trường có dấu ngoặc xử lý chuẩn. Dán, chuyển, sao chép. Không tải lên.",
    intro: [
      "Dán CSV bất kỳ có dòng tiêu đề và nhận mảng JSON gồm các đối tượng theo thời gian thực. Trường có dấu ngoặc kép, ngoặc thoát và kết thúc dòng CRLF được phân tích chuẩn, và mỗi ô được gán kiểu hợp lý: true/false thành boolean, số thuần thành số, null thành null — mọi thứ khác giữ là chuỗi.",
      "Dùng để nạp request API, seed cơ sở dữ liệu, hay biến bản xuất bảng tính thành thứ code của bạn đọc được. Kết quả JSON được in đẹp với thụt lề 2 khoảng trắng, sẵn sàng sao chép.",
    ],
    steps: [
      "Dán CSV (dòng đầu phải là tiêu đề) vào ô nhập.",
      "Chọn dấu phẩy hay dấu chấm phẩy làm ký tự phân cách.",
      "Sao chép mảng JSON đã in đẹp.",
    ],
    faqs: [
      {
        q: "Suy luận kiểu quyết định giữa chuỗi và số thế nào?",
        a: "Một ô chỉ thành số nếu là số nguyên sạch (không số 0 đầu, không khoảng trắng thừa), true/false thành boolean, chữ null thành null, còn mọi thứ khác — ID có số 0 đầu, mã bưu chính, ngày tháng — giữ là chuỗi để bảo toàn giá trị đúng.",
      },
      {
        q: "Nếu dòng tiêu đề có tên trùng hay trống?",
        a: "Ô tiêu đề trống được thay tự động bằng column1, column2… Tên trùng thì giữ lần cuối, vì đối tượng JSON không chứa khóa trùng.",
      },
      {
        q: "CSV của tôi có bị tải lên máy chủ?",
        a: "Không. Việc chuyển đổi chạy cục bộ trong trình duyệt — dữ liệu không bao giờ rời khỏi thiết bị.",
      },
    ],
  },
  "hash-generator": {
    name: "Trình tạo Hash",
    tagline:
      "Tính hash SHA-1, SHA-256, SHA-384, SHA-512 hay MD5 của văn bản hay file ngay trong trình duyệt. Kiểm tra toàn vẹn nhanh chóng — không tải lên.",
    intro: [
      "Hash văn bản ngay khi gõ, hay kéo thả file để lấy dấu vân tay mà không cần đọc từng byte. Các hash họ SHA-2 chạy trên engine WebCrypto gốc của trình duyệt; MD5 dùng bản JavaScript đã kiểm chứng — tất cả cục bộ, tất cả miễn phí.",
      "Mục đích thường gặp: kiểm tra tải xuống theo checksum công bố, khử trùng lặp file, tạo khóa cache, hay so sánh hai phiên bản tài liệu. Đổi thuật toán một cú bấm và sao chép digest dạng hex ngay lập tức.",
    ],
    steps: [
      "Chọn thuật toán: mặc định SHA-256, hoặc SHA-1/384/512/MD5.",
      "Gõ hay dán văn bản — hoặc chuyển sang chế độ File và kéo thả file vào.",
      "Sao chép digest dạng hex; đối chiếu với checksum mong đợi.",
    ],
    faqs: [
      {
        q: "Nên dùng thuật toán nào?",
        a: "SHA-256 là mặc định hợp lý cho kiểm tra toàn vẹn và dấu vân tay. SHA-384/512 cho digest dài hơn; SHA-1 và MD5 là di sản — ổn cho checksum phi bảo mật nhưng đừng tin vào chúng trước kẻ tấn công.",
      },
      {
        q: "Hash có thể bị đảo ngược để lấy lại đầu vào?",
        a: "Không. Hash là một chiều: digest độ dài cố định cố ý bỏ thông tin. Tìm được đầu vào sinh ra một digest cho trước nghĩa là vét cạn toàn bộ không gian.",
      },
      {
        q: "Văn bản và file của tôi có bị tải lên?",
        a: "Không bao giờ. Việc hash chạy cục bộ trong trình duyệt — kể cả file nhiều GB cũng chỉ được đọc bởi chính thiết bị của bạn.",
      },
    ],
  },
  "html-escape": {
    name: "HTML Escape / Unescape",
    tagline:
      "Escape hay unescape thực thể HTML trực tiếp khi gõ: & < > và dấu ngoặc thành tham chiếu an toàn, kèm chế độ số cho ký tự ngoài ASCII.",
    intro: [
      "Mã hóa năm ký tự phá hỏng HTML — dấu &, ngoặc nhọn và cả hai kiểu dấu ngoặc kép — thành thực thể tên, hay dán thực thể ngược lại thành văn bản đọc được. Một công tắc thứ hai chuyển ký tự có dấu và ngoài Latinh sang tham chiếu số như &#233;, hữu ích cho hệ thống cũ và template email.",
      "Cả hai chiều chạy trực tiếp trong một bảng, và dòng hiển thị cho biết chính xác số ký tự thay đổi thế nào nên lỗi escape kép nhìn là thấy.",
    ],
    steps: [
      "Dán HTML hay văn bản đã escape vào ô nhập.",
      "Chọn Escape hay Unescape; cả hai chạy trực tiếp khi bạn gõ.",
      "Bật thực thể số nếu cần đầu ra ngoài ASCII như &#233;.",
      "Sao chép kết quả — bảng đếm ký tự cho biết nó dài ra hay ngắn lại bao nhiêu.",
    ],
    faqs: [
      {
        q: "Vì sao dấu nháy đơn được escape thành &#39; thay vì &apos;?",
        a: "&apos; hợp lệ trong XML và HTML5 nhưng chưa từng thuộc HTML 4, nên một số parser và email client cũ xử lý sai. &#39; dạng số an toàn ở mọi nơi.",
      },
      {
        q: "Có cần escape ký tự ngoài ASCII?",
        a: "Trong tài liệu UTF-8 thì thường không — trình duyệt xử lý é trực tiếp. Thực thể số quan trọng với bộ mã cũ, luồng email hay hệ thống làm hỏng byte ngoài ASCII.",
      },
      {
        q: "Unescape nhận diện những thực thể tên nào?",
        a: "Khoảng 70 thực thể phổ biến — markup (&amp;, &lt;, &gt;, &quot;, &apos;), dấu câu (&mdash;, &hellip;, &ldquo;), dấu Latinh và ký hiệu (&copy;, &euro;) — cùng mọi tham chiếu số thập phân và thập lục phân.",
      },
    ],
  },
  "html-formatter": {
    name: "HTML Formatter",
    tagline:
      "Biến HTML nén một dòng thành markup sạch, thụt lề chuẩn — trình làm đẹp đơn giản, đáng tin cho email, template và trang đã lưu. 100% phía client.",
    intro: [
      "Dán HTML dồn cục và nhận lại markup dễ đọc, thụt lề nhất quán ngay lập tức. Các phần tử void như img và br không làm vỡ thụt lề, các tag tự đóng quen thuộc như li và p được xử lý hợp lý, và nội dung khối pre, textarea, script và style giữ nguyên không đụng tới.",
      "Một formatter đơn giản có chủ đích: không sắp lại, không viết lại thuộc tính, không bất ngờ — chỉ thêm khoảng trắng và xuống dòng để cấu trúc nhìn là hiểu ngay.",
    ],
    steps: [
      "Dán HTML của bạn vào ô nhập.",
      "Kết quả thụt lề xuất hiện trực tiếp khi bạn gõ.",
      "Sao chép markup đã định dạng hay xóa đầu vào để định dạng đoạn khác.",
    ],
    faqs: [
      {
        q: "Định dạng có làm thay đổi cách HTML hiển thị?",
        a: "Không — định dạng chỉ chèn khoảng trắng và xuống dòng giữa các tag. Nội dung pre, textarea, script và style được giữ chính xác vì khoảng trắng ở đó có ý nghĩa.",
      },
      {
        q: "Xử lý tag chưa đóng như li hay p thế nào?",
        a: "Nó biết các phần tử tự đóng quen thuộc: li mới đóng li trước đó, và tag đóng của phần tử cha sẽ gộp tất cả con đang mở, nên danh sách và đoạn thụt lề đúng như bạn mong đợi.",
      },
      {
        q: "HTML có được gửi lên máy chủ?",
        a: "Không bao giờ. Formatter là một bộ token hóa JavaScript cục bộ — markup của bạn ở lại trong trình duyệt.",
      },
    ],
  },
  "html-minifier": {
    name: "HTML Minifier",
    tagline:
      "Nén HTML ngay trong trình duyệt: gỡ chú thích và gộp khoảng trắng để giảm trọng lượng trang — dọn dẹp thận trọng, giữ nguyên markup và hiển thị.",
    intro: [
      "Dán HTML và nhận phiên bản nhẹ hơn theo thời gian thực. Chú thích bị gỡ (chú thích điều kiện IE được giữ), chuỗi khoảng trắng gộp thành một, và khoảng trắng giữa các tag cấp khối bị bỏ hẳn — còn khoảng cách chữ trong dòng được giữ nên các từ không bao giờ dính vào nhau.",
      "Đây là trình nén thận trọng có chủ đích: không đổi tên class, không bỏ dấu ngoặc, không tái cấu trúc gì cả. Điều đó khiến nó an toàn cho template email và markup cũ, còn bảng dung lượng trực tiếp cho biết chính xác bạn tiết kiệm bao nhiêu byte.",
    ],
    steps: [
      "Dán HTML của bạn vào ô nhập.",
      "Kết quả nén xuất hiện ngay, kèm dung lượng vào/ra và phần trăm tiết kiệm.",
      "Sao chép HTML gọn gàng hay xóa đầu vào để nén trang khác.",
    ],
    faqs: [
      {
        q: "Nén có thể làm hỏng HTML của tôi?",
        a: "Công cụ này chọn con đường an toàn: khoảng trắng bên trong pre, textarea, script và style không bị đụng, khoảng trống giữa các phần tử inline thành một khoảng trắng, và chỉ khoảng giữa các tag cấp khối bị gỡ. Chú thích bị bỏ trừ chú thích điều kiện IE.",
      },
      {
        q: "Vì sao phần trăm tiết kiệm thấp hơn các minifier khác?",
        a: "Vì nó thận trọng ngay từ thiết kế — không bao giờ dán chữ vào tag hay bỏ dấu ngoặc. Những gì nó gỡ (chú thích, thụt lề, khoảng trắng liên khối) luôn an toàn cho hiển thị.",
      },
      {
        q: "Có gì được tải lên không?",
        a: "Không. Mọi thứ chạy cục bộ trong trình duyệt; trang và markup không bao giờ rời khỏi thiết bị.",
      },
    ],
  },
  "http-status-codes": {
    name: "Mã trạng thái HTTP",
    tagline:
      "Sổ tay tra cứu 56 mã trạng thái HTTP có tìm kiếm, xếp theo nhóm, mỗi mã giải thích một câu trơn — bấm bất kỳ dòng nào để sao chép mã số.",
    intro: [
      "Mọi mã trạng thái quan trọng từ 100 Continue tới 511 Network Authentication Required, xếp theo nhóm và giải thích bằng một câu thực dụng: thực sự chuyện gì xảy ra trên đường truyền và việc tiếp theo là gì. Các cái kinh điển (200, 301, 404, 500) đứng cạnh những cái gây bất ngờ (207, 418, 451).",
      "Tìm kiếm lọc trực tiếp theo số hay tên — gõ 30 để dừng ở mọi redirect, hay “teapot” để phân xử. Bấm một dòng sao chép đúng mã số, sẵn sàng cho code, tài liệu hay báo lỗi.",
    ],
    steps: [
      "Gõ số hay tên vào ô tìm kiếm, hoặc duyệt theo nhóm.",
      "Đọc ý nghĩa một dòng — không văn rỡ RFC, chỉ ý nghĩa thực dụng.",
      "Bấm một dòng để sao chép số mã ngay lập tức.",
    ],
    faqs: [
      {
        q: "301, 302 và 307 khác nhau thế nào?",
        a: "Cả ba đều redirect, nhưng 301 vĩnh viễn (công cụ tìm kiếm chuyển thứ hạng) còn 302/307 tạm thời. 307 thêm nữa bảo đảm method và body không đổi — dùng khi POST phải sống sót qua redirect.",
      },
      {
        q: "418 I'm a teapot là mã thật à?",
        a: "Nó khởi đầu là một trò đùa Cá tháng Tư trong RFC 2324 và sau đó được liệt kê là reserved. Một số API thật trả về nó cho vui hay để rate limit, và trình duyệt xử lý như mọi lỗi 4xx.",
      },
      {
        q: "Vì sao 401 và 403 đều nói không được vào?",
        a: "401 nghĩa là “bạn là ai?” — thiếu hoặc sai thông tin xác thực. 403 nghĩa là “tôi biết bạn là ai mà vẫn không được” — xác thực thành công nhưng tài nguyên bị cấm.",
      },
    ],
  },
  "javascript-minifier": {
    name: "JavaScript Minifier",
    tagline:
      "Trình nén JavaScript thận trọng: gỡ chú thích và gộp dòng trống, giữ lại xuống dòng — không viết lại rủi ro, ngữ nghĩa code giữ nguyên.",
    intro: [
      "Trình nén này làm đúng hai việc: gỡ chú thích // và /* */ (kể cả trong file rắc rối — chuỗi, template literal gồm cả ${…} lồng nhau và regex literal đều được tôn trọng), và gộp dòng trống cùng thụt lề. Xuống dòng giữa các câu lệnh được giữ nên việc tự chèn dấu chấm phẩy hoạt động y như trước.",
      "Nó không bao giờ đổi tên biến, inline code hay gộp câu lệnh — đó là việc của build tool thực thụ. Bạn nhận được file nhỏ hơn rõ rệt, nén an toàn, kèm bảng tiết kiệm byte trực tiếp, hoàn toàn trong trình duyệt.",
    ],
    steps: [
      "Dán JavaScript của bạn vào ô nhập.",
      "Kết quả nén xuất hiện ngay, kèm dung lượng vào/ra và phần trăm tiết kiệm.",
      "Sao chép script gọn gàng hay xóa đầu vào để nén file khác.",
    ],
    faqs: [
      {
        q: "Vì sao giữ xuống dòng thay vì nối tất cả vào một dòng?",
        a: "Lựa chọn có chủ đích. JavaScript dựa vào việc tự chèn dấu chấm phẩy, và xóa xuống dòng có thể lặng lẽ thay đổi hành vi chương trình. Giữ xuống dòng khiến trình nén này an toàn cho code chưa từng qua bundler thật.",
      },
      {
        q: "Khác Terser hay UglifyJS thế nào?",
        a: "Các công cụ đó phân tích và viết lại AST: làm ngắn tên, bỏ code chết, inline. Kết quả nhỏ hơn nhiều nhưng cần bước build thật. Công cụ này chỉ gỡ chú thích và dòng trống — rủi ro thay đổi hành vi bằng không, không cần build.",
      },
      {
        q: "Code của tôi có bị tải lên đâu không?",
        a: "Không. Mọi thứ chạy cục bộ trong trình duyệt — mã nguồn không bao giờ rời khỏi thiết bị.",
      },
    ],
  },
  "json-formatter": {
    name: "JSON Formatter",
    tagline:
      "Định dạng và làm đẹp JSON lộn xộn trực tuyến — 2 khoảng trắng, 4 khoảng trắng hay tab, kèm kiểm tra hợp lệ tức thì và vị trí lỗi chính xác. 100% trong trình duyệt.",
    intro: [
      "Dán JSON nén hay thụt lề xấu và nhận kết quả sạch, dễ đọc ngay lập tức. Chọn thụt lề 2 khoảng trắng, 4 khoảng trắng hay tab, và kết quả cập nhật trực tiếp khi bạn gõ hay sửa — hoàn hảo để soi response API, file cấu hình và payload log.",
      "JSON không hợp lệ không phải ngõ cụt: formatter chỉ ra đúng dòng và cột của lỗi cú pháp nên thiếu dấu phẩy hay ngoặc chỉ mất vài giây thay vì vài phút.",
    ],
    steps: [
      "Dán JSON của bạn vào ô nhập.",
      "Chọn thụt lề: 2 khoảng trắng, 4 khoảng trắng hay một tab.",
      "Sao chép kết quả đẹp — hay sửa đúng dòng và cột được báo nếu JSON không hợp lệ.",
    ],
    faqs: [
      {
        q: "Có giới hạn dung lượng JSON định dạng được?",
        a: "Không giới hạn cứng — việc định dạng chạy cục bộ trong trình duyệt. File rất lớn (hàng chục MB) có thể chậm vì kết quả tính lại khi bạn gõ, nên hãy dán một lần và sửa cẩn thận.",
      },
      {
        q: "Định dạng có làm thay đổi dữ liệu?",
        a: "Không. Giá trị, thứ tự khóa và cấu trúc giữ nguyên tuyệt đối; chỉ có khoảng trắng và xuống dòng được thêm. Kết quả là JSON tương đương từng byte.",
      },
      {
        q: "JSON của tôi có bị tải lên máy chủ?",
        a: "Không. Mọi thứ chạy cục bộ trong trình duyệt bằng JavaScript — dữ liệu không bao giờ rời khỏi thiết bị.",
      },
    ],
  },
  "json-minifier": {
    name: "JSON Minifier",
    tagline:
      "Nén JSON trực tuyến: bỏ toàn bộ khoảng trắng để thu nhỏ payload cho API phản hồi nhanh và lưu trữ gọn — xem chính xác số byte tiết kiệm, riêng tư trong trình duyệt.",
    intro: [
      "Dán JSON đã in đẹp và nhận phiên bản tương đương gọn nhất theo thời gian thực: mọi khoảng trắng, xuống dòng và thụt lề bị loại mà không đụng tới dữ liệu. Bảng dung lượng trực tiếp hiển thị kích thước gốc, kích thước nén và phần trăm tiết kiệm.",
      "Dùng để làm gọn response API, file fixture, bản dịch và cấu hình JSON trước khi triển khai hay lưu trữ. Nếu đầu vào không phải JSON hợp lệ, công cụ báo đúng dòng và cột có vấn đề thay vì im lặng thất bại.",
    ],
    steps: [
      "Dán JSON đã định dạng vào ô nhập.",
      "Kết quả nén một dòng xuất hiện ngay, kèm dung lượng tiết kiệm bên dưới.",
      "Sao chép kết quả gọn hay xóa đầu vào để bắt đầu lại.",
    ],
    faqs: [
      {
        q: "Nén JSON có làm thay đổi dữ liệu?",
        a: "Không. Khoảng trắng ngoài chuỗi không mang ý nghĩa trong JSON nên việc loại bỏ cho ra tài liệu tương đương, giá trị giống hệt khi phân tích.",
      },
      {
        q: "JSON của tôi nhỏ hơn bao nhiêu?",
        a: "Tùy thuộc vào thụt lề bạn đang gỡ — file thụt lề sâu thường giảm 30–60%. Công cụ hiển thị đúng phần trăm cho đầu vào của bạn.",
      },
      {
        q: "Dữ liệu có được gửi đi đâu không?",
        a: "Không. Việc nén chạy hoàn toàn trong trình duyệt — không có gì được tải lên, ghi log hay lưu lại.",
      },
    ],
  },
  "json-to-csv": {
    name: "JSON sang CSV",
    tagline:
      "Chuyển mảng JSON thành CSV với quoting và escaping chuẩn — sẵn sàng cho Excel, Sheets hay nhập cơ sở dữ liệu. Hoàn toàn trong trình duyệt.",
    intro: [
      "Dán mảng JSON gồm các đối tượng và nhận CSV ngay lập tức. Các cột là hợp của mọi khóa tìm thấy trên các dòng, giá trị được escape đúng quy tắc — ngoặc kép nhân đôi, trường chứa dấu phẩy, ngoặc hay xuống dòng được bọc — nên kết quả mở sạch sẽ trong Excel, Sheets hay mọi bộ nhập liệu.",
      "Đối tượng và mảng lồng nhau được tuần tự hóa thành chuỗi JSON bên trong ô, boolean và số đi qua nguyên bản, còn null thành ô trống. Chọn dấu phẩy hay chấm phẩy làm phân cách cho các vùng miền đòi hỏi vậy.",
    ],
    steps: [
      "Dán mảng JSON gồm các đối tượng vào ô nhập.",
      "CSV xuất hiện trực tiếp — chọn dấu phẩy hay chấm phẩy nếu bảng tính của bạn cần.",
      "Sao chép kết quả thẳng vào file .csv hay trình hướng dẫn nhập liệu.",
    ],
    faqs: [
      {
        q: "Nếu các dòng có khóa khác nhau thì sao?",
        a: "Công cụ dựng danh sách cột từ mọi khóa thấy được trên tất cả các dòng; dòng thiếu cột nào nhận ô trống. Thường thì đó chính là điều bạn muốn với dữ liệu thực tế lộn xộn.",
      },
      {
        q: "Đối tượng và mảng lồng nhau xử lý ra sao?",
        a: "Chúng được tuần tự hóa thành chuỗi JSON bên trong ô (và được quote/escape như mọi giá trị khác). Hãy làm phẳng dữ liệu trước nếu cần mỗi trường lồng một cột.",
      },
      {
        q: "Dữ liệu của tôi có bị tải lên đâu không?",
        a: "Không. Việc chuyển đổi diễn ra cục bộ trong trình duyệt — không gì rời khỏi thiết bị.",
      },
    ],
  },
  "json-validator": {
    name: "JSON Validator",
    tagline:
      "Kiểm tra JSON tức thì với dòng và cột lỗi chính xác. Bắt thiếu dấu phẩy, khóa không quote, dấu phẩy thừa cuối và escape sai trước khi chúng làm hỏng ứng dụng.",
    intro: [
      "Dán tài liệu JSON bất kỳ và nhìn một cái biết nó có hợp lệ không. Bộ kiểm tra rất nghiêm: tuân theo chuẩn JSON nên các lỗi quen như ngoặc đơn, dấu phẩy thừa cuối, khóa không quote và chú thích đều bị báo.",
      "Khi có gì đó sai, bạn nhận đúng dòng và cột cùng lý do đọc hiểu được — không phải thông điệp một dòng khó hiểu. Đầu vào hợp lệ được thưởng bằng bản in đẹp sẵn sàng sao chép.",
    ],
    steps: [
      "Dán JSON của bạn vào ô nhập.",
      "Trạng thái xanh xuất hiện nếu JSON hợp lệ; ngược lại dòng, cột và lý do được hiển thị.",
      "Sửa đúng vị trí được báo, hay sao chép bản in đẹp khi kiểm tra qua.",
    ],
    faqs: [
      {
        q: "Validator tìm được những lỗi nào?",
        a: "Mọi lỗi cú pháp JSON chuẩn: thiếu hay thừa dấu phẩy, khóa không quote hay quote đơn, dấu phẩy thừa cuối, ký tự điều khiển chưa escape, escape không hợp lệ, và nội dung lạc sau giá trị — mỗi lỗi kèm dòng và cột.",
      },
      {
        q: "Có kiểm tra schema hay chỉ cú pháp?",
        a: "Chỉ cú pháp. Nó xác nhận tài liệu là JSON hợp lệ, chứ không xác nhận các trường có kiểu hay giá trị như mong đợi — việc đó cần trình kiểm tra schema như JSON Schema.",
      },
      {
        q: "JSON của tôi có bị tải lên đâu không?",
        a: "Không. Việc kiểm tra diễn ra cục bộ trong trình duyệt; không gì rời khỏi thiết bị.",
      },
    ],
  },
  "jwt-decoder": {
    name: "JWT Decoder",
    tagline:
      "Giải mã token JWT trực tuyến: soi header và payload với dấu thời gian exp và iat dạng ngày tháng dễ đọc. Chỉ giải mã — không xác minh, không tải lên.",
    intro: [
      "Dán JSON Web Token và xem ngay ba phần tách bạch: header (thuật toán và loại token), payload (các claim thật sự) và chữ ký. Cả hai phần JSON được in đẹp, và dấu thời gian như iat, nbf, exp được dịch thành ngày tháng theo ngôn ngữ của bạn, exp còn được đánh dấu đã hết hạn hay còn hiệu lực.",
      "Mọi thứ được giải mã cục bộ bằng Base64URL — token không bao giờ được gửi đi và không được xác minh. Hãy nhớ: giải mã cho biết token nói gì, không phải token được phép làm gì. Xác minh chữ ký luôn đòi hỏi secret hay khóa công khai trên hệ thống đáng tin.",
    ],
    steps: [
      "Dán JWT (ba phần cách nhau bằng dấu chấm) vào ô nhập.",
      "Đọc header và payload đã in đẹp, với exp/iat hiển thị thành ngày thật.",
      "Sửa token hay việc xác minh phía máy chủ của bạn theo đó — sao chép payload nếu cần.",
    ],
    faqs: [
      {
        q: "Giải mã JWT có phải xác minh nó?",
        a: "Không. Giải mã chỉ là Base64URL cộng phân tích JSON mà ai cũng làm được — kể cả kẻ tấn công. Token giải mã trông hợp lệ không chứng minh gì. Xác minh đòi hỏi kiểm tra chữ ký bằng secret (HMAC) hay khóa công khai (RSA/EC), nghĩa là cần khóa của bên phát hành token.",
      },
      {
        q: "Có thể đọc hay đổi các claim của token?",
        a: "Bạn đọc được các claim, nhưng không thể giả mạo token mới với claim đã sửa mà không làm chữ ký vô hiệu — bất kỳ thay đổi nào ở header hay payload đều phá vỡ kiểm tra chữ ký phía máy chủ.",
      },
      {
        q: "Dán token thật vào đây có an toàn?",
        a: "Token được giải mã hoàn toàn trong trình duyệt và không bao giờ rời khỏi thiết bị — không có bước tải lên. Dù vậy, hãy coi token như thông tin xác thực và tránh dán token production ở những nơi không cần thiết.",
      },
    ],
  },
  "markdown-previewer": {
    name: "Markdown Previewer",
    tagline:
      "Xem trước Markdown thành HTML sạch, đã khử độc ngay khi gõ — tiêu đề, danh sách, bảng, code và liên kết hiển thị trực tiếp. Hoàn hảo cho README, docs và bình luận.",
    intro: [
      "Viết Markdown bên trái và xem trang được kết xuất hiện ra bên phải theo thời gian thực: tiêu đề, nhấn mạnh, danh sách, bảng, blockquote, task list và khối code có fence, tất cả hiển thị bởi engine marked được dùng rộng rãi.",
      "HTML sinh ra được khử độc bằng danh sách cho phép tag và thuộc tính nghiêm ngặt trước khi hiển thị — script, trình xử lý sự kiện và URL javascript: bị gỡ — và bạn có thể sao chép HTML sạch để dán vào blog, CMS hay template email.",
    ],
    steps: [
      "Gõ hay dán Markdown vào khung bên trái.",
      "Xem bản preview đã khử độc cập nhật bên phải khi bạn viết.",
      "Sao chép HTML sinh ra khi thấy ổn, hay xóa để bắt đầu lại.",
    ],
    faqs: [
      {
        q: "HTML được preview có an toàn?",
        a: "Có. Trước khi hiển thị bất cứ gì, HTML đi qua bộ khử độc whitelist gỡ thẻ script, trình xử lý sự kiện inline và liên kết javascript:, chỉ giữ các tag định dạng chuẩn và URL ảnh/liên kết an toàn.",
      },
      {
        q: "Những tính năng Markdown nào được hỗ trợ?",
        a: "Tất cả những gì marked xử lý mặc định: bảng kiểu GitHub, gạch ngang xóa chữ, task list, autolink, khối code có fence kèm nhãn ngôn ngữ và danh sách lồng nhau.",
      },
      {
        q: "Văn bản của tôi được xử lý ở đâu?",
        a: "Hoàn toàn trong trình duyệt — Markdown không bao giờ rời khỏi thiết bị, kể cả khi bạn sao chép HTML sinh ra.",
      },
    ],
  },
  "md5-generator": {
    name: "MD5 Generator",
    tagline:
      "Tạo hash MD5 của văn bản hay file ngay trong trình duyệt — hoàn hảo cho checksum, khóa khử trùng lặp và tích hợp hệ thống cũ. Một chiều, không bao giờ tải lên.",
    intro: [
      "Gõ văn bản để xem digest MD5 128-bit trực tiếp, hay kéo thả file để lấy dấu vân tay mà không tải lên một byte nào. Việc hash diễn ra cục bộ bằng bản hiện thực MD5 JavaScript trưởng thành.",
      "MD5 vẫn hiện diện khắp nơi: checksum tải xuống, khóa khử trùng lặp file, cache buster, tích hợp hệ thống cũ. Chỉ cần nhớ nó không dùng được cho gì — dù có tuổi, MD5 đã bị phá về mặt mật mã nên đừng bao giờ dùng cho mật khẩu, chữ ký hay thứ gì kẻ tấn công có thể can thiệp.",
    ],
    steps: [
      "Gõ hay dán văn bản — digest MD5 cập nhật trực tiếp.",
      "Hoặc chuyển sang chế độ File và kéo thả file để hash cục bộ.",
      "Sao chép digest dạng hex và đối chiếu với checksum mong đợi.",
    ],
    faqs: [
      {
        q: "MD5 có an toàn để lưu mật khẩu?",
        a: "Không — còn xa mới đến. MD5 nhanh ngay từ thiết kế và tấn công va chạm là khả thi, nên bẻ khóa hash mật khẩu MD5 chẳng có gì khó. Hãy dùng lược đồ hash mật khẩu chuyên dụng như bcrypt, scrypt hay Argon2.",
      },
      {
        q: "MD5 còn dùng được cho việc gì?",
        a: "Toàn vẹn phi đối kháng: kiểm tra file sống sót qua quá trình truyền, khử trùng lặp nội dung, khóa cache và nói chuyện với hệ thống cũ đòi hỏi nó. Với các kiểm tra liên quan bảo mật, dùng SHA-256 hay tốt hơn.",
      },
      {
        q: "Văn bản và file của tôi có được gửi lên máy chủ?",
        a: "Không. Mọi thứ chạy trong trình duyệt; kể cả file cũng được đọc và hash hoàn toàn trên thiết bị của bạn.",
      },
    ],
  },
  "regex-tester": {
    name: "Regex Tester",
    tagline:
      "Thử biểu thức chính quy trực tiếp: làm nổi mọi khớp khi gõ, soi nhóm bắt và debug mẫu cho JavaScript, với các flag thông dụng cách một cú bấm.",
    intro: [
      "Gõ mẫu, bật các flag cần thiết (global, case-insensitive, multiline, dotAll, unicode) và dán chuỗi thử — mọi khớp được làm nổi tại chỗ trong khi danh sách bên dưới hiển thị từng khớp với chỉ số và các nhóm bắt, gồm cả nhóm đặt tên.",
      "Mẫu không hợp lệ được báo ngay với chính thông điệp của parser thay vì trang vỡ, và khớp zero-length được xử lý an toàn nên các mẫu như a* hành xử y như runtime của bạn.",
    ],
    steps: [
      "Nhập biểu thức chính quy vào ô mẫu.",
      "Bật flag (g, i, m, s, u) và dán chuỗi thử.",
      "Đọc các khớp được làm nổi và danh sách nhóm; chỉnh mẫu cho tới khi nó bắt đúng thứ bạn cần.",
    ],
    faqs: [
      {
        q: "Công cụ dùng flavor regex nào?",
        a: "RegExp JavaScript (ECMAScript) — cùng engine chạy trong trình duyệt và Node của bạn. Mẫu cho PCRE, Python hay Java thường tương thích, nhưng lookahead/lookbehind và xử lý unicode có thể khác đôi chút.",
      },
      {
        q: "Vì sao mẫu của tôi khớp các vị trí trống kỳ lạ?",
        a: "Mẫu có thể khớp chuỗi rỗng (như a*) tạo ra khớp zero-length. Trình thử tiến một ký tự sau mỗi lần như vậy, đúng như cách lặp của JavaScript.",
      },
      {
        q: "Dữ liệu thử của tôi có được gửi đi đâu?",
        a: "Không. Việc khớp chạy trực tiếp trong trình duyệt — không có gì được tải lên hay lưu lại.",
      },
    ],
  },
  "sha256-generator": {
    name: "SHA-256 Generator",
    tagline:
      "Tính hash SHA-256 của văn bản hay file trực tuyến bằng WebCrypto gốc — lựa chọn chuẩn cho kiểm tra toàn vẹn và dấu vân tay. 100% phía client.",
    intro: [
      "Gõ văn bản để xem digest SHA-256 256-bit xuất hiện trực tiếp, hay kéo thả file để lấy dấu vân tay cho cả hàng GB mà không tải lên gì. Hash được tính bởi hiện thực WebCrypto của chính trình duyệt — cùng mã mà hệ điều hành và TLS stack của bạn tin dùng.",
      "SHA-256 là mặc định hiện nay cho xác minh tải xuống, ký artifact, khử trùng lặp nội dung, xây kho lưu trữ theo địa chỉ nội dung và công việc blockchain. Sao chép digest hex một cú bấm và đối chiếu với checksum nhà phát hành đưa bạn.",
    ],
    steps: [
      "Gõ hay dán văn bản — digest cập nhật khi bạn gõ.",
      "Hoặc chuyển sang chế độ File và kéo thả file để hash cục bộ.",
      "Sao chép digest dạng hex và đối chiếu với giá trị mong đợi.",
    ],
    faqs: [
      {
        q: "SHA-256 có an toàn?",
        a: "Có — SHA-256 thuộc họ SHA-2 và vẫn chưa bị phá sau hai thập kỷ bị nghiên cứu. Đây là digest đứng sau chứng chỉ TLS, Bitcoin và phần lớn việc xác minh bản phát hành phần mềm.",
      },
      {
        q: "Vì sao cùng đầu vào luôn cho cùng hash?",
        a: "Vì SHA-256 là tất định: các byte giống nhau luôn sinh digest giống nhau. Chính tính chất đó làm việc so sánh checksum có ý nghĩa — một byte thay đổi ở bất cứ đâu là cả digest đổi.",
      },
      {
        q: "Văn bản và file của tôi có bị tải lên?",
        a: "Không. Việc hash chạy cục bộ trong trình duyệt bằng WebCrypto — dữ liệu không bao giờ rời khỏi thiết bị.",
      },
    ],
  },
  "sql-formatter": {
    name: "SQL Formatter",
    tagline:
      "Định dạng SQL trực tuyến với chữ hoa từ khóa nhất quán và thụt lề chuẩn — biến SELECT dài, JOIN và stored procedure thành code dễ đọc, ngay trong trình duyệt.",
    intro: [
      "Dán truy vấn dày đặc một dòng và nhận SQL có cấu trúc chuẩn ngay lập tức: các mệnh đề xuống dòng riêng, biểu thức lồng thụt lề nhất quán, và từ khóa viết hoa để quét mắt dễ dàng. Vận hành bởi engine sql-formatter nên quy tắc cũng là những gì các đội dev thật dùng.",
      "Hoàn hảo để review truy vấn được sinh ra, debug output ORM, viết tài liệu cho stored procedure hay gỡ rối mệnh đề WHERE 40 dòng ai đó để lại trong comment.",
    ],
    steps: [
      "Dán SQL của bạn vào ô nhập.",
      "Truy vấn định dạng xuất hiện khi bạn gõ, từ khóa viết hoa và các mệnh đề thẳng hàng.",
      "Sao chép SQL dễ đọc hay xóa đầu vào để định dạng truy vấn khác.",
    ],
    faqs: [
      {
        q: "Hỗ trợ những dialect SQL nào?",
        a: "Định dạng chạy với SQL chuẩn, và engine bên dưới còn hiểu cú pháp riêng của PostgreSQL, MySQL, T-SQL, PL/SQL, BigQuery, Snowflake và nhiều hệ khác — các cấu trúc phổ biến được định dạng đúng ở mọi nơi.",
      },
      {
        q: "Định dạng có làm thay đổi kết quả truy vấn?",
        a: "Không. Chỉ khoảng trắng và chữ hoa của từ khóa thay đổi. Chuỗi và định danh được quote giữ nguyên chính xác nên truy vấn tương đương về ngữ nghĩa.",
      },
      {
        q: "Truy vấn của tôi có được gửi lên máy chủ?",
        a: "Không. Việc định dạng chạy cục bộ trong trình duyệt — SQL không bao giờ rời khỏi thiết bị.",
      },
    ],
  },
  "url-decoder": {
    name: "URL Decoder",
    tagline:
      "Giải mã URL mã hóa phần trăm về văn bản đọc được — %20, %2F và giá trị query string rõ ràng tức thì. Xử lý + là khoảng trắng, hoàn toàn trong trình duyệt.",
    intro: [
      "Dán URL, tham số hay đoạn path đã mã hóa và đọc ngay văn bản gốc. Hai chế độ tương ứng hai bộ mã hóa: giải mã component (decodeURIComponent) cho một giá trị đơn, và giải mã URI đầy đủ (decodeURI) cho URL hoàn chỉnh.",
      "Một công tắc tiện lợi xử lý + là khoảng trắng — đúng nghĩa của query string mã hóa biểu mẫu (application/x-www-form-urlencoded) — nên tham số như hello+world giải mã thành hello world thay vì giữ nguyên ký tự.",
    ],
    steps: [
      "Dán chuỗi hay URL đã mã hóa phần trăm.",
      "Chọn giải mã component cho giá trị, hay giải mã URI đầy đủ cho URL hoàn chỉnh.",
      "Bật “+ là khoảng trắng” cho query string kiểu biểu mẫu, rồi sao chép văn bản đã giải mã.",
    ],
    faqs: [
      {
        q: "Vì sao thỉnh thoảng tôi gặp lỗi khi giải mã?",
        a: "Một dấu % lẻ không theo hai chữ số hex, hay chuỗi escape bị cắt như %E4%BD, là mã hóa phần trăm không hợp lệ — bộ giải mã báo thay vì đoán bừa.",
      },
      {
        q: "Có nên bật tùy chọn “+ là khoảng trắng”?",
        a: "Với giá trị lấy từ form HTML hay query string của nhiều framework web, thì có. Với URL mã hóa phần trăm chuẩn chứa ký tự + thật, hãy để tắt.",
      },
      {
        q: "Có gì được tải lên không?",
        a: "Không. Việc giải mã chạy cục bộ trong trình duyệt — không gì rời khỏi thiết bị.",
      },
    ],
  },
  "url-encoder": {
    name: "URL Encoder",
    tagline:
      "Mã hóa phần trăm URL và query string trực tuyến — chọn mã hóa component hay URI đầy đủ, kết quả trực tiếp cho liên kết, tham số và đoạn path.",
    intro: [
      "Dán văn bản hay URL bất kỳ và xem kết quả mã hóa phần trăm trực tiếp. Hai chế độ phủ hai tình huống thật: mã hóa component (encodeURIComponent) escape mọi ký tự đặc biệt cho một giá trị tham số đơn, còn mã hóa URI đầy đủ (encodeURI) giữ cấu trúc URL — :, /, ? và & — nguyên vẹn.",
      "Thiết yếu khi tự dựng query string, nhúng URL vào URL khác, tạo liên kết mailto hay truyền giá trị chứa khoảng trắng, dấu & và ký tự ngoài Latinh qua tham số GET.",
    ],
    steps: [
      "Dán văn bản, giá trị tham số hay URL cần mã hóa.",
      "Chọn mã hóa component cho một giá trị, hay URI đầy đủ để giữ cấu trúc URL.",
      "Sao chép kết quả đã mã hóa thẳng vào liên kết hay request của bạn.",
    ],
    faqs: [
      {
        q: "Khi nào dùng encodeURIComponent thay vì encodeURI?",
        a: "Dùng encodeURIComponent cho các giá trị đơn bạn chèn vào URL — nó escape &, =, ?, / và hơn nữa nên giá trị không thể phá vỡ query string. Chỉ dùng encodeURI cho URL hoàn chỉnh mà bạn muốn an toàn khi truyền nhưng giữ cấu trúc.",
      },
      {
        q: "Vì sao khoảng trắng thành %20 chứ không phải +?",
        a: "%20 là mã hóa phần trăm chuẩn của khoảng trắng; cách viết tắt + là quy ước mã hóa biểu mẫu do application/x-www-form-urlencoded xử lý riêng. Công cụ này dùng %20 chuẩn.",
      },
      {
        q: "Xử lý được ký tự ngoài Latinh?",
        a: "Có — ký tự ngoài ASCII được mã hóa UTF-8 trước, rồi mã hóa phần trăm, đúng như trình duyệt làm.",
      },
    ],
  },
  "url-parser": {
    name: "URL Parser",
    tagline:
      "Dán URL bất kỳ và xem nó được tách mảnh trực tiếp: protocol, host, port, từng đoạn path, tham số query đã giải mã và hash — kèm sao chép dạng JSON.",
    intro: [
      "Một URL giấu hàng chục mẩu dữ liệu trong một dòng. Công cụ này tách nó thành các hàng có nhãn — scheme, host, port, từng đoạn path một dòng riêng, mỗi tham số query với khóa và giá trị đã giải mã, cùng fragment — để bạn kiểm tra liên kết tracking, debug routing hay mổ xẻ một lời gọi API.",
      "Phân tích dùng URL API gốc của trình duyệt: giá trị được giải mã đúng cách máy chủ nhận sẽ giải mã. URL thiếu scheme được giả định https://, còn đầu vào lỗi nhận thông báo bằng ngôn ngữ đời thường thay vì sập.",
    ],
    steps: [
      "Dán URL vào ô nhập.",
      "Đọc bảng tách mảnh: các phần, đoạn và tham số cập nhật trực tiếp.",
      "Sao chép dạng JSON khi cần bảng phân tích trong code hay tài liệu.",
    ],
    faqs: [
      {
        q: "Dán URL thiếu https:// thì sao?",
        a: "Công cụ giả định https:// và thử lại, đúng như trình duyệt làm với tên miền trần. Scheme bạn gõ tường minh luôn được giữ nguyên.",
      },
      {
        q: "Giá trị query có được giải mã?",
        a: "Có. Khóa và giá trị được giải mã theo chuẩn URL nên %20 thành khoảng trắng và %2F thành dấu gạch, đúng cách máy chủ đọc chúng.",
      },
      {
        q: "Khóa query trùng như ?tag=a&tag=b thì sao?",
        a: "Mỗi lần xuất hiện có một hàng riêng, và bản xuất JSON liệt kê chúng thành các cặp khóa/giá trị riêng nên không gì bị ghi đè lặng lẽ.",
      },
    ],
  },
  "uuid-generator": {
    name: "Trình tạo UUID",
    tagline:
      "Tạo UUID v4 ngẫu nhiên số lượng lớn chỉ với một cú bấm — 1 tới 500 cái mỗi lần, dùng nguồn ngẫu nhiên mật mã của trình duyệt. Miễn phí, tức thì, chạy offline.",
    intro: [
      "Tạo UUID phiên bản 4 theo RFC 4122 với số lượng tùy nhu cầu: fixture kiểm thử, seed cơ sở dữ liệu, tên file, request ID hay bản nháp API key. Mỗi định danh được sinh bởi crypto.randomUUID — nguồn ngẫu nhiên an toàn mật mã của trình duyệt — với 122 bit ngẫu nhiên, xác suất va chạm bạn sẽ không bao giờ gặp trong thực tế.",
      "Khác các phiên bản theo thời gian (v1/v6/v7), v4 không mang dấu thời gian và không lộ bất cứ điều gì về thời điểm hay nơi tạo — trang sẽ nói rõ điều đó, cùng thời điểm lô của bạn được sinh.",
    ],
    steps: [
      "Đặt số UUID bạn cần (1–500).",
      "Bấm Tạo — danh sách xuất hiện ngay.",
      "Sao chép tất cả cùng lúc, hay xóa và tạo lô mới.",
    ],
    faqs: [
      {
        q: "Hai UUID có bao giờ trùng nhau?",
        a: "Lý thuyết là có, thực tế là không. Với 122 bit ngẫu nhiên, tạo ra một va chạm cần cỡ 10^36 UUID — vượt xa mọi khối lượng công việc thực tế.",
      },
      {
        q: "Vì sao chọn v4 thay vì UUID v1 hay v7?",
        a: "v4 không lộ thông tin thời gian hay phần cứng và không cần đồng hồ hay địa chỉ MAC. Nếu cần ID thuận cho chỉ mục cơ sở dữ liệu, sắp được theo thời gian, hãy xem v7 — còn để đảm bảo tính duy nhất thuần túy, v4 là lựa chọn chuẩn.",
      },
      {
        q: "UUID có được tạo trên máy chủ?",
        a: "Không. Chúng đến từ bộ sinh ngẫu nhiên mật mã của chính trình duyệt bạn và không bao giờ rời khỏi thiết bị.",
      },
    ],
  },
  "xml-formatter": {
    name: "XML Formatter",
    tagline:
      "Làm đẹp XML trực tuyến với thụt lề 2 khoảng trắng sạch sẽ — sitemap, feed RSS, envelope SOAP và file cấu hình dễ đọc trở lại, ngay trong trình duyệt.",
    intro: [
      "Dán XML rối hay một dòng và nhận tài liệu thụt lề chuẩn ngay lập tức. Các phần tử lồng nhau thụt lề 2 khoảng trắng nhất quán, nội dung chữ ngắn nằm cùng dòng với tag của nó, và chú thích, khối CDATA, chỉ thị xử lý cùng khai báo DOCTYPE được giữ lại.",
      "Lý tưởng để đọc sitemap.xml, feed RSS/Atom, layout Android, pom Maven, response SOAP và vô số định dạng cấu hình khác — mà không cần cài plugin trình soạn thảo.",
    ],
    steps: [
      "Dán XML của bạn vào ô nhập.",
      "Tài liệu định dạng xuất hiện ngay khi bạn gõ.",
      "Sao chép XML đã làm đẹp hay xóa đầu vào để thử file khác.",
    ],
    faqs: [
      {
        q: "Định dạng có làm thay đổi dữ liệu XML?",
        a: "Khoảng trắng giữa các phần tử được chuẩn hóa để cấu trúc dễ đọc — an toàn với gần như mọi XML thực tế. Khoảng trắng bên trong nội dung chữ được giữ (trim ở mép), và khối CDATA giữ nguyên từng byte.",
      },
      {
        q: "Xử lý được file XML lớn?",
        a: "Có, trong chừng mực hợp lý — việc định dạng là một lượt chạy nhanh và diễn ra cục bộ, nhưng tài liệu vài MB có thể mất một lát trên thiết bị chậm.",
      },
      {
        q: "XML của tôi có bị tải lên máy chủ?",
        a: "Không. Việc định dạng diễn ra hoàn toàn trong trình duyệt; không có gì được gửi đi đâu cả.",
      },
    ],
  },
  "xml-validator": {
    name: "XML Validator",
    tagline:
      "Kiểm tra XML có well-formed theo thời gian thực: tag lệch nhau, thuộc tính lỗi và thực thể không hợp lệ bị báo ngay khi bạn dán. Không tải lên gì.",
    intro: [
      "Bộ kiểm tra dùng XML parser dựng sẵn của trình duyệt nên nó áp đúng những quy tắc mà công cụ XML thật áp dụng: mọi tag phải đóng, thuộc tính phải có quote, thực thể phải hợp lệ, và phải có đúng một phần tử gốc.",
      "XML well-formed nhận trạng thái xanh kèm bản xem trước in đẹp; vấn đề hiển thị cùng chính mô tả lỗi của parser, chỉ đúng chỗ sai — hữu ích trước khi đưa feed, sitemap hay payload SOAP cho những bên tiêu thụ khó tính.",
    ],
    steps: [
      "Dán XML của bạn vào ô nhập.",
      "Trạng thái xanh xuất hiện nếu XML well-formed; ngược lại lỗi parser được hiển thị.",
      "Sửa đúng vấn đề được báo, hay sao chép bản xem trước định dạng khi đã qua.",
    ],
    faqs: [
      {
        q: "Có kiểm tra theo schema DTD hay XSD?",
        a: "Không — chỉ kiểm tra well-formed (cấu trúc, quoting, thực thể, một gốc duy nhất). Kiểm tra schema cần công cụ chuyên dụng với XSD hay DTD của bạn.",
      },
      {
        q: "Cái gì bị coi là lỗi XML ở đây?",
        a: "Tag chưa đóng hay lệch nhau, thuộc tính không quote, thuộc tính trùng, tham chiếu thực thể không hợp lệ, nhiều phần tử gốc và ký tự bất hợp lệ đều bị từ chối.",
      },
      {
        q: "XML của tôi có được gửi đi đâu?",
        a: "Không. Việc kiểm tra chạy trong trình duyệt bằng DOMParser gốc — dữ liệu không bao giờ rời khỏi thiết bị.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* SEO                                                                 */
  /* ------------------------------------------------------------------ */
  "canonical-tag-generator": {
    name: "Trình tạo thẻ Canonical",
    tagline:
      "Tạo đúng thẻ liên kết rel=canonical và học cách chuẩn hóa URL để công cụ tìm kiếm lập chỉ mục đúng phiên bản bạn muốn.",
    intro: [
      "Thẻ canonical cho công cụ tìm kiếm biết URL nào được lập chỉ mục khi cùng nội dung truy cập được qua nhiều địa chỉ — có và không có gạch cuối, với query string, tham số UTM, biến thể http/https hay www. Làm đúng, nó hợp nhất các URL trùng thành một tín hiệu xếp hạng thay vì chia năm xẻ bảy.",
      "Nhập URL tuyệt đối của phiên bản ưu tiên và sao chép thẻ vào <head> của trang đó. Danh sách kiểm tra phủ những chi tiết chuẩn hóa mà phần lớn triển khai làm sai.",
    ],
    steps: [
      "Chọn một định dạng URL canonical cho toàn trang web: https, host có hay không www, gạch cuối hay không.",
      "Dán URL tuyệt đối của phiên bản ưu tiên của trang.",
      "Sao chép thẻ liên kết vào <head> của trang và xác minh bằng công cụ URL Inspection.",
    ],
    faqs: [
      {
        q: "Thẻ canonical thực sự làm gì?",
        a: "Nó hợp nhất các bản trùng: tín hiệu từ các URL thay thế — bản sao UTM, sắp xếp theo tham số, bản xem in — được gộp vào URL canonical để nó được xếp hạng thay vì sức mạnh bị chia cho các bản trùng.",
      },
      {
        q: "Mọi trang có cần canonical tự trỏ?",
        a: "Có, đó là mặc định được khuyến nghị. Kể cả trang duy nhất cũng nên tuyên bố URL của chính nó là canonical để phòng các biến thể tham số, gạch cuối hay chữ hoa mà bạn chưa hề nhận ra.",
      },
      {
        q: "Canonical, noindex hay redirect — chọn cái nào?",
        a: "Dùng redirect 301 khi bản trùng nên đưa người dùng đi nơi khác, noindex khi nó phải truy cập được nhưng nằm ngoài kết quả, và canonical khi cả hai phiên bản phải cùng sống và được thu thập.",
      },
    ],
  },
  "hreflang-generator": {
    name: "Trình tạo hreflang",
    tagline:
      "Dựng cụm liên kết hreflang hoàn chỉnh — một liên kết mỗi ngôn ngữ cùng x-default — từ các URL bản dịch của bạn, nhất quán và song hướng.",
    intro: [
      "hreflang cho công cụ tìm kiếm biết URL nào phục vụ người đọc từng ngôn ngữ, ngăn các bản dịch gần trùng nhau cạnh tranh lẫn nhau. Các cụm là song hướng: mọi trang bản địa hóa phải trả về trọn bộ, kể cả tham chiếu về chính nó.",
      "Nhập URL của từng phiên bản ngôn ngữ và bộ tạo xuất ra trọn cụm <link rel=\"alternate\"> cùng x-default, vốn nên trỏ tới trang chọn ngôn ngữ hay trang chủ ngôn ngữ mặc định của bạn.",
    ],
    steps: [
      "Dán URL tuyệt đối của từng bản dịch; bỏ trống những ngôn ngữ bạn chưa có.",
      "Đặt URL x-default — trang chọn ngôn ngữ hay trang chủ mặc định của bạn.",
      "Sao chép cụm vào <head> của mọi trang trong bộ.",
    ],
    faqs: [
      {
        q: "Mọi trang có cần trọn bộ hreflang?",
        a: "Có. Các cụm phải đối ứng: trang A liệt kê trang B và chính nó, và B liệt kê A và chính nó. Cụm thiếu thành viên bị bỏ qua một phần và công sức của bạn đổ bể.",
      },
      {
        q: "Nên dùng zh hay zh-Hans?",
        a: "Ưu tiên zh-Hans cho giản thể và zh-Hant cho phồn thể; chỉ có zh là chưa xác định hệ chữ. Phụ khu vực như pt-BR là tùy chọn — nhắm ngôn ngữ trước và thêm khu vực chỉ khi nội dung thực sự khác, như pt-BR khác pt-PT.",
      },
      {
        q: "hreflang có thay thế thẻ canonical?",
        a: "Không. Mỗi phiên bản ngôn ngữ vẫn cần canonical tự trỏ riêng. hreflang chọn giữa các trang dịch tương đương; canonical xử lý bản trùng trong cùng một ngôn ngữ.",
      },
    ],
  },
  "keyword-density-checker": {
    name: "Kiểm tra mật độ từ khóa",
    tagline:
      "Đếm cụm từ khóa 1–3 từ và mật độ của chúng, kèm danh sách stopword dựng sẵn cho tiếng Anh, Trung, Nhật, Tây Ban Nha và Bồ Đào Nha.",
    intro: [
      "Mật độ từ khóa là tỉ lệ số lần một cụm xuất hiện trên tổng số từ của trang. Bộ kiểm tra này tách token văn bản, gỡ stopwords theo ngôn ngữ và báo số lần cùng mật độ cho cụm một, hai và ba từ — trực tiếp, ngay khi bạn dán hay sửa.",
      "Dùng để xác nhận trang thực sự nói về thứ bạn muốn xếp hạng, chứ không phải đuổi theo một tỉ lệ thần thánh nào. Nội dung đọc tự nhiên mà vẫn phủ đúng chủ đề thắng mọi công thức cứng nhắc.",
    ],
    steps: [
      "Dán nội dung trang hay bản nháp vào ô nhập.",
      "Chọn ngôn ngữ nội dung và có loại stopwords không.",
      "Đọc số lần và mật độ cho cụm 1–3 từ, hay tìm kiếm để kiểm tra một từ cụ thể.",
    ],
    faqs: [
      {
        q: "Nên nhắm mật độ từ khóa bao nhiêu?",
        a: "Không có mục tiêu nào cả. Hệ xếp hạng hiện đại dùng embedding và mô hình chủ đề, không phải ngưỡng mật độ. Nếu các cụm nổi bật phản ánh chủ đề trang bằng ngôn ngữ tự nhiên — khoảng 1–2% cho từ chính — là bạn ổn.",
      },
      {
        q: "Stopwords có bị gỡ trước khi đếm?",
        a: "Chỉ khi bạn bật. Gỡ chúng biến “hotel in london” thành “hotel london” như một bigram — thường là cách người ta thật sự tìm kiếm. Hãy so sánh cả hai chế độ trước khi quyết.",
      },
      {
        q: "Trung và Nhật được đếm thế nào?",
        a: "Không có bộ tách từ thật, văn bản CJK được đếm theo ký tự cho token đơn và theo cặp ký tự cho cụm hai từ — ước lượng tốt để phát hiện từ bị lạm dụng, không phải phân tích ngôn ngữ học.",
      },
    ],
  },
  "meta-tag-generator": {
    name: "Trình tạo thẻ Meta",
    tagline:
      "Tạo thẻ meta title, description, keywords, robots và viewport với HTML trực tiếp dán thẳng vào <head> của bạn.",
    intro: [
      "Thẻ meta là thứ crawler đọc đầu tiên: thẻ title là tín hiệu xếp hạng, và meta description trở thành snippet của bạn mỗi khi Google không tự viết lại. Bộ tạo này dựng một bộ hợp lệ, sạch sẽ — title, description, keywords, robots, viewport, author cùng liên kết canonical tùy chọn — ngay khi bạn gõ.",
      "Mọi giá trị thuộc tính được escape HTML nên dấu ngoặc và dấu & không thể phá vỡ markup của bạn. Sao chép khối vào phần head của template hay CMS rồi điều chỉnh cho từng trang.",
    ],
    steps: [
      "Điền tiêu đề trang (nhắm 50–60 ký tự) và meta description (tới ~160).",
      "Đặt robots, viewport và author khi cần — trường bỏ trống sẽ không xuất hiện trong kết quả.",
      "Sao chép đoạn <head> đã tạo và dán vào template trang của bạn.",
    ],
    faqs: [
      {
        q: "Thẻ title nên dài bao nhiêu?",
        a: "Nhắm khoảng 50–60 ký tự, cỡ 580 điểm ảnh ở cỡ font Google hiển thị. Tiêu đề dài hơn bị cắt bằng dấu ba chấm trong kết quả — công cụ xem trước SERP cho thấy chính xác chỗ cắt.",
      },
      {
        q: "Meta keywords còn hữu ích không?",
        a: "Google đã bỏ qua thẻ meta keywords từ 2009, và Bing có thể coi nó là tín hiệu spam. Chỉ điền khi một công cụ ngách hay nền tảng tìm kiếm nội bộ yêu cầu rõ ràng.",
      },
      {
        q: "Thẻ meta robots kiểm soát gì?",
        a: "index/noindex quyết định trang có được xuất hiện trong kết quả; follow/nofollow quyết định liên kết có truyền sức mạnh hay không. Nó phải nằm trên chính trang — robots.txt không thể noindex bất cứ thứ gì.",
      },
    ],
  },
  "open-graph-generator": {
    name: "Trình tạo Open Graph",
    tagline:
      "Dựng trọn bộ thẻ meta og: và twitter: và xem card chia sẻ cập nhật trực tiếp trước khi bạn dán bất cứ gì.",
    intro: [
      "Khi liên kết của bạn được chia sẻ trên X, Facebook, LinkedIn, Slack hay iMessage, card xem trước được dựng gần như hoàn toàn từ thẻ Open Graph, với thẻ Twitter card lấp phần còn lại. Bộ tạo này xuất cả hai namespace: og:title, og:type, og:url, og:image, og:image:alt, og:site_name, og:description và og:locale, cùng twitter:card, twitter:site và twitter:creator.",
      "Đa số nền tảng dùng og: làm phương án dự phòng khi thiếu thẻ twitter:, nên phần bổ sung chỉ cần ở nơi chúng khác nhau. Bản xem trước trực tiếp mô phỏng cách card ảnh lớn hay summary hiển thị.",
    ],
    steps: [
      "Nhập tiêu đề trang, mô tả và URL canonical.",
      "Thêm URL ảnh chia sẻ (1200 × 630 px chạy được mọi nơi) và chọn kiểu card.",
      "Sao chép các thẻ vào <head> và kiểm tra card xem trước.",
    ],
    faqs: [
      {
        q: "og:image nên dùng kích thước nào?",
        a: "1200 × 630 điểm ảnh (1.91:1) là mặc định an toàn trên Facebook, X và LinkedIn. Giữ file dưới 8 MB, dùng URL tuyệt đối, và luôn thêm og:image:alt để dễ tiếp cận.",
      },
      {
        q: "Có cần cả thẻ og: và twitter:?",
        a: "twitter:title, twitter:description và twitter:image tự quay về og: tương ứng. Trên bộ og:, bạn chỉ cần twitter:card (summary hay summary_large_image), twitter:site và tùy chọn twitter:creator.",
      },
      {
        q: "Chọn og:type nào?",
        a: "Dùng website cho trang chủ và trang tổng quát, article cho tin tức và bài blog (thêm article:published_time nếu có thể), và product cho trang chi tiết thương mại điện tử. Kiểu này ảnh hưởng cách một số nền tảng phân loại liên kết.",
      },
    ],
  },
  "robots-txt-generator": {
    name: "Trình tạo robots.txt",
    tagline:
      "Dựng robots.txt với danh sách chặn hay cho phép bot AI, quy tắc theo từng bot, crawl-delay và chỉ thị sitemap — rồi sao chép hay tải xuống.",
    intro: [
      "robots.txt kiểm soát quyền truy cập của crawler trước khi trang nào được tải. Ngoài quy tắc User-agent: * kinh điển, giờ đây bạn quyết định từng bot AI: cho phép crawler gần tìm kiếm như OAI-SearchBot và PerplexityBot, chặn crawler huấn luyện như GPTBot, ClaudeBot, Google-Extended, CCBot và Bytespider, hay trộn chính sách riêng của bạn.",
      "Bộ tạo gộp các user-agent dùng chung quy tắc, thêm crawl-delay ở những nơi được tôn trọng, và nối chỉ thị sitemap của bạn. Sao chép file về thư mục gốc tên /robots.txt và xác minh trong báo cáo robots của Search Console.",
    ],
    steps: [
      "Chọn một preset: cho phép tất cả, chặn bot huấn luyện AI hay chặn hết.",
      "Tinh chỉnh từng crawler AI bằng Allow, Block hay không quy tắc, và thêm đường dẫn Disallow cho User-agent: *.",
      "Thêm URL sitemap, rồi sao chép hay tải file về thư mục gốc trang web.",
    ],
    faqs: [
      {
        q: "robots.txt có phải biện pháp bảo mật?",
        a: "Không. Nó chỉ mang tính khuyến nghị: crawler tuân thủ sẽ nghe, nhưng ai cũng đọc được nó — và nó quảng cáo các đường dẫn riêng của bạn. Bảo vệ khu vực nhạy cảm bằng xác thực; đừng bao giờ trông vào Disallow để bảo mật.",
      },
      {
        q: "Bot AI có thực sự tôn trọng robots.txt?",
        a: "Những bot được ghi nhận chính thức — GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot — tuyên bố hỗ trợ robots.txt, nhưng việc tuân thủ là tự nguyện và khác nhau theo nhà vận hành. Muốn đảm bảo chắc chắn, hãy chặn ở tầng CDN hay tường lửa.",
      },
      {
        q: "Vì sao trang tôi vẫn được lập chỉ mục sau khi Disallow?",
        a: "Chặn thu thập không phải chặn lập chỉ mục: nếu trang khác liên kết tới URL đó, Google vẫn có thể lập chỉ mục mà không có nội dung. Muốn gỡ trang khỏi kết quả, hãy cho phép thu thập và dùng thẻ meta noindex thay thế.",
      },
    ],
  },
  "schema-markup-generator": {
    name: "Trình tạo Schema Markup",
    tagline:
      "Tạo dữ liệu có cấu trúc JSON-LD hợp lệ cho Organization, LocalBusiness, Product, Article, FAQPage và HowTo — đã escape, sẵn sàng dán.",
    intro: [
      "Dữ liệu có cấu trúc giúp công cụ tìm kiếm hiểu các thực thể trên trang: ai phát hành, sản phẩm giá bao nhiêu, trang trả lời những câu hỏi nào. Bộ tạo dựng JSON-LD cho sáu loại schema.org dùng nhiều nhất, bỏ qua trường trống, và escape kết quả để an toàn bên trong thẻ <script>.",
      "Chọn loại khớp với trang, điền các trường, rồi dán khối vào head hay body. Luôn chạy qua trình kiểm tra rich results trước khi triển khai — markup phân tích được nhưng vi phạm guideline có thể bị áp biện pháp thủ công.",
    ],
    steps: [
      "Chọn loại schema khớp với trang.",
      "Điền các trường — với FAQPage và HowTo bạn có thể thêm bớt hàng câu hỏi hay bước.",
      "Sao chép khối JSON-LD vào trang, rồi chạy qua Rich Results Test của Google.",
    ],
    faqs: [
      {
        q: "Rich results FAQ còn tồn tại không?",
        a: "Google giờ gần như chỉ hiện rich results FAQ cho các trang chính phủ và y tế nổi tiếng. Markup vẫn đáng công bố: các answer engine và AI Overviews đọc dữ liệu FAQPage khi tìm câu trả lời, và các công cụ khác vẫn tôn trọng nó.",
      },
      {
        q: "JSON-LD hay Microdata — chọn định dạng nào?",
        a: "JSON-LD là định dạng Google khuyến nghị: một khối script, không đụng tới các phần tử HTML, dễ tạo và bảo trì hơn. Microdata đạt kết quả tương tự nhưng trộn vào markup của bạn.",
      },
      {
        q: "Dữ liệu có cấu trúc hợp lệ có bảo đảm rich results?",
        a: "Không. Hợp lệ chỉ khiến trang đủ điều kiện cho một tính năng; Google quyết định theo từng truy vấn và từng bề mặt có hiển thị hay không. Đừng bao giờ hứa sao hay breadcrumb trong báo cáo chỉ dựa trên markup.",
      },
    ],
  },
  "serp-preview": {
    name: "Xem trước SERP",
    tagline:
      "Xem trước snippet Google trên desktop và mobile với giới hạn cắt theo điểm ảnh và thước đo độ dài cho title lẫn description.",
    intro: [
      "Google cắt tiêu đề và mô tả theo chiều rộng điểm ảnh đo được, không phải số ký tự — tiêu đề đầy chữ rộng bị cắt sớm hơn cùng số chữ cái hẹp. Bản xem trước này đo văn bản của bạn đúng cách trang kết quả làm và cắt đúng chỗ Google cắt.",
      "Chuyển qua lại giữa ngân sách điểm ảnh desktop và mobile, theo dõi thước đo, và chỉnh văn bản cho tới khi trọn thông điệp sống sót qua lưỡi dao.",
    ],
    steps: [
      "Nhập thẻ title, meta description và URL trang.",
      "Chuyển giữa desktop và mobile để so sánh điểm cắt.",
      "Chỉnh văn bản cho tới khi title và description vừa trong ngân sách điểm ảnh.",
    ],
    faqs: [
      {
        q: "Title dài bao nhiêu thì Google cắt?",
        a: "Khoảng 580–600 điểm ảnh trên desktop, thường 50–60 ký tự; mobile cho phép rộng hơn một chút. Đo điểm ảnh mới là giới hạn thật — số ký tự chỉ là hướng dẫn thô vì các chữ có độ rộng khác nhau.",
      },
      {
        q: "Google luôn hiển thị meta description của tôi?",
        a: "Không. Google viết lại mô tả cho phần lớn các truy vấn, thường để khớp từ được tìm. Mô tả chính xác, cụ thể làm tăng xác suất bản của bạn được dùng nguyên văn.",
      },
      {
        q: "Vì sao Google thay title của tôi?",
        a: "Khi nó nghĩ chuỗi khác khớp truy vấn hơn, Google có thể thay bằng H1, anchor text của liên kết nội bộ hay tên trang. Bản xem trước cho thấy kịch bản tốt nhất: các thẻ của chính bạn, không sửa.",
      },
    ],
  },
  "sitemap-generator": {
    name: "Trình tạo XML Sitemap",
    tagline:
      "Dán danh sách URL và nhận sitemap.xml hợp lệ với lastmod, changefreq và priority theo từng phần — khử trùng lặp, sẵn sàng nộp.",
    intro: [
      "Sitemap cho công cụ tìm kiếm biết URL nào tồn tại và lần cuối thay đổi khi nào. Dán danh sách của bạn — từ bản xuất crawler, CMS hay bảng tính — và bộ tạo khử trùng lặp, nhóm theo đoạn path đầu tiên, cho bạn đặt changefreq và priority theo từng nhóm trong khi file vẫn đúng giao thức.",
      "XML theo giao thức sitemaps.org 0.9 mà Google, Bing và Yandex đều nhận. Tải file về, host tại /sitemap.xml và tham chiếu trong robots.txt hay nộp trực tiếp trong Search Console.",
    ],
    steps: [
      "Dán mỗi dòng một URL tuyệt đối — tới giới hạn 50.000 URL / 50 MB mỗi file.",
      "Đặt cách xử lý lastmod và chỉnh changefreq cùng priority theo từng phần khi hợp lý.",
      "Tải sitemap.xml, đưa lên thư mục gốc tên miền và nộp trong Search Console.",
    ],
    faqs: [
      {
        q: "changefreq và priority còn quan trọng?",
        a: "Google bỏ qua cả hai và dùng lịch riêng của mình; lastmod là thẻ duy nhất có tác dụng được ghi nhận, và chỉ khi nó chính xác. Đặt các thẻ khác nếu muốn file đầy đủ, nhưng hãy dồn công sức cho giá trị lastmod trung thực.",
      },
      {
        q: "Nên dùng giá trị lastmod nào?",
        a: "Ngày nội dung trang thay đổi lần cuối một cách có ý nghĩa, theo định dạng W3C Datetime (YYYY-MM-DD là đủ). Sao chép ngày hôm nay lên mọi URL sẽ dạy Google nghi ngờ lastmod của bạn.",
      },
      {
        q: "Sitemap lớn được bao nhiêu?",
        a: "50.000 URL hay 50 MB chưa nén mỗi file. Vượt mức đó, hãy tách thành nhiều sitemap và liệt kê trong một file sitemap index, rồi nộp file index.",
      },
    ],
  },
  "utm-builder": {
    name: "Trình tạo liên kết UTM",
    tagline:
      "Thêm utm_source, medium, campaign, term và content vào URL bất kỳ và nhận liên kết tracking mã hóa đúng chuẩn để sao chép hay chia sẻ.",
    intro: [
      "Tham số UTM là query string mà các nền tảng analytics đọc để quy kết lưu lượng: source, medium, campaign, term và content. Bộ tạo này nối chúng vào URL của bạn với mã hóa phần trăm đúng chuẩn, nên khoảng trắng và ký tự đặc biệt sống sót qua nền tảng quảng cáo, mã QR và trình gửi mail.",
      "Hãy thống nhất quy ước đặt tên trước khi tạo liên kết — chữ thường, gạch ngang, không ngày tháng trong tên campaign — nếu không báo cáo của bạn sẽ vỡ thành các campaign gần trùng nhau.",
    ],
    steps: [
      "Dán URL đích.",
      "Điền source và medium trước, rồi campaign và các trường tùy chọn term/content.",
      "Sao chép URL đã gắn thẻ vào quảng cáo, newsletter hay bài đăng mạng xã hội.",
    ],
    faqs: [
      {
        q: "Tham số UTM nào là bắt buộc?",
        a: "utm_source và utm_medium là hai thứ công cụ analytics dựa vào: source nêu nguồn giới thiệu, medium nêu kênh (cpc, email, social). utm_campaign được khuyến nghị mạnh; utm_id, utm_term và utm_content là tùy chọn.",
      },
      {
        q: "Tham số UTM có hại cho SEO?",
        a: "Không nếu xử lý đúng. Crawler có thể coi URL gắn thẻ là bản trùng — chính là điều canonical tự trỏ giải quyết — vì thế bộ tạo canonical kết hợp rất tốt với công cụ này.",
      },
      {
        q: "Chữ hoa trong giá trị UTM có ý nghĩa?",
        a: "Có — utm_campaign=Spring và utm_campaign=spring được tính là hai campaign trong đa số công cụ analytics. Chuẩn hóa chữ thường và báo cáo của bạn sẽ luôn sạch.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Security                                                            */
  /* ------------------------------------------------------------------ */
  "dns-lookup": {
    name: "DNS Lookup",
    tagline:
      "Tra record A, AAAA, MX, TXT, NS và CNAME cho tên miền bất kỳ qua DNS-over-HTTPS trong bảng sạch sẽ — không cần terminal hay lệnh dig.",
    intro: [
      "Record DNS cho biết tên miền trỏ về đâu, cách nó gửi email và cách chứng minh quyền sở hữu. Công cụ này phân giải mọi loại record qua DNS-over-HTTPS (DoH) — cùng kênh mã hóa mà trình duyệt hiện đại dùng — và xếp kết quả thành bảng dễ đọc.",
      "Nó chạy trên resolver công cộng miễn phí của Google nên chẳng có gì phải cài và không cần API key. Tiện để kiểm tra lan truyền sau khi đổi cấu hình, xác minh record TXT SPF/DKIM/DMARC, hay debug vì sao mail tới một tên miền bị bật lại.",
    ],
    steps: [
      "Nhập tên miền (example.com, không cần http://) và chọn loại record.",
      "Bấm Tra cứu; truy vấn đi qua DoH mã hóa tới resolver công cộng.",
      "Đọc bảng: mỗi hàng hiển thị loại record, TTL và giá trị — IP cho A/AAAA, hay máy thư với độ ưu tiên cho MX.",
      "Chuyển loại record để thấy bức tranh trọn: MX cho mail, TXT cho SPF/DKIM, NS cho ai vận hành DNS.",
    ],
    faqs: [
      {
        q: "Các loại record chính dùng để làm gì?",
        a: "A ánh xạ tên sang địa chỉ IPv4, AAAA sang IPv6. MX liệt kê máy thư và độ ưu tiên. TXT chứa văn bản tự do — thường là chính sách SPF, DKIM và DMARC. NS nêu nameserver có thẩm quyền. CNAME là bí danh trỏ tên này sang tên khác. Mỗi loại trả lời một câu hỏi khác nhau về cùng tên miền.",
      },
      {
        q: "Những gì được gửi qua mạng?",
        a: "Tên miền và loại record trong một truy vấn DNS-over-HTTPS tới dns.google, mã hóa như mọi request HTTPS. Không có thông tin nào về bạn được thêm vào, và không dính tới API key hay tài khoản.",
      },
      {
        q: "Vì sao thỉnh thoảng tôi thấy hàng CNAME dù hỏi A?",
        a: "Resolver trả về cả chuỗi đầy đủ: nếu www.example.com là CNAME tới example.com, truy vấn A trả về bí danh cộng record A cuối. Các hàng thừa cho thấy chính xác cách tên được phân giải.",
      },
    ],
  },
  "email-validator": {
    name: "Kiểm tra Email",
    tagline:
      "Kiểm tra định dạng email ngay cục bộ và xác minh tên miền nhận được thư bằng tra cứu MX trực tiếp, kèm phát hiện lỗi gõ — miễn phí, tức thì, không đăng ký.",
    intro: [
      "Địa chỉ đúng cú pháp vẫn có thể bật lại nếu tên miền không có máy thư. Bộ kiểm tra này trước hết soát định dạng hoàn toàn trong trình duyệt — độ dài, ký tự, vị trí dấu chấm và nhãn tên miền — rồi truy vấn DNS trực tiếp qua HTTPS xem tên miền có thật sự công bố record MX (mail exchange) không.",
      "Nó còn đối chiếu tên miền với danh sách các nhà cung cấp phổ biến nhất và cảnh báo lỗi gõ như gmial.com. Chỉ phần tên miền được gửi qua mạng; phần trước dấu @ không bao giờ rời khỏi trình duyệt.",
    ],
    steps: [
      "Gõ hay dán địa chỉ vào ô rồi bấm Kiểm tra.",
      "Đọc hàng Cú pháp: nó bắt local part sai, hai dấu chấm liền và tên miền không hợp lệ mà không cần mạng.",
      "Xem hàng Máy thư để có bằng chứng tên miền nhận được email — vài tên miền không có MX vẫn nhận thư qua record A và công cụ cũng ghi chú điều đó.",
      "Nếu có gợi ý lỗi gõ, hãy sửa tên miền và kiểm tra lại.",
    ],
    faqs: [
      {
        q: "Có kiểm tra được hộp thư có thật tồn tại?",
        a: "Không. Máy thư nói chung không tiết lộ một hộp thư cụ thể có thật hay không (và dò hỏi sẽ là xâm phạm). Công cụ xác minh định dạng và rằng tên miền được cấu hình để nhận thư — điều phần lớn quy trình kiểm tra thực sự cần. Hộp thư đầy hay bỏ hoang vẫn có thể bật lại.",
      },
      {
        q: "Chính xác những gì được gửi qua mạng?",
        a: "Chỉ tên miền — phần sau dấu @ — trong một truy vấn DNS tới resolver công cộng của Google (dns.google) qua HTTPS. Địa chỉ đầy đủ và mọi thứ trước dấu @ ở lại trình duyệt của bạn.",
      },
      {
        q: "Vì sao địa chỉ hợp lệ lại trượt kiểm tra MX?",
        a: "Vài tên miền không công bố MX mà dựa vào record A (định tuyến ngầm); công cụ nói rõ khi gặp trường hợp đó. Có tên công bố null MX, tức “không nhận thư ở đây”. Tên miền doanh nghiệp hay mới tạo cũng có thể chưa có trong cache resolver công cộng một thời gian ngắn — thử lại sau một phút.",
      },
    ],
  },
  "ip-lookup": {
    name: "IP Lookup",
    tagline:
      "Tìm quốc gia, thành phố, ISP và ASN của địa chỉ IP bất kỳ trong vài giây — hay kiểm tra IP của chính bạn — với API miễn phí không cần key, ngay trong trình duyệt.",
    intro: [
      "Mọi thiết bị trên internet đều mang một địa chỉ IP hé lộ nó ở đâu và ai định tuyến. Nhập địa chỉ IPv4 hay IPv6 bất kỳ để xem quốc gia và vùng, thành phố, nhà mạng (ISP), tổ chức và số hệ tự trị (ASN), cùng múi giờ và tọa độ xấp xỉ.",
      "Dữ liệu đến từ cơ sở dữ liệu ipwho.is miễn phí, không cần key, qua HTTPS; không đăng ký và không quota phải canh. Một cú chạm kiểm tra kết nối của chính bạn — tiện để xác nhận VPN thực sự đổi được vị trí hiển thị.",
    ],
    steps: [
      "Dán IP vào ô, hay bấm Dùng IP của tôi để soi kết nối của chính mình.",
      "Bấm Tra cứu; địa chỉ được gửi tới API ipwho.is qua HTTPS.",
      "Đọc kết quả: vị trí trước, rồi chi tiết mạng như ISP, tổ chức và ASN.",
      "So kết quả IP của bạn trước và sau khi đổi máy chủ VPN để xác nhận thay đổi có hiệu lực.",
    ],
    faqs: [
      {
        q: "Vị trí chính xác tới đâu?",
        a: "Quốc gia và vùng thường đúng; thành phố và tọa độ là ước lượng dựa trên nơi ISP đăng ký khối địa chỉ, nên địa chỉ di động và VPN có thể lệch hàng chục cây số. Hãy coi kết quả là thông tin mức mạng, không phải địa chỉ của một người.",
      },
      {
        q: "ASN cho tôi biết gì?",
        a: "Số hệ tự trị nhận diện nhà mạng sở hữu khối IP — ISP, công ty hosting hay tập đoàn lớn. Hai IP cùng ASN gần như chắc chắn thuộc cùng một mạng — hữu ích để nhận diện dải hosting và báo cáo lạm dụng.",
      },
      {
        q: "Những gì được gửi qua mạng?",
        a: "Chỉ địa chỉ IP bạn muốn tra cứu, trong một request HTTPS tới ipwho.is. Tra IP của chính bạn đương nhiên tiết lộ địa chỉ cho API đó — chẳng khác gì bất kỳ dịch vụ định vị nào sẽ thấy.",
      },
    ],
  },
  "password-generator": {
    name: "Trình tạo mật khẩu",
    tagline:
      "Tạo mật khẩu và cụm mật khẩu mạnh ngay trong trình duyệt với ước lượng entropy trực tiếp — ngẫu nhiên cấp mật mã, không gửi đi, không lưu lại.",
    intro: [
      "Mật khẩu yếu và dùng lại là nguyên nhân chính của các vụ chiếm tài khoản. Bộ tạo này dựng mật khẩu bằng bộ sinh ngẫu nhiên mật mã của trình duyệt (crypto.getRandomValues) — cùng nguồn dùng cho khóa mã hóa — nên mỗi ký tự ngẫu nhiên đều và không thể đoán.",
      "Chọn mật khẩu ngẫu nhiên kinh điển hay passphrase dễ nhớ dựng từ danh sách 256 từ, chỉnh độ dài và bộ ký tự, và theo dõi entropy hiển thị bằng bit. Mọi thứ chạy cục bộ: mật khẩu không bao giờ được truyền, ghi log hay lưu.",
    ],
    steps: [
      "Chọn Password cho ký tự ngẫu nhiên hay Passphrase cho các từ dễ gõ.",
      "Chỉnh thanh độ dài và bật tắt bộ ký tự; loại ký tự giống nhau nếu bạn sẽ đọc mật khẩu thành tiếng hay gõ trên điện thoại.",
      "Xem chỉ số entropy — 80 bit trở lên là xuất sắc cho bất kỳ tài khoản nào.",
      "Bấm nút sao chép và dán kết quả thẳng vào form đăng ký hay đổi mật khẩu.",
    ],
    faqs: [
      {
        q: "Độ dài hay độ phức tạp quan trọng hơn?",
        a: "Độ dài. Entropy tăng theo từng ký tự thêm vào — xấp xỉ log2 của kích thước bộ ký tự cho mỗi ký tự. Mật khẩu ngẫu nhiên 16 ký tự trên bộ 70 ký tự có cỡ 98 bit entropy, vượt xa mật khẩu ngắn nhét đủ mọi loại ký hiệu. Passphrase 5 từ ngẫu nhiên trở lên cũng thắng phần lớn mật khẩu 8 ký tự.",
      },
      {
        q: "Các mật khẩu này có thực sự ngẫu nhiên?",
        a: "Có. Chúng đến từ crypto.getRandomValues — nguồn ngẫu nhiên an toàn mật mã của trình duyệt, không phải Math.random(). Tùy chọn loại ký tự giống nhau chỉ bỏ l, I, 1, O và 0; nó không bao giờ làm giảm tính ngẫu nhiên của phần còn lại.",
      },
      {
        q: "Có thể khôi phục mật khẩu tôi tạo ở đây?",
        a: "Không. Việc tạo diễn ra hoàn toàn trong bộ nhớ trình duyệt. Không có gì được tải lên, ghi log hay lưu — tải lại trang là mật khẩu biến mất mãi mãi, nên hãy lưu ngay vào trình quản lý mật khẩu.",
      },
    ],
  },
  "password-strength": {
    name: "Kiểm tra độ mạnh mật khẩu",
    tagline:
      "Xem mật khẩu thực sự mạnh đến đâu: chấm điểm zxcvbn, ước lượng thời gian bẻ khóa thực tế và gợi ý cụ thể — tất cả tính cục bộ, không bao giờ tải lên.",
    intro: [
      "Đa số thanh đo chỉ đếm loại ký tự. Bộ kiểm tra này chạy thuật toán zxcvbn — xây từ dữ liệu rò rỉ thật và phân tích mẫu — bắt được các chuỗi phím bấm liền kề, khối lặp, ngày tháng, thay thế l33t và mật khẩu xuất hiện trong các vụ rò rỉ đã biết.",
      "Bạn nhận điểm 0–4, thời gian bẻ khóa ước tính dưới ba kịch bản tấn công, và gợi ý cụ thể. Mọi thứ được tính trong trình duyệt: mật khẩu bạn gõ không bao giờ rời khỏi thiết bị.",
    ],
    steps: [
      "Gõ hay dán mật khẩu vào ô — dùng Hiện nếu muốn đọc nó.",
      "Xem thanh điểm chuyển từ Rất yếu tới Rất mạnh khi bạn sửa.",
      "Đọc bảng thời gian bẻ khóa để hiểu nó chống lại gì: đoán online bị giới hạn, tấn công offline với hash chậm và hash nhanh.",
      "Áp dụng các gợi ý — thường thêm vài từ ngẫu nhiên là thắng nhanh nhất.",
    ],
    faqs: [
      {
        q: "Ba kịch bản thời gian bẻ khóa nghĩa là gì?",
        a: "Chúng mô hình hóa các kẻ tấn công khác nhau. Online bị giới hạn (100 lần/giờ) là form đăng nhập giới hạn số lần thử. Offline hash chậm giả định cơ sở dữ liệu hash bằng bcrypt và bẻ 10.000 lần/giây. Offline hash nhanh giả định MD5/SHA-1 yếu hay không salt bị bẻ trên GPU với hàng tỷ lần/giây — trường hợp xấu nhất cho mọi mật khẩu dùng lại.",
      },
      {
        q: "Vì sao “Tr0ub4dor&3” chấm điểm tệ dù trông phức tạp?",
        a: "Vì các phép thay như 0 cho o và 3 cho e là thứ từ điển bẻ khóa thử đầu tiên. zxcvbn mô hình hóa các quy tắc l33t này nên nó chấm nền mẫu — “troubador” cộng đồ trang trí — thay vì bị đánh lừa bởi ký hiệu.",
      },
      {
        q: "Mật khẩu của tôi có được gửi đi đâu?",
        a: "Không. Thư viện và từ điển zxcvbn tải vào trình duyệt của bạn và mọi phép tính chạy cục bộ. Không request mạng nào mang theo đầu vào của bạn.",
      },
    ],
  },
  "random-number": {
    name: "Trình tạo số ngẫu nhiên",
    tagline:
      "Tạo số ngẫu nhiên thật từ bất kỳ khoảng nào — lẻ, hàng loạt, bốc trúng không trùng kiểu xổ số — bằng bộ sinh ngẫu nhiên mật mã của trình duyệt.",
    intro: [
      "Math.random() ổn cho game nhưng có thiên lệch và đoán được. Bộ tạo này rút từ crypto.getRandomValues — nguồn ngẫu nhiên mật mã của trình duyệt — với lấy mẫu từ chối khử thiên lệch modulo nên mọi số trong khoảng đều có xác suất bằng nhau.",
      "Bốc một số giữa hai cận, cả một lô, hay bốc không trùng cho bốc thăm và trao giải; sắp kết quả tăng dần hay giữ thứ tự bốc. Công cụ còn hiển thị tổng entropy của lần bốc bằng bit để bạn chứng minh một cuộc quay là công bằng.",
    ],
    steps: [
      "Đặt giá trị nhỏ nhất và lớn nhất (bao gồm cả hai cận, số âm cũng được).",
      "Chọn số lượng cần bốc và bật bốc không trùng nếu trùng sẽ phá hỏng bốc thăm.",
      "Bật sắp tăng dần cho kết quả có thứ tự, hay để tắt để giữ thứ tự bốc.",
      "Sao chép danh sách thẳng vào bảng tính hay thông báo trúng thưởng của bạn.",
    ],
    faqs: [
      {
        q: "Có phù hợp cho bốc thăm và xổ số?",
        a: "Có. Các số đến từ bộ sinh ngẫu nhiên mật mã của trình duyệt kèm bước lấy mẫu từ chối không thiên lệch nên mỗi giá trị trong khoảng có cùng xác suất. Chỉ số entropy cho thấy chính xác có bao nhiêu tính ngẫu nhiên trong lần bốc.",
      },
      {
        q: "“Không trùng lặp” làm gì khi khoảng quá nhỏ?",
        a: "Nó chuyển sang bốc không hoàn lại — như rút bóng đánh số từ trong bát. Nếu bạn xin nhiều số không trùng hơn số lượng trong khoảng, công cụ giải thích xung đột thay vì trả kết quả thiên lệch.",
      },
      {
        q: "Các số có được lưu ở đâu không?",
        a: "Không. Mọi thứ được tính trong bộ nhớ trình duyệt từ crypto.getRandomValues; tải lại trang là kết quả biến mất, và không bao giờ có gì được tải lên.",
      },
    ],
  },
  "totp-generator": {
    name: "Trình tạo TOTP",
    tagline:
      "Tạo mã 2FA offline từ secret TOTP bất kỳ — RFC 6238, 6 hay 8 chữ số, đếm ngược 30 giây trực tiếp. Secret không bao giờ rời khỏi trình duyệt.",
    intro: [
      "Mã xác thực không cần app trên điện thoại. Dán secret base32 (hay cả liên kết otpauth:// từ authenticator cũ) và công cụ tính cùng loại mã 6 hay 8 chữ số xoay vòng như mọi authenticator RFC 6238, kèm đếm ngược trực tiếp tới mã tiếp theo.",
      "Mọi thứ được tính cục bộ bằng HMAC của WebCrypto — không một lời gọi mạng nào. Secret chỉ nằm trong bộ nhớ trình duyệt, nên mất điện thoại không đồng nghĩa mất yếu tố thứ hai.",
    ],
    steps: [
      "Sao chép secret base32 từ trang thiết lập 2FA của dịch vụ (hay dán liên kết otpauth:// của nó).",
      "Khớp các thiết lập dịch vụ hiển thị: 6 hay 8 chữ số, chu kỳ 30 hay 60 giây, SHA-1 trừ khi được bảo khác.",
      "Gõ mã hiện tại vào dịch vụ trước khi đếm ngược kết thúc — hay sao chép một cú bấm.",
      "Giữ tab mở cho các lần đăng nhập tiếp theo; mã tự làm mới theo chu kỳ.",
    ],
    faqs: [
      {
        q: "Authenticator offline có an toàn hơn mã SMS?",
        a: "Có, theo hai cách. Mã TOTP được tính trên thiết bị của bạn và không bao giờ đi qua mạng điện thoại nên kẻ SIM-swap không có gì để chặn. Chúng còn hết hạn sau mỗi 30 giây và đòi hỏi phải có chính secret — thứ không bao giờ xuất hiện trong bất kỳ tin nhắn nào.",
      },
      {
        q: "Secret của tôi được lưu ở đâu?",
        a: "Không lưu đâu cả. Nó nằm trong một biến trong bộ nhớ tab này và được WebCrypto dùng để ký bộ đếm thời gian. Không gì được ghi vào localStorage, cookie hay máy chủ nào — đóng tab là mất.",
      },
      {
        q: "Vì sao mã của tôi không khớp?",
        a: "Các nguyên nhân phổ biến nhất: sai thuật toán (đa số dịch vụ dùng SHA-1), sai chu kỳ, hay đồng hồ thiết bị lệch quá vài giây. So ba ô chọn này với trang thiết lập của dịch vụ, và đồng bộ lại đồng hồ hệ thống.",
      },
    ],
  },
  "whois-lookup": {
    name: "WHOIS Lookup",
    tagline:
      "Tra dữ liệu đăng ký tên miền qua RDAP — nhà đăng ký, ngày tạo và hết hạn, mã trạng thái và nameserver — kèm ghi chú rõ ràng về độ phủ TLD.",
    intro: [
      "Hồ sơ đăng ký trả lời những câu hỏi mà mặt tiền tên miền che giấu: ai vận hành, tạo khi nào và hết hạn khi nào. Công cụ truy vấn giao thức RDAP hiện đại — người kế nhiệm chính thức của WHOIS cổng 43 — qua HTTPS và sắp xếp response thành ngày tháng, nhà đăng ký, mã trạng thái và nameserver.",
      "rdap.org chuyển truy vấn của bạn tới máy chủ RDAP chính thức của registry. Độ phủ rộng nhưng không toàn diện: đa số registry quốc gia (.cn, .de, .br…) vẫn thiếu máy chủ RDAP công cộng, và công cụ nói thẳng khi một TLD không được phủ thay vì hiện ô trống.",
    ],
    steps: [
      "Nhập tên miền đang tìm hiểu (example.com) và bấm Tra cứu.",
      "Đọc ngày tháng trước: ngày tạo và hết hạn hé lộ tuổi tên miền và thói quen gia hạn.",
      "Xem nhà đăng ký và mã trạng thái — clientTransferProhibited nghĩa bị khóa chuyển nhượng, redemptionPeriod ngụ ý tên miền sắp rơi ra.",
      "Quét nameserver để xem ai thực sự vận hành DNS của tên miền.",
    ],
    faqs: [
      {
        q: "Vì sao dùng RDAP thay cho WHOIS cổ điển?",
        a: "RDAP trả về JSON có cấu trúc qua HTTPS thay vì văn bản phi cấu trúc qua cổng lỗi thời. Nó hỗ trợ xác thực, giới hạn tần suất và tên miền quốc tế hóa, và ICANN đòi hỏi ở mọi registry gTLD. Công cụ đi theo chuyển hướng của rdap.org tới registry đang vận hành TLD đó.",
      },
      {
        q: "Vì sao một số TLD báo “không được phủ”?",
        a: "Mỗi registry tự chọn có vận hành dịch vụ RDAP công cộng hay không. Gần như mọi gTLD (.com, .net, .app…) đều có, nhưng nhiều mã quốc gia — .cn, .de, .br và một số khác — vẫn chưa. Khi rdap.org không tìm thấy máy chủ cho một TLD, công cụ hiển thị giải thích rõ ràng thay vì kết quả trống.",
      },
      {
        q: "Những gì được gửi qua mạng?",
        a: "Chỉ tên miền, trong một request HTTPS tới rdap.org, có thể chuyển hướng tới điểm cuối RDAP chính thức của registry. Dữ liệu đăng ký vốn công khai; không có thông tin cá nhân nào về bạn được truyền.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Unit converters (dựng từ factory — lớp phủ viết bản đầy đủ riêng)     */
  /* ------------------------------------------------------------------ */
  "length-converter": {
    name: "Chuyển đổi độ dài",
    tagline:
      "Chuyển độ dài và khoảng cách tức thì: mét, feet, inch, dặm, xăng-ti-mét và hơn nữa — ngay trong trình duyệt của bạn.",
    intro: [
      "Chuyển giữa các đơn vị độ dài hệ mét và hệ Anh mà không cần gõ vào ô tìm kiếm. Nhập bất kỳ giá trị nào và xem mét, feet, inch, dặm cùng mọi đơn vị khác cùng một lúc.",
      "Hữu ích cho dự án tự làm, lên kế hoạch du lịch, bản vẽ kỹ thuật và bài tập ở trường — bất cứ nơi nào phép chuyển nhanh và chính xác thắng mọi phỏng đoán.",
      "Hỗ trợ 10 đơn vị — kilômét, mét, xăng-ti-mét, milimét, micrômét, dặm và nhiều hơn nữa. Mọi phép tính đều thực hiện trong trình duyệt của bạn, hoạt động offline, và dữ liệu không bao giờ chạm tới máy chủ nào.",
    ],
    steps: [
      "Nhập giá trị cần chuyển đổi.",
      "Chọn đơn vị gốc và đơn vị đích.",
      "Kết quả cập nhật ngay khi gõ — bảng bên dưới hiển thị mọi đơn vị cùng lúc, hay sao chép kết quả.",
    ],
    faqs: [
      {
        q: "Một inch bằng bao nhiêu xăng-ti-mét?",
        a: "Một inch chính xác bằng 2,54 xăng-ti-mét, theo thỏa thuận quốc tế từ năm 1959. Nhập 1 in → cm ở trên để kiểm chứng.",
      },
      {
        q: "Công cụ chuyển đổi này có miễn phí?",
        a: "Có — nó chạy hoàn toàn trong trình duyệt của bạn. Không giới hạn, không quảng cáo trên kết quả, không đăng ký.",
      },
      {
        q: "Kết quả chuyển đổi có chính xác?",
        a: "Hệ số chuyển đổi theo định nghĩa chuẩn quốc tế (SI và NIST). Kết quả hiển thị tới 8 chữ số có nghĩa.",
      },
    ],
  },
  "weight-converter": {
    name: "Chuyển đổi trọng lượng",
    tagline:
      "Chuyển kilôgam, pound, ounce, stone và gam tức thì — miễn phí, riêng tư và chạy được cả khi offline.",
    intro: [
      "Chuyển giữa đơn vị trọng lượng hệ mét và hệ Anh tại một nơi: kilôgam, pound, ounce, stone, carat và hơn nữa, tất cả tính lại ngay khi bạn gõ.",
      "Tiện để nấu ăn với công thức nước ngoài, cân giới hạn hành lý, ghi nhật ký tập gym và tính phí vận chuyển.",
      "Hỗ trợ 8 đơn vị — tấn, kilôgam, gam, miligam, pound, ounce và nhiều hơn nữa. Mọi phép tính đều thực hiện trong trình duyệt của bạn, hoạt động offline, và dữ liệu không bao giờ chạm tới máy chủ nào.",
    ],
    steps: [
      "Nhập giá trị cần chuyển đổi.",
      "Chọn đơn vị gốc và đơn vị đích.",
      "Kết quả cập nhật ngay khi gõ — bảng bên dưới hiển thị mọi đơn vị cùng lúc, hay sao chép kết quả.",
    ],
    faqs: [
      {
        q: "1 kg bằng bao nhiêu pound?",
        a: "Một kilôgam bằng 2,20462 pound (1 lb = 0,45359237 kg chính xác). Nhập 1 kg → lb ở trên để xem.",
      },
      {
        q: "Một stone bằng bao nhiêu kg?",
        a: "Một stone (dùng ở Anh để cân nặng cơ thể) bằng 6,35029318 kilôgam — chính xác 14 pound.",
      },
      {
        q: "Công cụ chuyển đổi này có miễn phí?",
        a: "Có — nó chạy hoàn toàn trong trình duyệt của bạn. Không giới hạn, không quảng cáo trên kết quả, không đăng ký.",
      },
    ],
  },
  "area-converter": {
    name: "Chuyển đổi diện tích",
    tagline:
      "Mét vuông, feet vuông, acre, hecta và hơn nữa — cho bất động sản, đất đai và vật liệu lát sàn.",
    intro: [
      "Chuyển các đơn vị đất đai và diện tích giữa các hệ: mét vuông, feet vuông, acre, hecta và dặm vuông, tất cả hiển thị cùng lúc cho mọi giá trị nhập.",
      "Dùng điển hình khi so sánh tin đăng bất động sản từ các nước khác nhau, quy hoạch vườn và nông trại, hay ước lượng vật liệu lát sàn và sơn.",
      "Hỗ trợ 9 đơn vị — kilômét vuông, hecta, mét vuông, xăng-ti-mét vuông, dặm vuông, acre và nhiều hơn nữa. Mọi phép tính đều thực hiện trong trình duyệt của bạn, hoạt động offline, và dữ liệu không bao giờ chạm tới máy chủ nào.",
    ],
    steps: [
      "Nhập giá trị cần chuyển đổi.",
      "Chọn đơn vị gốc và đơn vị đích.",
      "Kết quả cập nhật ngay khi gõ — bảng bên dưới hiển thị mọi đơn vị cùng lúc, hay sao chép kết quả.",
    ],
    faqs: [
      {
        q: "Một acre lớn cỡ nào theo mét vuông?",
        a: "Một acre = 4.046,86 m², tức khoảng 43.560 feet vuông. Một hecta bằng 2,471 acre.",
      },
      {
        q: "Công cụ chuyển đổi này có miễn phí?",
        a: "Có — nó chạy hoàn toàn trong trình duyệt của bạn. Không giới hạn, không quảng cáo trên kết quả, không đăng ký.",
      },
      {
        q: "Kết quả chuyển đổi có chính xác?",
        a: "Hệ số chuyển đổi theo định nghĩa chuẩn quốc tế (SI và NIST). Kết quả hiển thị tới 8 chữ số có nghĩa.",
      },
    ],
  },
  "volume-converter": {
    name: "Chuyển đổi thể tích",
    tagline:
      "Lít, gallon, cốc, mililít và mét khối — đơn vị Mỹ và Anh được ghi nhãn rõ ràng, chuyển ngay trong trình duyệt.",
    intro: [
      "Chuyển đơn vị thể tích bếp núc và kỹ thuật với sự khác biệt Mỹ/Anh được nói rõ: một gallon Mỹ là 3,785 L, một gallon Anh (imperial) là 4,546 L — chênh nhau 20%, nên nhầm lẫn giữa hai loại sẽ hỏng công thức nấu.",
      "Xây cho việc nấu ăn, ủ bia, định liều hồ cá, số liệu nhiên liệu và ước lượng bê tông.",
      "Hỗ trợ 10 đơn vị — mét khối, lít, mililít, gallon (Mỹ), gallon (Anh), quart (Mỹ) và nhiều hơn nữa. Mọi phép tính đều thực hiện trong trình duyệt của bạn, hoạt động offline, và dữ liệu không bao giờ chạm tới máy chủ nào.",
    ],
    steps: [
      "Nhập giá trị cần chuyển đổi.",
      "Chọn đơn vị gốc và đơn vị đích.",
      "Kết quả cập nhật ngay khi gõ — bảng bên dưới hiển thị mọi đơn vị cùng lúc, hay sao chép kết quả.",
    ],
    faqs: [
      {
        q: "Gallon Mỹ có giống gallon Anh?",
        a: "Không. 1 gallon Mỹ = 3,785 L, 1 gallon Anh = 4,546 L. Bộ chuyển đổi liệt kê chúng riêng biệt để bạn luôn chọn đúng loại.",
      },
      {
        q: "Công cụ chuyển đổi này có miễn phí?",
        a: "Có — nó chạy hoàn toàn trong trình duyệt của bạn. Không giới hạn, không quảng cáo trên kết quả, không đăng ký.",
      },
      {
        q: "Kết quả chuyển đổi có chính xác?",
        a: "Hệ số chuyển đổi theo định nghĩa chuẩn quốc tế (SI và NIST). Kết quả hiển thị tới 8 chữ số có nghĩa.",
      },
    ],
  },
  "speed-converter": {
    name: "Chuyển đổi tốc độ",
    tagline:
      "km/h, mph, hải lý/giờ, m/s và hơn nữa — chuyển nhịp chạy, tốc độ gió và tốc độ xe tức thì.",
    intro: [
      "Chuyển các đơn vị tốc độ của nhiều quốc gia và môn thể thao: kilômét trên giờ, dặm trên giờ, hải lý trên giờ cho thuyền buồm và hàng không, mét trên giây cho vật lý.",
      "Hữu ích khi thuê xe ở nước ngoài, đọc dự báo biển hay so sánh nhịp chạy trên máy với ngoài trời.",
      "Hỗ trợ 6 đơn vị — mét trên giây, kilômét trên giờ, dặm trên giờ, feet trên giây, hải lý trên giờ (knot) và Mach. Mọi phép tính đều thực hiện trong trình duyệt của bạn, hoạt động offline, và dữ liệu không bao giờ chạm tới máy chủ nào.",
    ],
    steps: [
      "Nhập giá trị cần chuyển đổi.",
      "Chọn đơn vị gốc và đơn vị đích.",
      "Kết quả cập nhật ngay khi gõ — bảng bên dưới hiển thị mọi đơn vị cùng lúc, hay sao chép kết quả.",
    ],
    faqs: [
      {
        q: "100 km/h bằng bao nhiêu mph?",
        a: "100 km/h = 62,14 mph. Hệ số chính xác là 1 mph = 1,609344 km/h.",
      },
      {
        q: "Công cụ chuyển đổi này có miễn phí?",
        a: "Có — nó chạy hoàn toàn trong trình duyệt của bạn. Không giới hạn, không quảng cáo trên kết quả, không đăng ký.",
      },
      {
        q: "Kết quả chuyển đổi có chính xác?",
        a: "Hệ số chuyển đổi theo định nghĩa chuẩn quốc tế (SI và NIST). Kết quả hiển thị tới 8 chữ số có nghĩa.",
      },
    ],
  },
  "data-converter": {
    name: "Chuyển đổi dung lượng",
    tagline:
      "Chuyển byte, KB, MB, GB và TB — cả quy ước thập phân (1000) lẫn nhị phân (1024), đặt cạnh nhau.",
    intro: [
      "Chuyển các đơn vị lưu trữ số với sự phân biệt thập phân/nhị phân được nói rõ: KB nghĩa là 1000 byte, KiB nghĩa là 1024 byte. Phần lớn sự bối rối “vì sao ổ đĩa của tôi nhỏ hơn quảng cáo” đến từ việc trộn hai quy ước này.",
      "Dùng để kiểm tra dung lượng tải xuống, mức dùng ổ đĩa, thông số bộ nhớ và hạn băng thông hosting.",
      "Hỗ trợ 10 đơn vị — bit, byte, KB, KiB, MB, MiB và nhiều hơn nữa. Mọi phép tính đều thực hiện trong trình duyệt của bạn, hoạt động offline, và dữ liệu không bao giờ chạm tới máy chủ nào.",
    ],
    steps: [
      "Nhập giá trị cần chuyển đổi.",
      "Chọn đơn vị gốc và đơn vị đích.",
      "Kết quả cập nhật ngay khi gõ — bảng bên dưới hiển thị mọi đơn vị cùng lúc, hay sao chép kết quả.",
    ],
    faqs: [
      {
        q: "Vì sao ổ 1 TB chỉ hiện ~931 GB?",
        a: "Nhà sản xuất ổ dùng đơn vị thập phân (1 TB = 1.000.000.000.000 byte) trong khi hệ điều hành thường hiển thị đơn vị nhị phân (1 TiB = 1.099.511.627.776 byte). 1 TB = 0,909 TiB ≈ 931 GiB — không có gì bị mất.",
      },
      {
        q: "Công cụ chuyển đổi này có miễn phí?",
        a: "Có — nó chạy hoàn toàn trong trình duyệt của bạn. Không giới hạn, không quảng cáo trên kết quả, không đăng ký.",
      },
      {
        q: "Kết quả chuyển đổi có chính xác?",
        a: "Hệ số chuyển đổi theo định nghĩa chuẩn quốc tế (SI và NIST). Kết quả hiển thị tới 8 chữ số có nghĩa.",
      },
    ],
  },
  "time-converter": {
    name: "Chuyển đổi đơn vị thời gian",
    tagline:
      "Giây, phút, giờ, ngày, tuần, tháng và năm — kèm giải thích lưu ý về tháng/năm, chạy trong trình duyệt.",
    intro: [
      "Chuyển khoảng thời gian giữa các đơn vị thời gian. Vì tháng và năm lịch có độ dài thay đổi, công cụ dùng giá trị trung bình quy ước (30,44 ngày mỗi tháng, 365,2425 ngày mỗi năm) và nói rõ điều đó — không làm tròn âm thầm.",
      "Hữu ích cho ước tính dự án, so sánh giá subscription, tính thời gian khoa học và đếm ngược.",
      "Hỗ trợ 8 đơn vị — miligây, giây, phút, giờ, ngày, tuần, tháng và năm. Mọi phép tính đều thực hiện trong trình duyệt của bạn, hoạt động offline, và dữ liệu không bao giờ chạm tới máy chủ nào.",
    ],
    steps: [
      "Nhập giá trị cần chuyển đổi.",
      "Chọn đơn vị gốc và đơn vị đích.",
      "Kết quả cập nhật ngay khi gõ — bảng bên dưới hiển thị mọi đơn vị cùng lúc, hay sao chép kết quả.",
    ],
    faqs: [
      {
        q: "Vì sao một tháng là 30,44 ngày ở đây?",
        a: "Một tháng lịch dao động từ 28 tới 31 ngày, nên phép tính khoảng thời gian dùng giá trị trung bình theo chu kỳ Gregorian: 30,4369 ngày. Cần tính ngày lịch chính xác thì hãy dùng Máy tính ngày.",
      },
      {
        q: "Công cụ chuyển đổi này có miễn phí?",
        a: "Có — nó chạy hoàn toàn trong trình duyệt của bạn. Không giới hạn, không quảng cáo trên kết quả, không đăng ký.",
      },
      {
        q: "Kết quả chuyển đổi có chính xác?",
        a: "Hệ số chuyển đổi theo định nghĩa chuẩn quốc tế (SI và NIST). Kết quả hiển thị tới 8 chữ số có nghĩa.",
      },
    ],
  },
  "pressure-converter": {
    name: "Chuyển đổi áp suất",
    tagline:
      "bar, psi, pascal, khí quyển, mmHg và hơn nữa — cho lốp xe, lặn, thời tiết và HVAC.",
    intro: [
      "Chuyển các đơn vị áp suất của nhiều ngành khác nhau: psi cho đồng hồ lốp xe, bar cho thông số châu Âu, pascal và kPa trong kỹ thuật, mmHg trong y học và khí tượng.",
      "Mọi hệ số chính xác tuyệt đối ở nơi chuẩn định nghĩa chúng chính xác (ví dụ 1 atm = 101.325 Pa).",
      "Hỗ trợ 7 đơn vị — pascal, kilopascal, megapascal, bar, khí quyển (atm), mmHg và psi. Mọi phép tính đều thực hiện trong trình duyệt của bạn, hoạt động offline, và dữ liệu không bao giờ chạm tới máy chủ nào.",
    ],
    steps: [
      "Nhập giá trị cần chuyển đổi.",
      "Chọn đơn vị gốc và đơn vị đích.",
      "Kết quả cập nhật ngay khi gõ — bảng bên dưới hiển thị mọi đơn vị cùng lúc, hay sao chép kết quả.",
    ],
    faqs: [
      {
        q: "Chuyển psi sang bar thế nào?",
        a: "1 bar = 14,5038 psi, nên lấy psi chia cho 14,5038. Lốp xe ô tô thông thường ở 32 psi là khoảng 2,21 bar.",
      },
      {
        q: "Công cụ chuyển đổi này có miễn phí?",
        a: "Có — nó chạy hoàn toàn trong trình duyệt của bạn. Không giới hạn, không quảng cáo trên kết quả, không đăng ký.",
      },
      {
        q: "Kết quả chuyển đổi có chính xác?",
        a: "Hệ số chuyển đổi theo định nghĩa chuẩn quốc tế (SI và NIST). Kết quả hiển thị tới 8 chữ số có nghĩa.",
      },
    ],
  },
  "energy-converter": {
    name: "Chuyển đổi năng lượng",
    tagline:
      "Calo, kilôjoule, joule, kWh, Wh và BTU — nhãn thực phẩm, hóa đơn điện và vật lý ở cùng một nơi.",
    intro: [
      "Chuyển các đơn vị năng lượng giữa các ngữ cảnh: calo thực phẩm (kcal) khác calo hóa học (cal), điện trong kWh, sưởi trong BTU, vật lý trong joule.",
      "Phân biệt rõ cal và kcal — nguồn gốc nhiều hiểu nhầm trên nhãn dinh dưỡng — với hệ số chuẩn chính xác.",
      "Hỗ trợ 7 đơn vị — joule, kilôjoule, calo, kilocalo, Wh, kWh và BTU. Mọi phép tính đều thực hiện trong trình duyệt của bạn, hoạt động offline, và dữ liệu không bao giờ chạm tới máy chủ nào.",
    ],
    steps: [
      "Nhập giá trị cần chuyển đổi.",
      "Chọn đơn vị gốc và đơn vị đích.",
      "Kết quả cập nhật ngay khi gõ — bảng bên dưới hiển thị mọi đơn vị cùng lúc, hay sao chép kết quả.",
    ],
    faqs: [
      {
        q: "Calo có giống kilocalo?",
        a: "Không. 1 kcal = 1000 cal. Nhãn thực phẩm ghi “Calorie” (C hoa) thực ra nghĩa là kilocalo. Nhập 1 kcal → cal để kiểm chứng.",
      },
      {
        q: "1 BTU bằng bao nhiêu kWh?",
        a: "1 BTU = 0,000293071 kWh. Máy điều hòa 10.000 BTU chạy một giờ tiêu thụ khoảng 2,93 kWh.",
      },
      {
        q: "Công cụ chuyển đổi này có miễn phí?",
        a: "Có — nó chạy hoàn toàn trong trình duyệt của bạn. Không giới hạn, không quảng cáo trên kết quả, không đăng ký.",
      },
    ],
  },
  "temperature-converter": {
    name: "Chuyển đổi nhiệt độ",
    tagline:
      "Độ C sang độ F và Kelvin tức thì. Kết quả trực tiếp cùng các mốc tham chiếu đóng băng và sôi.",
    intro: [
      "Chuyển Celsius, Fahrenheit và Kelvin trong một bước. Khác các đơn vị tuyến tính, thang nhiệt độ cần công thức có độ dịch — công cụ áp đúng, kể cả giá trị dưới 0.",
      "Hợp với công thức nấu có lò nướng nước ngoài, dự báo thời tiết, thí nghiệm và thông số HVAC.",
      "Hỗ trợ 3 đơn vị — Celsius, Fahrenheit và Kelvin. Mọi phép tính đều thực hiện trong trình duyệt của bạn, hoạt động offline, và dữ liệu không bao giờ chạm tới máy chủ nào.",
    ],
    steps: [
      "Nhập giá trị cần chuyển đổi.",
      "Chọn đơn vị gốc và đơn vị đích.",
      "Kết quả cập nhật ngay khi gõ — bảng bên dưới hiển thị mọi đơn vị cùng lúc, hay sao chép kết quả.",
    ],
    faqs: [
      {
        q: "Chuyển Celsius sang Fahrenheit thế nào?",
        a: "Nhân 9, chia 5, rồi cộng 32: °F = °C × 9⁄5 + 32. Ví dụ 20 °C = 68 °F. Công cụ làm giúp bạn và hiển thị cả Kelvin.",
      },
      {
        q: "Fahrenheit và Celsius bằng nhau ở nhiệt độ nào?",
        a: "Ở −40 độ: −40 °C = −40 °F. Nhập −40 và đổi đơn vị để tận mắt kiểm chứng.",
      },
      {
        q: "Công cụ chuyển đổi này có miễn phí?",
        a: "Có — nó chạy hoàn toàn trong trình duyệt của bạn. Không giới hạn, không quảng cáo trên kết quả, không đăng ký.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Calculators                                                         */
  /* ------------------------------------------------------------------ */
  "age-calculator": {
    name: "Máy tính tuổi",
    tagline:
      "Tính tuổi chính xác theo năm, tháng và ngày, tổng số ngày đã sống, cùng đếm ngược trực tiếp tới sinh nhật tiếp theo — chuẩn theo lịch.",
    intro: [
      "Nhập ngày sinh và máy tính báo tuổi chính xác — năm, tháng và ngày, không phải xấp xỉ — cùng tổng tháng và tổng ngày đã sống. Nó còn đếm ngược tới sinh nhật tiếp theo kèm thứ trong tuần rơi vào.",
      "Ô “tuổi tính tại ngày” mặc định hôm nay và có thể đổi sang bất kỳ ngày quá khứ hay tương lai nào, giúp trả lời dễ dàng những câu như “cô ấy bao nhiêu tuổi vào ngày tốt nghiệp?”.",
    ],
    steps: [
      "Chọn ngày sinh.",
      "Để ngày tính tuổi là hôm nay, hay đổi sang ngày khác.",
      "Đọc tuổi chính xác, tổng tháng và ngày, cùng đếm ngược sinh nhật tiếp theo.",
    ],
    faqs: [
      {
        q: "Tuổi theo năm, tháng, ngày được tính thế nào?",
        a: "Bằng phép cộng trừ theo lịch, không phải độ dài tháng trung bình: năm và tháng được đếm trọn, còn ngày dư được đo theo độ dài thật của tháng — gồm cả năm nhuận. Người sinh ngày 29 tháng 2 được tính thêm một tuổi vào ngày 1 tháng 3 của năm không nhuận.",
      },
      {
        q: "Tính được tuổi tại ngày trong quá khứ hay tương lai?",
        a: "Có. Ô “tuổi tại ngày” chỉnh được nên bạn tính tuổi lịch sử hay xem ai đó bao nhiêu tuổi vào một sự kiện tương lai. Ngày sinh không được sau ngày tính tuổi.",
      },
      {
        q: "Vì sao con số tổng số ngày quan trọng?",
        a: "Tổng ngày sống là con số dùng cho cột mốc kiểu “số ngày trên đời” và cho các hệ thống lưu tuổi theo ngày. Nó tính từ ngày lịch theo UTC nên giờ chuyển mùa không thể khiến lệch một ngày.",
      },
    ],
  },
  "aspect-ratio-calculator": {
    name: "Máy tính tỉ lệ khung hình",
    tagline:
      "Cho tỉ lệ như 16:9 và một chiều, nhận chiều còn thiếu tức thì — kèm preset từ 1:1 tới 21:9 cho video và thiết kế.",
    intro: [
      "Nhập tỉ lệ — chạm một preset (1:1, 4:3, 3:2, 16:9, 16:10, 21:9) hay gõ số tùy ý — rồi cho nó một chiều đã biết. Chiều còn thiếu xuất hiện ngay, cùng cặp số định dạng W×H và tỉ lệ thập phân.",
      "Phép thu phóng kinh điển không méo hình: cắt video, khung ảnh responsive, chuẩn cảm biến và phim, thu nhỏ để in hay quyết định object-fit của CSS đều sống ở đây, tính cục bộ ngay khi gõ.",
    ],
    steps: [
      "Chọn preset tỉ lệ hay gõ riêng giá trị rộng:cao của bạn.",
      "Chọn chiều đã biết — rộng hay cao.",
      "Nhập giá trị đã biết và đọc chiều còn thiếu.",
    ],
    faqs: [
      {
        q: "Chiều còn thiếu được tính thế nào?",
        a: "Theo tỉ lệ thuận: chiều đã biết × (cạnh đích ÷ cạnh tỉ lệ tương ứng). Với 16:9 và rộng 1920, cao = 1920 × 9 ÷ 16 = 1080. Kết quả hiển thị đã làm tròn, kèm số thập phân chính xác bên dưới.",
      },
      {
        q: "Vì sao 16:9 và 16:10 lại quan trọng với màn hình?",
        a: "16:9 khớp video (1920×1080, 3840×2160) và đa số màn hình; 16:10 thêm không gian dọc cho tài liệu và code (1920×1200). Chọn sai nghĩa là dải đen hay điểm ảnh kéo giãn — công cụ cho thấy chính xác mỗi tỉ lệ tạo ra gì.",
      },
      {
        q: "Dùng được tỉ lệ thập phân hay tỉ lệ lạ?",
        a: "Có. Cả hai ô tỉ lệ nhận mọi số dương nên 2.39:1 scope điện ảnh, 1.85:1, cắt dọc 4:5 cho mạng xã hội hay kích thước cảm biến 1.5:1 đều chạy — phép tính tỉ lệ giống hệt.",
      },
    ],
  },
  "barcode-generator": {
    name: "Trình tạo mã vạch",
    tagline:
      "Tạo mã vạch CODE128, EAN-13 và UPC-A quét được với độ rộng và cao vạch chỉnh được — đầu ra SVG vector, kết xuất trong trình duyệt của bạn.",
    intro: [
      "Nhập giá trị, chọn loại mã hóa và nhận mã vạch chuẩn bán lẻ kèm dòng chữ đọc được tùy chọn. CODE128 nhận mọi chữ cái, chữ số và ký hiệu cho nhãn kho; EAN-13 và UPC-A kiểm tra và tự điền chữ số kiểm tra cho bao bì sản phẩm.",
      "Kết xuất dùng thư viện JsBarcode ngay trong trình duyệt và xuất SVG co giãn được, nên cùng một file in sắc nét trên nhãn 12 mm lẫn tờ A4. Không có gì được tải lên và không mã nào được lưu.",
    ],
    steps: [
      "Nhập giá trị mã vạch — chữ/số cho CODE128, 12 chữ số cho EAN-13, 11 cho UPC-A.",
      "Chọn định dạng và chỉnh độ rộng cùng cao của vạch.",
      "Tải SVG về để in hay nhập vào phần mềm thiết kế của bạn.",
    ],
    faqs: [
      {
        q: "Vì sao EAN-13 của tôi bị từ chối?",
        a: "EAN-13 cần đúng 12 chữ số (chữ số kiểm tra thứ 13 được tính tự động) hoặc đủ 13 chữ số với chữ số kiểm tra cuối hợp lệ. UPC-A tương tự đòi 11 chữ số. Chữ cái, khoảng trắng hay sai số lượng chữ số bị từ chối kèm thông báo lỗi của thư viện.",
      },
      {
        q: "Sản phẩm bán lẻ nên dùng định dạng nào?",
        a: "EAN-13 ở phần lớn thế giới, UPC-A ở Mỹ và Canada — cả hai là chuẩn bán lẻ GS1 mà máy quét tại quầy mong đợi. Dùng CODE128 cho nhãn nội bộ, tài sản và vận chuyển khi chưa có số GS1.",
      },
      {
        q: "Độ phân giải đầu ra là bao nhiêu?",
        a: "Bản tải về là SVG vector nên co giãn tới mọi DPI không mờ. Giữ nguyên vùng lặng (khoảng trống hai bên) khi đặt vào bản in — cắt bớt chúng là nguyên nhân phổ biến nhất khiến mã không quét được.",
      },
    ],
  },
  "binary-converter": {
    name: "Chuyển đổi nhị phân",
    tagline:
      "Chuyển giữa thập phân, thập lục, bát phân và nhị phân trong một bảng trực tiếp — hỗ trợ số nguyên lớn tùy ý, nhóm chữ cho dễ đọc.",
    intro: [
      "Gõ số vào bất kỳ ô nào trong bốn ô — thập phân, hex, bát phân hay nhị phân — và ba ô còn lại cập nhật tức thì. Giá trị hex được nhóm hai chữ số và nhị phân mỗi bốn chữ số, nên chuỗi bit dài vẫn dễ đọc.",
      "Chuyển đổi dùng số học BigInt nghĩa là không có trần 32 hay 64 bit: dán số thập phân 40 chữ số hay chuỗi hex 256 bit đầy đủ và mọi biểu diễn đều chính xác.",
    ],
    steps: [
      "Gõ hay dán giá trị vào bất kỳ ô nào — thập phân, hex, bát phân hay nhị phân.",
      "Ba hệ còn lại cập nhật trực tiếp khi bạn gõ.",
      "Tiền tố như 0x là tùy chọn; khoảng trắng nhóm bị bỏ qua khi phân tích.",
    ],
    faqs: [
      {
        q: "Chuyển đổi xử lý được số lớn cỡ nào?",
        a: "Số nguyên không âm lớn tùy ý. Phép tính dùng BigInt nên giá trị hex 256 bit chuyển chính xác — vượt xa giới hạn 2^53 của số JavaScript thường.",
      },
      {
        q: "Vì sao chữ hex của tôi báo không hợp lệ?",
        a: "Mỗi hệ chỉ nhận chữ số của riêng mình: nhị phân nhận 0–1, bát phân 0–7, thập phân 0–9 và thập lục 0–9 cộng a–f. Khoảng trắng hay ký hiệu lạc trong số cũng bị từ chối.",
      },
      {
        q: "Có hỗ trợ số âm hay phân số?",
        a: "Không — bảng này chuyển giá trị nguyên không âm, đúng như chuỗi bit, hash và địa chỉ bộ nhớ. Định dạng có dấu và phân số phụ thuộc lựa chọn mã hóa (bù hai, IEEE 754) sẽ làm ánh xạ mơ hồ.",
      },
    ],
  },
  "bmi-calculator": {
    name: "Máy tính BMI",
    tagline:
      "Tính chỉ số khối cơ thể từ đơn vị mét hay Anh và xem chính xác giá trị nằm ở nhóm cân nặng WHO nào.",
    intro: [
      "Nhập chiều cao và cân nặng bằng xăng-ti-mét và kilôgam, hay feet, inch và pound, và máy tính hiển thị chỉ số khối cơ thể tới một chữ số thập phân cùng nhóm WHO mà nó rơi vào — thiếu cân, bình thường, thừa cân hay béo phì — với dòng tương ứng nổi bật trong bảng tham chiếu.",
      "Kết quả cập nhật khi bạn gõ nên dễ thấy vài kilôgam đẩy bạn qua ranh giới nào. BMI là thước đo sàng lọc, không phải chẩn đoán: nó không phân biệt cơ với mỡ.",
    ],
    steps: [
      "Chọn đơn vị mét (cm + kg) hay Anh (ft + in + lb).",
      "Gõ chiều cao và cân nặng của bạn.",
      "Đọc BMI, nhóm WHO và bảng tham chiếu đầy đủ.",
    ],
    faqs: [
      {
        q: "Các khoảng BMI của WHO là gì?",
        a: "Tổ chức Y tế Thế giới định nghĩa: dưới 18,5 thiếu cân, 18,5–24,9 cân nặng bình thường, 25,0–29,9 thừa cân, và từ 30,0 trở lên là béo phì. Các ngưỡng này áp dụng cho cả nam và nữ trưởng thành.",
      },
      {
        q: "BMI được tính thế nào?",
        a: "BMI là cân nặng tính bằng kilôgam chia cho bình phương chiều cao tính bằng mét (kg/m²). Với đơn vị Anh, công cụ tự chuyển feet, inch và pound nên kết quả giống hệt theo cách nào.",
      },
      {
        q: "Vì sao BMI không hợp với vận động viên?",
        a: "Cơ đặc hơn mỡ nên người nhiều cơ có thể bị chấm “thừa cân” dù mỡ dư rất ít. Hãy coi BMI là phép sàng lọc nhanh ở mức dân số và kết hợp vòng bụng hay thành phần cơ thể cho bức tranh đầy đủ.",
      },
    ],
  },
  "color-converter": {
    name: "Chuyển đổi màu",
    tagline:
      "Dán màu dạng hex, rgb() hay hsl() và nhận cả ba định dạng cùng một dải tints và shades sẵn sàng cho hệ thiết kế của bạn.",
    intro: [
      "Nạp vào #0071e3, rgb(0, 113, 227) hay hsl(211, 100%, 45%) — bộ phân tích tự nhận diện định dạng và xuất hex, RGB cùng HSL một lúc, mỗi loại một nút sao chép.",
      "Bên dưới các giá trị, dải tint và shade trộn màu của bạn với trắng và đen theo bước 20/40/60/80%: hover, viền và biến thể dark-mode tức thì mà không cần mở phần mềm thiết kế.",
    ],
    steps: [
      "Dán màu dạng bất kỳ trong ba định dạng — hex, rgb() hay hsl().",
      "Đọc các giá trị đã chuyển và sao chép loại bạn cần.",
      "Lấy tints và shades từ dải mẫu màu bên dưới.",
    ],
    faqs: [
      {
        q: "HSL chuyển sang RGB thế nào?",
        a: "Qua phép ánh xạ Cylindrical–RGB chuẩn: độ màu c = (1 − |2L − 1|) × S, giá trị trung gian x xác định theo sector sắc độ, rồi mỗi kênh được dịch bởi m = L − c/2. Công thức là chuẩn sách giáo khoa nên kết quả khớp các phần mềm thiết kế.",
      },
      {
        q: "Vì sao mã màu của tôi báo không hợp lệ?",
        a: "Các dạng được nhận là #RGB / #RRGGBB, rgb(r, g, b) và hsl(h, s%, l%). Các kênh phải trong khoảng (0–255 cho RGB, 0–360 cho hue, 0–100% cho phần còn lại) và mỗi phần cách nhau bằng dấu phẩy hay khoảng trắng.",
      },
      {
        q: "Tints và shades dùng để làm gì?",
        a: "Tints (trộn trắng) tạo nền hover, badge và thẻ; shades (trộn đen) tạo trạng thái nhấn, viền và bề mặt dark-mode. Dẫn xuất cả hai từ một màu thương hiệu giúp mọi trạng thái UI nhất quán thị giác.",
      },
    ],
  },
  "color-picker": {
    name: "Chọn màu",
    tagline:
      "Chọn màu từ bảng mẫu hay lấy thẳng từ màn hình bằng EyeDropper API — hex, RGB và HSL sao chép một cú bấm.",
    intro: [
      "Bấm vào ô mẫu màu để phối màu trực quan, hay — trên trình duyệt Chromium — dùng Lấy từ màn hình để bắt mẫu bất kỳ điểm ảnh nào đang trên màn hình. Giá trị chọn được hiện đồng thời dạng hex, rgb() và hsl(), mỗi loại một nút sao chép riêng.",
      "Việc lấy mẫu dùng EyeDropper API dựng sẵn của trình duyệt và đọc điểm ảnh cục bộ; không có gì được ghi lại, tải lên hay lưu. Trên trình duyệt không có API, ô nhập mẫu màu vẫn giữ mọi thứ hoạt động.",
    ],
    steps: [
      "Bấm ô mẫu màu và chọn màu, hay dùng Lấy từ màn hình nơi có hỗ trợ.",
      "Đọc giá trị hex, RGB và HSL dưới bản xem trước.",
      "Bấm Sao chép cạnh định dạng bạn cần.",
    ],
    faqs: [
      {
        q: "Vì sao “Lấy từ màn hình” không hiện?",
        a: "EyeDropper API hiện có ở các trình duyệt nền Chromium (Chrome, Edge, Brave, Opera). Firefox và Safari chưa cung cấp nên các trình duyệt đó chỉ hiện ô nhập mẫu màu — phần còn lại hoạt động giống hệt.",
      },
      {
        q: "Hex, RGB và HSL khác nhau thế nào?",
        a: "Chúng mô tả cùng một màu theo ba cách: hex gói đỏ-lục-lam thành #RRGGBB cho CSS và công cụ thiết kế; rgb() nêu ba kênh bằng số; hsl() biểu diễn sắc độ, độ bão hòa và độ sáng — dễ dựng bảng màu và trạng thái hover bằng tay hơn.",
      },
      {
        q: "Việc lấy mẫu màn hình có riêng tư?",
        a: "Có. EyeDropper API hiển thị bộ chọn hệ thống và chỉ trả về đúng điểm ảnh bạn bấm; việc đọc diễn ra trong trình duyệt và không ảnh chụp, lịch sử hay giá trị nào được truyền hay lưu.",
      },
    ],
  },
  "compound-interest-calculator": {
    name: "Máy tính lãi kép",
    tagline:
      "Xem tiền tiết kiệm lớn lên thế nào với lãi kép — nhập khoản gửi, đóng góp hằng tháng và lãi suất để nhận số dư cuối cùng và bảng từng năm.",
    intro: [
      "Lãi kép là lãi trên lãi: mỗi kỳ, số dư hưởng một phần lãi suất năm, và mỗi khoản bạn thêm vào bắt đầu hưởng lãi riêng của nó. Máy tính chạy phép cộng dồn này từng kỳ cho khoản gửi ban đầu cộng đóng góp đều hằng tháng, với kỳ ghép theo tháng, quý hay năm.",
      "Kết quả là số dư cuối cùng, tổng tiền bạn đã bỏ vào, và phần lãi mà lãi kép sinh ra — cộng bảng từng năm để bạn thấy chính xác khi nào đường cong bắt đầu dốc lên. Mọi thứ tính lại trực tiếp, và công thức được in ngay dưới các con số để bạn đối chiếu với dự phóng của ngân hàng.",
    ],
    steps: [
      "Nhập khoản gửi ban đầu và số tiền thêm mỗi tháng (0 nếu gửi một lần).",
      "Đặt lãi suất năm, số năm và tần suất ghép lãi.",
      "Chọn đơn vị tiền hiển thị — số tiền được định dạng theo ngôn ngữ của bạn.",
      "Đọc số dư cuối, tổng đóng góp và lãi kiếm được, rồi xem bảng từng năm.",
    ],
    faqs: [
      {
        q: "Máy tính dùng công thức nào?",
        a: "Chính phép cộng dồn số dư mà ngân hàng dùng để dự phóng tiết kiệm: mỗi kỳ, balance ← (balance + contribution) × (1 + r), trong đó r = lãi suất năm ÷ số kỳ mỗi năm (12 cho tháng, 4 cho quý, 1 cho năm). Khoản đóng góp được gửi vào đầu mỗi kỳ nên hưởng lãi từ kỳ đó. Ví dụ: 10.000 ban đầu, 100/tháng ở 5% trong 10 năm ghép theo tháng cho số dư cuối 32.063,02 — 22.000,00 đã đóng và 10.063,02 tiền lãi.",
      },
      {
        q: "Vì sao kết quả trên máy tính khác hơi lệch?",
        a: "Quy ước thời điểm khác nhau. Một số công cụ coi khoản đóng góp là gửi cuối kỳ (không hưởng lãi trong kỳ đến), một số giả định ghép theo ngày, một số làm tròn từng kỳ. Công cụ này gửi vào đầu mỗi kỳ và không bao giờ làm tròn bước trung gian; lệch 0,1% với trang khác thường là do quy ước ấy, không phải lỗi.",
      },
      {
        q: "Có tính thuế, phí hay lạm phát?",
        a: "Không — kết quả là tăng trưởng danh nghĩa ở lãi suất bạn nhập. Thuế lãi, phí tài khoản và lạm phát đều làm giảm lợi nhuận thực, nên hãy coi số dư cuối là trần của những gì bạn thật sự giữ được.",
      },
    ],
  },
  "currency-converter": {
    name: "Chuyển đổi tiền tệ",
    tagline:
      "Chuyển hơn 160 loại tiền tệ thế giới với tỷ giá mid-market mới nhất — tải một lần khi online, tính toán và cache riêng tư trong trình duyệt.",
    intro: [
      "Tỷ giá được tải một lần từ dịch vụ open.er-api.com miễn phí, không cần key và cache trên thiết bị trong một giờ, nên các lần chuyển tiếp sau tức thì và chạy offline. Phép toán biến số tiền của bạn sang loại tiền khác diễn ra cục bộ trong trình duyệt.",
      "Nhập số tiền, chọn hai loại tiền từ danh sách có tìm kiếm hơn 160 loại, và đọc kết quả cùng dòng tỷ giá. Số tiền bạn nhập không bao giờ được truyền đi đâu — chỉ bảng tỷ giá ẩn danh được tải về.",
    ],
    steps: [
      "Nhập số tiền cần chuyển đổi.",
      "Chọn tiền nguồn và tiền đích — các loại phổ biến đứng trước.",
      "Đọc kết quả đã chuyển và tỷ giá chính xác; dùng Làm mới tỷ giá cho dữ liệu mới nhất.",
    ],
    faqs: [
      {
        q: "Tỷ giá cập nhật bao lâu một lần?",
        a: "Bảng open.er-api.com làm mới khoảng một lần mỗi ngày, và công cụ cache nó trong trình duyệt một giờ trước khi tải lại. Bấm “Làm mới tỷ giá” bất cứ lúc nào để lấy bảng mới nhất ngay.",
      },
      {
        q: "Dùng công cụ này có gửi dữ liệu của tôi lên mạng?",
        a: "Không một khoản tiền nào được gửi đi đâu. Lời gọi mạng duy nhất tải một bảng tỷ giá công khai, ẩn danh (quy USD) mỗi giờ một lần; phép chuyển đổi chạy cục bộ trong trình duyệt và vẫn chạy từ cache khi offline.",
      },
      {
        q: "Đây có phải tỷ giá ngân hàng sẽ cho tôi?",
        a: "Đây là tỷ giá tham chiếu mid-market — điểm giữa giá mua và bán mà các ngân hàng giao dịch. Các mạng thẻ và ngân hàng thường cộng thêm 1–3% chênh lệch hay phí trên con số này.",
      },
    ],
  },
  "date-calculator": {
    name: "Máy tính ngày",
    tagline:
      "Số ngày giữa hai ngày theo năm, tháng và ngày — hay cộng trừ ngày khỏi bất kỳ ngày nào — xử lý năm nhuận chính xác tuyệt đối.",
    intro: [
      "Hai bài toán ngày hằng ngày ở cùng một nơi: đo khoảng cách giữa hai ngày (năm/tháng/ngày chuẩn lịch, tổng ngày, tuần và ngày dư), hay đi N ngày tới trước hay lùi lại từ một ngày gốc và nhận ngày kết quả kèm thứ trong tuần.",
      "Vì phép tính là toán lịch thật — không phải tháng trung bình — sinh nhật ngày 29 tháng 2, tháng có 31 ngày hay khoảng trải tháng 2 đều ra kết quả chính xác, và không hề có máy chủ nào tham gia.",
    ],
    steps: [
      "Chọn Khoảng cách giữa hai ngày, hay Cộng / trừ ngày.",
      "Nhập hai ngày — hay một ngày gốc và số ngày.",
      "Đọc bảng phân tích chính xác và ngày kết quả kèm thứ trong tuần.",
    ],
    faqs: [
      {
        q: "Khoảng cách năm/tháng/ngày được tính thế nào?",
        a: "Y như cách người ta đếm kỷ niệm: đủ năm trước, rồi đủ tháng, rồi ngày dư đo theo độ dài thật của các tháng liên quan. Ngày 29 tháng 2 được coi là ngày cuối cùng của tháng 2 nên khoảng trải năm nhuận luôn trung thực.",
      },
      {
        q: "“Cộng 90 ngày” có nghĩa ngày làm việc?",
        a: "Không — số ngày là ngày lịch, gồm cả cuối tuần. Với hạn hợp đồng tính theo ngày làm việc, cộng khoảng 5 ngày cho mỗi tuần trải ra làm ước lượng đầu, hay dùng công cụ ngày làm việc chuyên dụng.",
      },
      {
        q: "Ngày tôi nhập có được gửi đi đâu?",
        a: "Không. Cả hai chế độ chạy hoàn toàn trong trình duyệt bằng phép tính ngày của JavaScript; không có gì được tải lên hay lưu lại.",
      },
    ],
  },
  "discount-calculator": {
    name: "Máy tính giảm giá",
    tagline:
      "Giá cộng một hay hai mức giảm giá xếp chồng vào: giá cuối, tiền tiết kiệm và phần trăm gộp thực — tính ra ngay khi bạn gõ.",
    intro: [
      "Nhập giá gốc và phần trăm giảm giá, và thấy ngay lập tức bạn thật sự trả bao nhiêu và tiết kiệm bao nhiêu. Mức giảm thứ hai, tùy chọn, xử lý tình huống “giảm thêm 10% trên giá sale” luôn làm người mua lúng túng.",
      "Các mức giảm xếp chồng được áp lần lượt, và công cụ hiển thị tỉ lệ gộp thực — vì giảm 20% + 10% là giảm 28%, không phải 30%, một khác biệt cộng dồn trên các món lớn.",
    ],
    steps: [
      "Gõ giá gốc.",
      "Nhập phần trăm giảm giá — và một mức xếp chồng tùy chọn.",
      "Đọc giá cuối, số tiền tiết kiệm và mức giảm thực.",
    ],
    faqs: [
      {
        q: "Vì sao 20% + 10% không phải giảm 30%?",
        a: "Mức giảm thứ hai áp lên giá đã giảm, không phải giá gốc: 100 → 80 (−20%) → 72 (−10%), tức giảm 28% tổng. Máy tính hiển thị mức gộp thực này để bạn so sánh các deal công bằng.",
      },
      {
        q: "Tìm giá gốc từ giá bán thế nào?",
        a: "Lấy giá bán chia cho (1 − giảm giá ÷ 100). Giá 72 sau khi giảm 28% đến từ 72 ÷ 0,72 = 100. Hoặc dùng chế độ “X là bao nhiêu % của Y” trong Máy tính phần trăm để tính từng bước.",
      },
      {
        q: "Có tính VAT hay thuế bán hàng?",
        a: "Không — nó tính trên các giá bạn nhập. Nếu niêm yết đã gồm thuế thì kết quả giảm giá cũng gồm thuế. Muốn kết hợp thuế, hãy chạy giá đã giảm qua máy tính VAT hay GST.",
      },
    ],
  },
  "emi-calculator": {
    name: "Máy tính EMI",
    tagline:
      "Tính khoản trả góp cố định hằng tháng cho mọi khoản vay — nhận gốc, lãi suất và kỳ hạn, ra tổng lãi và tổng trả, tức thì.",
    intro: [
      "Nhập số tiền vay, lãi suất năm và kỳ hạn theo năm hay tháng để nhận khoản trả góp hằng tháng cùng tổng lãi bạn sẽ trả trong suốt khoản vay. Phép toán là công thức dư nợ giảm dần chuẩn mà ngân hàng và công ty tài chính dùng.",
      "Đổi bất kỳ đầu vào nào và mọi thứ tính lại trực tiếp, nên bạn so sánh khoản vay 15 năm với 20 năm, hay thấy chính xác thêm 0,5% lãi suất khiến bạn tốn thêm bao nhiêu mỗi tháng.",
    ],
    steps: [
      "Gõ số tiền vay (gốc).",
      "Nhập lãi suất năm và kỳ hạn theo năm hay tháng.",
      "Đọc EMI hằng tháng, tổng lãi và tổng trả.",
    ],
    faqs: [
      {
        q: "Máy tính EMI dùng công thức nào?",
        a: "Công thức dư nợ giảm dần chuẩn: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), trong đó P là gốc, r là lãi suất tháng (năm ÷ 12 ÷ 100) và n là số tháng. Đây là phương trình các ngân hàng dùng cho vay nhà, xe và tiêu dùng.",
      },
      {
        q: "Vì sao tổng lãi cao bất thường ở giai đoạn đầu?",
        a: "Lãi mỗi tháng tính trên số dư còn lại, và số dư lớn nhất ở thời điểm bắt đầu. Các kỳ EMI đầu chủ yếu là lãi và ít gốc; tỉ lệ đảo dần khi số dư thu nhỏ. Vì thế tất toán sớm tiết kiệm lãi nhiều hơn hẳn so với tất toán muộn.",
      },
      {
        q: "Phí và bảo hiểm có nằm trong EMI?",
        a: "Không. Phí thủ tục, bảo hiểm và thay đổi lãi suất thả nổi bị loại — kết quả là EMI khấu trừ thuần cho lãi suất bạn nhập. Thư chấp thuận của ngân hàng mới hiển thị số tiền cuối phải trả.",
      },
    ],
  },
  "fuel-cost-calculator": {
    name: "Máy tính chi phí xăng",
    tagline:
      "Khoảng cách, mức tiêu thụ và giá xăng vào: lượng xăng cần, chi phí chuyến đi và giá mỗi kilômét hay dặm ra — hệ mét hay Anh, kèm khứ hồi.",
    intro: [
      "Lên kế hoạch cho chuyến đi trước khi xuất phát: nhập khoảng cách, mức tiêu thụ xe bạn (L/100 km hay MPG) và giá xăng hiện tại, và xem số lít hay gallon cần, tổng chi phí và giá mỗi đơn vị khoảng cách — cùng nút khứ hồi nhân đôi khoảng cách giúp bạn.",
      "Nó hoạt động ngang tốt cho ngân sách đi lại hằng ngày, chia tiền một chuyến road trip giữa bạn bè, hay so giá của một đường vòng. Phép toán chạy cục bộ trong trình duyệt nên vẫn dùng được cả khi hết sóng ngay tại trạm xăng.",
    ],
    steps: [
      "Nhập khoảng cách một chiều theo kilômét hay dặm.",
      "Thêm mức tiêu thụ xe và giá xăng hiện tại.",
      "Bật khứ hồi nếu cần và đọc tổng xăng cùng chi phí.",
    ],
    faqs: [
      {
        q: "Chuyển giữa L/100 km và MPG thế nào?",
        a: "Hai thước là nghịch đảo của nhau: 235,2 chia cho con số MPG cho ra L/100 km (gallon Mỹ), nên 30 MPG ≈ 7,8 L/100 km và 6 L/100 km ≈ 39,2 MPG. Máy tính nhận con số nào bạn đồng hồ hiển thị.",
      },
      {
        q: "Vì sao mức xăng thực tế khác kết quả?",
        a: "Các con số tiêu thụ chính thức giả định tốc độ đều. Giao thông đô thị, khởi động nguội, giá nóc, tăng tốc gấp và điều hòa có thể đẩy mức dùng thực lên 10–30%, nên hãy coi ước tính là sàn cho các chuyến đông đô thị.",
      },
      {
        q: "Máy tính có gồm phí cầu đường hay bảo dưỡng?",
        a: "Không — nó chỉ tính tiền xăng. Để có chi phí thật mỗi kilômét, cộng phí cầu và chia riêng các khoản hao mòn (lốp, bảo dưỡng, khấu hao); nhiều tài xế dự trù thêm 5–10 xu mỗi km ngoài xăng.",
      },
    ],
  },
  "gst-calculator": {
    name: "Máy tính GST",
    tagline:
      "Cộng hay tách GST theo các mức 5%, 12%, 18% và 28% — số chưa thuế, thuế và tổng cập nhật trực tiếp trong trình duyệt của bạn.",
    intro: [
      "Nhập số tiền bất kỳ và chọn một trong bốn mức GST của Ấn Độ để cộng thuế vào giá chưa thuế, hay tách phần GST đã nằm trong giá tổng (MRP). Cả ba con số — chưa thuế, thuế và tổng — cập nhật khi bạn gõ.",
      "Hữu ích cho hóa đơn, kiểm tra reverse charge, so sánh mua sắm giữa các bang có mức thuế khác nhau, và hiểu chính xác bao nhiêu phần của giá niêm yết là thuế.",
    ],
    steps: [
      "Gõ số tiền — chưa thuế nếu cộng GST, tổng nếu tách ra.",
      "Chọn mức áp dụng: 5%, 12%, 18% hay 28%.",
      "Chọn Cộng thuế hay Tách thuế và đọc số chưa thuế, thuế và tổng.",
    ],
    faqs: [
      {
        q: "Các mức GST của Ấn Độ là gì?",
        a: "Các mức chính là 5%, 12%, 18% và 28%: mặt thiết yếu ở 0–5%, phần lớn hàng hóa và dịch vụ ở 12–18%, hàng xa xỉ hay “sin goods” ở 28% (đôi khi kèm thêm cess). Công cụ phủ bốn mức chuẩn này.",
      },
      {
        q: "Tách GST khỏi giá đã gồm thuế thế nào?",
        a: "Chọn “Tách thuế” và nhập số tiền tổng. Phần gốc được lấy lại theo công thức tổng ÷ (1 + mức/100), nên giá tổng 118 rupee với GST 18% có phần chưa thuế là 100 rupee và 18 rupee tiền thuế.",
      },
      {
        q: "GST có giống VAT?",
        a: "Cả hai đều là thuế giá trị gia tăng tính ở từng khâu, nhưng GST ở Ấn Độ là một thuế thống nhất gộp thuế tiêu thụ đặc biệt trung ương, thuế dịch vụ và VAT bang, chia thành CGST + SGST (cùng bang) hay IGST (khác bang). Các nước khác gọi tương đương của họ đơn giản là VAT.",
      },
    ],
  },
  "loan-calculator": {
    name: "Máy tính khoản vay",
    tagline:
      "Xem toàn cảnh một khoản vay: trả hằng tháng, tổng lãi và bảng khấu trừ từng năm cho biết phần gốc và phần lãi mỗi năm.",
    intro: [
      "Mọi thứ phần xem EMI trao cho bạn — trả hằng tháng, tổng lãi, tổng phải trả — cộng lịch khấu trừ hằng năm cho thấy chính xác phần lãi và phần gốc của mỗi năm, cùng số dư còn lại cuối mỗi năm.",
      "Đây là cách nhanh nhất để hiểu vì sao trả thêm ở những năm đầu lại giá trị đến vậy: bảng biểu khiến các năm nặng lãi không thể bị bỏ sót.",
    ],
    steps: [
      "Nhập số tiền vay, lãi suất năm và kỳ hạn theo năm hay tháng.",
      "Đọc số trả hằng tháng, tổng lãi và tổng phải trả.",
      "Cuộn bảng hằng năm để xem gốc, lãi và số dư còn lại theo từng năm.",
    ],
    faqs: [
      {
        q: "Lịch khấu trừ là gì?",
        a: "Bảng phân tích từng kỳ của một khoản vay có khoản trả cố định. Mỗi khoản trả được chia thành lãi phải trả trên số dư hiện tại và phần gốc nó tất toán, và số dư thu nhỏ mỗi tháng. Bảng ở đây gộp các tháng thành năm.",
      },
      {
        q: "Làm sao trả ít tổng lãi hơn?",
        a: "Ba đòn bẩy: kỳ hạn ngắn hơn, lãi suất thấp hơn, hay trả thêm gốc — đặc biệt ở một phần ba đầu khoản vay khi số dư cao nhất. Bảng hằng năm cho thấy chính xác lãi dồn ở đâu.",
      },
      {
        q: "Lịch có giả định lãi suất không đổi?",
        a: "Có. Nó mô hình hóa khoản vay lãi cố định cho lãi suất bạn nhập. Với sản phẩm lãi thả nổi, hãy tính lại mỗi khi mốc chuẩn điều chỉnh — mỗi lần điều chỉnh đổi cả khoản trả lẫn lịch.",
      },
    ],
  },
  "percentage-calculator": {
    name: "Máy tính phần trăm",
    tagline:
      "Ba bài toán phần trăm trong một công cụ trực tiếp: X% của Y, X là bao nhiêu phần trăm của Y, và phần trăm thay đổi giữa hai giá trị.",
    intro: [
      "Ba câu hỏi mọi người thật sự hỏi: “15% của 200 là bao nhiêu?”, “30 là bao nhiêu phần trăm của 150?” và “doanh thu từ 480 lên 610 — tăng bao nhiêu phần trăm?”. Đổi chế độ một cú bấm và công thức tự thích ứng từng trường hợp.",
      "Phần trăm thay đổi có dấu và được ghi là tăng hay giảm, nên mức từ 500 xuống 400 rõ ràng đọc là −20%, không phải con số dương gây rối.",
    ],
    steps: [
      "Chọn chế độ: X% của Y, X là bao nhiêu % của Y, hay % thay đổi.",
      "Gõ hai giá trị vào hai ô.",
      "Đọc kết quả trực tiếp — có ghi hướng cho phép thay đổi.",
    ],
    faqs: [
      {
        q: "Phần trăm thay đổi được tính thế nào?",
        a: "(cuối − đầu) ÷ |đầu| × 100. Giá trị tuyệt đối ở mẫu số khiến thay đổi từ −50 lên −40 báo đúng +20% thay vì −20%. Chiều ngược (400 → 500) cho +25% vì cơ số đổi.",
      },
      {
        q: "Vì sao tăng 20% rồi giảm 20% không về số cũ?",
        a: "Phần trăm áp trên các cơ số khác nhau: 100 + 20% = 120, rồi 120 − 20% = 96. Thay đổi ròng là −4%. Sự bất đối xứng này làm rối cả so sánh giá lẫn tiêu đề báo chí.",
      },
      {
        q: "Dùng được số âm hay thập phân?",
        a: "Có. Cả hai ô nhận số âm và thập phân nên “−5% của 80” hay điểm phần trăm trên biến đổi nhiệt độ đều chạy ổn.",
      },
    ],
  },
  "profit-calculator": {
    name: "Máy tính lợi nhuận",
    tagline:
      "Giá vốn và giá bán vào: lợi nhuận hay lỗ, biên lợi nhuận và phần trăm markup ra — những con số định giá người bán hay nhầm, sắp lại trực tiếp.",
    intro: [
      "Nhập giá vốn của món hàng và giá bạn bán ra, và nhận lợi nhuận (hay lỗ) tuyệt đối cùng hai tỉ lệ mọi người bán cần: margin — lợi nhuận tính trên giá bán — và markup — lợi nhuận tính trên giá vốn.",
      "Vì hai tỉ lệ dùng mẫu số khác nhau, margin 25% tương đương markup 33,3%; công cụ hiển thị cả hai cùng lúc để hóa đơn, báo giá và bảng định giá luôn nhất quán.",
    ],
    steps: [
      "Gõ giá vốn — những gì bạn đã trả.",
      "Gõ giá bán — những gì khách hàng trả.",
      "Đọc lợi nhuận/lỗ và phần trăm margin cùng markup.",
    ],
    faqs: [
      {
        q: "Margin khác markup thế nào?",
        a: "Margin là lợi nhuận ÷ giá bán (phần của doanh thu); markup là lợi nhuận ÷ giá vốn (số cộng lên trên vốn). Hàng mua 80 bán 100 có margin 20% và markup 25%. Nhầm hai cái này âm thầm bào mòn lợi nhuận bạn định đạt.",
      },
      {
        q: "Định giá từ margin mục tiêu thế nào?",
        a: "Lấy giá vốn chia cho (1 − margin mục tiêu): margin 25% trên vốn 80 thì 80 ÷ 0,75 ≈ 106,67. Định theo markup thay thế (80 × 1,25 = 100) chỉ còn margin 20%.",
      },
      {
        q: "Máy tính có gồm phí và thuế?",
        a: "Nó tính trên hai số bạn nhập, nên phí thanh toán, vận chuyển và thuế chỉ hiện nếu bạn gộp chúng vào vốn hay giá trước. Với giá gồm thuế, hãy chạy con số qua máy tính VAT hay GST.",
      },
    ],
  },
  "qr-generator": {
    name: "Trình tạo mã QR",
    tagline:
      "Biến văn bản hay URL bất kỳ thành mã QR sắc nét với kích thước, màu và mức sửa lỗi chỉnh được — tải PNG hay SVG.",
    intro: [
      "Dán liên kết, mật khẩu Wi-Fi, số điện thoại hay văn bản bất kỳ và xem mã QR kết xuất trực tiếp tới 768 px. Chọn mức sửa lỗi từ L (7%) tới H (30%) để mã vẫn quét được khi in nhỏ hay bị che một phần, và chọn màu mã lẫn nền cho khớp thương hiệu.",
      "Mã hóa chạy hoàn toàn trong trình duyệt bằng thư viện qrcode — ảnh được tạo trên thiết bị của bạn và không bao giờ tải lên. Tải PNG cho màn hình hay SVG độc lập độ phân giải cho bản in.",
    ],
    steps: [
      "Gõ hay dán văn bản hay URL cần mã hóa.",
      "Chỉnh kích thước, mức sửa lỗi và hai màu.",
      "Tải kết quả về dạng PNG (màn hình) hay SVG (in, mọi cỡ).",
    ],
    faqs: [
      {
        q: "Nên chọn mức sửa lỗi nào?",
        a: "M (15%) là mặc định hằng ngày. Chọn H (30%) cho mã in trên vải, sticker hay nền rối, hay khi định đặt logo ở giữa — mức càng cao, mã chịu được càng nhiều hư hại.",
      },
      {
        q: "Mã QR có hết hạn hay chứa tracking?",
        a: "Không. Đây là mã tĩnh: văn bản mã hóa nằm ngay trong họa tiết và hoạt động mãi mãi mà không có dịch vụ phía sau. Không redirect, không bộ đếm quét, không phân tích — dữ liệu chỉ là những gì bạn đã gõ.",
      },
      {
        q: "Văn bản hay URL của tôi có bị tải lên đâu không?",
        a: "Không. Thư viện qrcode chạy trong trình duyệt của bạn và vẽ lên canvas cục bộ; cả văn bản lẫn ảnh sinh ra đều không bao giờ rời khỏi thiết bị.",
      },
    ],
  },
  "qr-scanner": {
    name: "Trình quét mã QR",
    tagline:
      "Giải mã QR từ ảnh bất kỳ hay thẳng từ camera — đọc cục bộ trong trình duyệt, kết quả có thể sao chép và mở liên kết, không tải lên gì.",
    intro: [
      "Kéo thả ảnh chụp màn hình hay ảnh chụp mã QR và bộ giải mã đọc ngay trên trang, làm nổi bốn góc được nhận diện trên ảnh. Nếu là URL, bạn có nút sao chép cùng mở liên kết một cú bấm; nội dung khác — thông tin Wi-Fi, vCard, văn bản thuần — ra đúng như được mã hóa, sẵn sàng sao chép.",
      "Thích chĩa camera vào mã? Chế độ trực tiếp phát lên phần tử video cục bộ và phân tích từng khung hình trong bộ nhớ cho tới khi một mã được giải mã, rồi tắt camera ngay. Vì cả hai con đường chạy hoàn toàn trong trình duyệt, ảnh hay luồng camera không bao giờ bị tải lên máy chủ nào, và không có gì được ghi lại.",
    ],
    steps: [
      "Chọn tab “Từ ảnh” và kéo thả hình mã QR, hay chuyển sang “Camera trực tiếp”.",
      "Với camera, bấm Bật camera, cho phép quyền và chĩa vào mã.",
      "Đọc văn bản đã giải mã trong thẻ kết quả.",
      "Sao chép nó, hay mở trực tiếp nếu trông như một liên kết.",
    ],
    faqs: [
      {
        q: "Ảnh hay khung hình camera có rời khỏi thiết bị?",
        a: "Không. Giải mã chạy trên trang này bằng thư viện jsqr, bằng JavaScript: ảnh tải lên được đọc từ điểm ảnh cục bộ còn khung camera được vẽ lên canvas trong bộ nhớ rồi phân tích tại đó. Không có gì được tải lên, ghi log hay lưu, và luồng camera dừng ngay khi tìm thấy mã hay bạn bấm dừng.",
      },
      {
        q: "Camera không bật được — lỗi gì?",
        a: "Thường nhất là trình duyệt đã chặn quyền camera cho trang này; hãy cho phép trên thanh địa chỉ rồi bấm bật lại. Quét trực tiếp còn đòi trang https an toàn, và nếu thiết bị không có camera, công cụ sẽ nói rõ thay vì im lặng thất bại.",
      },
      {
        q: "Quét được những loại nội dung QR nào?",
        a: "Mọi mã QR chuẩn: URL, văn bản thuần, số điện thoại, chuỗi kết nối Wi-Fi, liên hệ vCard, chuỗi thanh toán UPI hay PIX và hơn nữa. Công cụ hiển thị nội dung thô đã giải mã — với mã Wi-Fi hay thanh toán, hãy sao chép văn bản vào app đọc định dạng đó.",
      },
    ],
  },
  "random-name-picker": {
    name: "Vòng quay chọn tên",
    tagline:
      "Dán danh sách, quay vòng và để bốc thăm ngẫu nhiên mật mã chọn người trúng — công bằng cho lớp học, bốc thăm quà và stand-up nhóm.",
    intro: [
      "Gõ hay dán danh sách tên, mỗi tên một dòng, và vòng quay lấp đầy các cung màu cho từng người. Bấm SPIN và nó giảm tốc trong vài giây trước khi dừng ở người trúng, được công bố bằng chữ lớn kèm nút sao chép. Hai tùy chọn phủ nhu cầu quen: xóa tên trùng trước khi bốc, và xóa người trúng sau mỗi lượt để không ai thắng hai lần.",
      "Phần bốc không nằm ở hiệu ứng quay — người trúng được rút từ bộ sinh ngẫu nhiên mật mã của trình duyệt trước khi vòng quay bắt đầu, nên mọi tên có xác suất hệt nhau. Lịch sử bốc trong phiên theo dõi những ai đã được chọn — tiện khi bạn lần lượt qua cả lớp hay hàng chờ giải thưởng.",
    ],
    steps: [
      "Dán tên vào ô, mỗi tên một dòng (từ 2 tới 100 tên).",
      "Bật xóa tên trùng hay xóa người đã trúng nếu cần.",
      "Bấm SPIN và chờ vòng quay dừng.",
      "Đọc tên trúng, sao chép nếu cần, và xem lịch sử bốc bên dưới.",
    ],
    faqs: [
      {
        q: "Lượt bốc thực sự ngẫu nhiên cỡ nào?",
        a: "Người trúng được chọn bằng crypto.getRandomValues — bộ sinh ngẫu nhiên mật mã của trình duyệt — dùng lấy mẫu từ chối để tránh thiên lệch modulo. Đó là nguồn mà trình duyệt dùng cho khóa bảo mật, không phải đường tắt giả ngẫu nhiên, nên mọi mục có xác suất giống hệt. Hiệu ứng quay dừng ở người đã được rút sẵn; nó không thể đổi kết quả.",
      },
      {
        q: "Vòng quay chứa được bao nhiêu tên?",
        a: "Từ 2 tới 100. Tên bị cắt bằng dấu ba chấm trên vòng để các cung vẫn dễ đọc, nhưng thẻ người trúng luôn hiển thị tên đầy đủ. Từ khoảng 60 tên trở lên, nhãn bị bỏ khỏi vòng hoàn toàn — lượt bốc vẫn chính xác tuyệt đối.",
      },
      {
        q: "Bốc nhiều người trúng liên tiếp được không?",
        a: "Được. Bật “Xóa người trúng sau mỗi lượt” và mỗi lượt rút sẽ tự loại người đó khỏi danh sách, nên không ai bị chọn hai lần. Bảng lịch sử bên dưới ghi lại mọi lượt bốc trong phiên này, đúng thứ tự, kèm dấu thời gian.",
      },
    ],
  },
  "roman-numeral": {
    name: "Chuyển đổi số La Mã",
    tagline:
      "Chuyển số sang chữ số La Mã và ngược lại, theo cả hai chiều cùng lúc — với kiểm tra nghiêm ngặt theo quy tắc cổ điển của phép trừ.",
    intro: [
      "Nhập số Ả Rập (1–3999) để xem dạng La Mã, hay gõ chữ số để nhận số — cả hai ô đều trực tiếp nên bạn sửa bên nào cũng được. Bộ phân tích áp quy tắc cổ điển: I trước V/X, X trước L/C, C trước D/M.",
      "Tiện cho mặt đồng hồ, số chương sách, năm phim, bia kỷ niệm và số Super Bowl — bất cứ nơi nào chữ số La Mã vẫn xuất hiện.",
    ],
    steps: [
      "Nhập số từ 1 tới 3999 để nhận chữ số La Mã.",
      "Hay gõ chữ số La Mã — số xuất hiện ngay.",
      "Dạng không hợp lệ như VIIII hay IM bị cảnh báo kèm giải thích quy tắc.",
    ],
    faqs: [
      {
        q: "Vì sao 4000 là giới hạn trên (MMMCMXCIX)?",
        a: "Ký hiệu La Mã cổ điển không có chữ số nào lớn hơn M (1000), và lặp M bốn lần (MMMM) không được dùng. Số lớn nhất viết được dạng cổ điển nghiêm ngặt là 3999, tức MMMCMXCIX.",
      },
      {
        q: "Vì sao VIIII bị từ chối khi đồng hồ thỉnh thoảng vẫn hiện?",
        a: "Vài mặt đồng hồ dùng dạng cộng IIII cho số bốn, nhưng hệ cổ điển chuẩn đòi phép trừ IV. Công cụ kiểm tra theo regex chuẩn nghiêm ngặt nên VIIII, IC hay IM bị cảnh báo thay vì âm thầm chuyển đổi.",
      },
      {
        q: "Bộ chuyển đổi nhận chữ thường?",
        a: "Có — đầu vào như mcmxciv được tự viết hoa và chuyển thành 1994. Kết quả luôn hiển thị chữ hoa, như truyền thống khắc bia.",
      },
    ],
  },
  "scientific-calculator": {
    name: "Máy tính khoa học",
    tagline:
      "Máy tính khoa học đầy đủ ngay trong trình duyệt: lượng giác, log, ln, luỹ thừa và căn với kết quả trực tiếp — không eval, không máy chủ, không theo dõi.",
    intro: [
      "Bàn phím bấm cộng dòng biểu thức gõ được: sin, cos, tan (DEG/RAD), log₁₀, ln, căn bậc hai, bình phương, luỹ thừa tùy ý, ngoặc, π và e. Bản xem kết quả cập nhật khi bạn gõ, và dấu = gộp nó trở lại biểu thức để tính chuỗi.",
      "Biểu thức được phân tích bởi bộ đánh giá recursive-descent viết tay cho trang này — eval và Function constructor của JavaScript không bao giờ được dùng, và không có gì được gửi đi đâu. Nhân ngầm (2π, 3(4+1)) hoạt động sẵn.",
    ],
    steps: [
      "Bấm bàn phím hay gõ biểu thức bằng bàn phím máy tính.",
      "Chuyển DEG/RAD cho hàm lượng giác khi cần.",
      "Bấm = để chốt kết quả đã xem trước, rồi tiếp tục tính trên nó.",
    ],
    faqs: [
      {
        q: "Biểu thức được đánh giá thế nào?",
        a: "Bằng một bộ token hóa nhỏ và parser recursive-descent viết ngay trong trang: số, hằng số, hàm, ngoặc, âm một ngôi, % và x² hậu tố, luỹ thừa kết hợp phải, và nhân ngầm giữa các giá trị kề nhau. Đầu vào không hợp lệ chỉ hiện lỗi thay vì thực thi bất cứ gì.",
      },
      {
        q: "Lấy tang của 45 độ thế nào?",
        a: "Giữ bật công tắc DEG (đây là mặc định), bấm tan, rồi 45 và =. Với radian — ví dụ tan(π/4) — chuyển sang RAD và gõ tan(π/4) trực tiếp.",
      },
      {
        q: "Vì sao kết quả của tôi có số chữ số giới hạn?",
        a: "Kết quả được làm tròn tới 12 chữ số có nghĩa để giấu nhiễu dấu phẩy động như 0,30000000000000004. Độ chính xác vượt 12 chữ số vốn hiếm khi có nghĩa trên phần cứng dấu phẩy động nhị phân.",
      },
    ],
  },
  "timestamp-converter": {
    name: "Chuyển đổi Unix Timestamp",
    tagline:
      "Chuyển Unix giây hay miligây thành ngày tháng đọc được và ngược lại, với đồng hồ trực tiếp, giờ máy và UTC — tất cả trong trình duyệt của bạn.",
    intro: [
      "Bộ đếm trực tiếp hiển thị Unix timestamp hiện tại theo giây và miligây với sao chép một cú bấm. Dán timestamp và nó được giải mã thành giờ máy và UTC — giá trị 10 chữ số được coi là giây, 13 chữ số là miligây, tự động.",
      "Chiều ngược lại, chọn ngày giờ để nhận timestamp chính xác. Mọi thứ tính cục bộ từ đồng hồ thiết bị; timestamp độc lập múi giờ theo bản chất nên con số giống nhau ở bất cứ đâu trên đất.",
    ],
    steps: [
      "Sao chép timestamp hiện tại trực tiếp, hay dán một cái vào ô giải mã.",
      "Đọc ngày tháng dạng máy và UTC; giây hay miligây được tự nhận diện.",
      "Hay chọn ngày-giờ để nhận Unix timestamp theo giây và miligây.",
    ],
    faqs: [
      {
        q: "Unix timestamp chính xác là gì?",
        a: "Số giây trôi qua từ 1970-01-01 00:00:00 UTC, không tính giây nhuận. Đây là cách máy tính lưu điểm thời gian chuẩn vì việc sắp xếp và trừ trở nên tầm thường. Timestamp miligây (13 chữ số) phổ biến trong JavaScript và Java.",
      },
      {
        q: "Công cụ biết số của tôi là giây hay miligây thế nào?",
        a: "Theo độ lớn: giá trị dưới một nghìn tỷ không thể mô tả ngày hiện đại theo miligây nên được đọc là giây; giá trị 13 chữ số được đọc là miligây. Kết quả nói rõ đã áp cách hiểu nào.",
      },
      {
        q: "Cùng timestamp có giải mã khác nhau giữa các múi giờ?",
        a: "Số thô không bao giờ đổi — nó mã hóa một khoảnh khắc tuyệt đối. Chỉ cách hiển thị cho người đọc khác nhau, vì thế công cụ hiển thị giờ máy và UTC cạnh nhau.",
      },
    ],
  },
  "tip-calculator": {
    name: "Máy tính tiền tip",
    tagline:
      "Hóa đơn cộng phần trăm tip cộng chia đều cho bạn bè: xem tiền tip, tổng và chính xác mỗi người phải trả — trực tiếp, khỏi tính nhẩm ngay bàn ăn.",
    intro: [
      "Nhập hóa đơn, chạm mức tip có sẵn (10/15/18/20/25%) hay gõ riêng, rồi nói có bao nhiêu người chia. Bạn lập tức nhận số tiền tip, tổng cộng và phần mỗi người, để không ai phải tính nhẩm trong lúc nhân viên phục vụ đứng đợi.",
      "Mọi thứ tính lại trực tiếp khi số liệu đổi, dùng cho mọi loại tiền, và chạy hoàn toàn trên thiết bị của bạn — tiện khi đi nước ngoài, nơi kết nối dữ liệu của bạn có thể là cái đáng tin duy nhất.",
    ],
    steps: [
      "Gõ số tiền hóa đơn.",
      "Chọn mức tip có sẵn hay nhập phần trăm riêng.",
      "Đặt số người và đọc phần mỗi người phải trả.",
    ],
    faqs: [
      {
        q: "Nên tip bao nhiêu?",
        a: "Tùy nơi bạn ở: 15–20% hóa đơn chưa thuế là thông lệ ở Mỹ, 10–15% ở phần lớn châu Âu và Mỹ Latinh, còn làm tròn lên là bình thường ở Nhật và Trung Quốc nơi người ta không mong tip. Phân vân thì mức 10% an toàn gần như mọi nơi.",
      },
      {
        q: "Nên tính tip trước hay sau thuế?",
        a: "Phép lịch sự truyền thống là tip trên phần chưa thuế, nhưng thực tế đa số người tip trên tổng mà hóa đơn thẻ hiển thị. Nếu muốn chuẩn xác, nhập số chưa thuế làm hóa đơn và cộng thuế riêng cho phần chia.",
      },
      {
        q: "Phần mỗi người có giả định chia đều?",
        a: "Có — hóa đơn cộng tip được chia đều theo số người. Với phần không đều (ai đó chỉ gọi salad), hãy tính phần dùng chung như một subtotal trước rồi cộng món riêng lên trên.",
      },
    ],
  },
  "timezone-converter": {
    name: "Chuyển đổi múi giờ",
    tagline:
      "So sánh giờ ở 21 thành phố lớn với đồng hồ trực tiếp và bảng từng giờ — xử lý DST chính xác, mọi thứ chạy trong trình duyệt của bạn.",
    intro: [
      "Chọn hai thành phố bất kỳ từ Los Angeles tới Tokyo và xem cả hai đồng hồ trực tiếp cạnh nhau, chênh lệch giờ chính xác cho hôm nay, và bảng so sánh 24 dòng cho biết mỗi giờ trong ngày trở thành mấy giờ ở thành phố kia — cách nhanh nhất tìm khung họp qua các múi giờ.",
      "Việc chuyển đổi dùng cơ sở dữ liệu múi giờ IANA dựng sẵn trong trình duyệt nên các lần chuyển giờ mùa đi đúng từng phút mà không cần gọi mạng.",
    ],
    steps: [
      "Chọn thành phố xuất phát — đồng hồ giờ máy của nó hiện bên dưới.",
      "Chọn thành phố đích; đồng hồ và chênh lệch UTC cập nhật ngay.",
      "Quét bảng từng giờ để tìm khung giờ hợp cả hai bên.",
      "Dùng nút đảo chiều để hoán đổi hai thành phố.",
    ],
    faqs: [
      {
        q: "Bộ chuyển đổi xử lý giờ mùa hè không?",
        a: "Có. Chênh lệch được tính bằng quy tắc múi giờ IANA của chính trình duyệt cho ngày hôm nay nên thành phố đang áp DST hiển thị đúng giờ dịch chuyển, và bảng giờ phản ánh đồng hồ thật của cả hai bên.",
      },
      {
        q: "Vì sao bảng giờ hiện ngày khác ở một số dòng?",
        a: "Khi hai thành phố cách xa, ngày lịch của một bên đổi giữa ngày. Mỗi dòng hiển thị ngày của đích cạnh giờ để bạn thấy ví dụ 9:00 ở Thượng Hải vẫn là 21:00 tối hôm trước ở New York.",
      },
      {
        q: "Công cụ có cần internet?",
        a: "Không. Giờ thành phố đến từ cơ sở dữ liệu múi giờ dựng sẵn trong trình duyệt và đồng hồ thiết bị của bạn — không tải gì về và không chia sẻ vị trí nào.",
      },
    ],
  },
  "vat-calculator": {
    name: "Máy tính VAT",
    tagline:
      "Cộng VAT vào giá chưa thuế hay tách khỏi giá tổng ở mức thuế tùy ý — số chưa thuế, VAT và tổng trực tiếp, riêng tư, tức thì.",
    intro: [
      "Chạy cả hai chiều cho mức thuế của bất kỳ quốc gia nào: gõ 20 cho Anh, 21 cho Hà Lan, 19 cho Đức — hay bất kỳ mức nào. Cộng thuế vào số chưa thuế, hay tách phần VAT đang nấp trong giá tổng (đã gồm thuế).",
      "Mọi thứ được tính cục bộ trong trình duyệt — không tải lên, không tài khoản — nên an toàn cho bản nháp định giá và hóa đơn chưa phát hành.",
    ],
    steps: [
      "Gõ số tiền — chưa thuế nếu cộng VAT, tổng nếu tách ra.",
      "Nhập mức VAT theo phần trăm (ví dụ 20).",
      "Chọn Cộng thuế hay Tách thuế; số chưa thuế, VAT và tổng xuất hiện ngay.",
    ],
    faqs: [
      {
        q: "Tính VAT ngược từ giá tổng thế nào?",
        a: "Chưa thuế = tổng ÷ (1 + mức ÷ 100). Với giá tổng 120 bảng ở VAT 20%: 120 ÷ 1,2 = 100 chưa thuế, VAT 20. Chế độ “Tách thuế” làm giúp bạn và hiển thị cả ba con số.",
      },
      {
        q: "VAT khác GST thế nào?",
        a: "Chúng là cùng một loại thuế — giá trị gia tăng ở từng khâu chuỗi cung ứng, cuối cùng do người tiêu dùng gánh. “VAT” là tên phổ biến ở châu Âu, Anh và phần lớn châu Phi, châu Á; Ấn Độ và vài nước khác gọi phiên bản thống nhất của họ là GST.",
      },
      {
        q: "Nên dùng mức VAT nào?",
        a: "Mức áp dụng cho hàng hóa hay dịch vụ và khu vực pháp lý của bạn: mức chuẩn dao động 0% tới 27% trên thế giới, và đa số quốc gia còn có mức giảm cho thực phẩm, sách hay thuốc. Phân vân thì xem bảng hiện hành của cơ quan thuế.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Nhà phát triển / Tiện ích — CSV ⇄ Excel, tương phản, điểm           */
  /* ------------------------------------------------------------------ */
  "csv-to-excel": {
    name: "CSV sang Excel",
    tagline:
      "Chuyển CSV thành tệp .xlsx thật ngay trong trình duyệt — tự nhận diện dấu phẩy, chấm phẩy hay tab, giữ nguyên dấu ngoặc kép và xuống dòng bên trong ô.",
    intro: [
      "Dán CSV hoặc thả tệp .csv rồi tải về một sổ làm việc Excel thật, không phải tệp văn bản đổi đuôi. Bộ máy tuân theo RFC 4180: trường có ngoặc kép, ngoặc kép nhân đôi và xuống dòng trong ô đều được đọc đúng, còn số sạch (9.5, -3, 0) trở thành ô số thật.",
      "Hàng đầu tiên được coi là tiêu đề (có thể tắt, khi đó Column 1…N sẽ được thêm tự động), tên trang tính tùy ý, và các mã kiểu 007 vẫn là văn bản để giữ số 0 ở đầu. Dữ liệu không rời khỏi thiết bị của bạn.",
    ],
    steps: [
      "Dán CSV vào ô nhập hoặc thả tệp .csv vào.",
      "Kiểm tra dấu phân cách nhận diện và tùy chọn hàng tiêu đề.",
      "Đổi tên trang tính nếu Sheet1 không vừa ý.",
      "Tải về .xlsx và mở bằng Excel, Numbers hoặc Google Sheets.",
    ],
    faqs: [
      {
        q: "Số của tôi có thành số thật trong Excel không?",
        a: "Có — ô có giá trị số sạch (9.5, -3, 0) được ghi thành ô số nên SUM và biểu đồ dùng được ngay. Các giá trị như 007 hay 1e3 cố ý giữ dạng văn bản vì chuyển đổi sẽ làm thay đổi ý nghĩa của chúng.",
      },
      {
        q: "CSV của tôi dùng chấm phẩy, có cần cấu hình gì không?",
        a: "Không. Dấu phân cách được nhận diện bằng cách đếm các ứng viên ngoài ngoặc kép; bạn cũng có thể tự chọn. Dấu phẩy trong ô, ngoặc kép nhân đôi và xuống dòng đều được bảo toàn sau chuyển đổi.",
      },
    ],
  },
  "excel-to-csv": {
    name: "Excel sang CSV",
    tagline:
      "Biến bất kỳ sổ .xlsx hay .xls nào thành CSV sạch — chọn trang tính và dấu phân cách rồi tải về. Ngoặc kép, dấu phẩy và xuống dòng được thoát đúng chuẩn.",
    intro: [
      "Thả tệp .xlsx, .xlsm hoặc .xls và nhận CSV chuẩn RFC 4180. Nếu sổ có nhiều trang tính, bạn chọn trang cần xuất — CSV không thể chứa nhiều trang nên mỗi tệp một trang là cách ánh xạ trung thực. Số xuất ra đúng giá trị bảng đang hiển thị.",
      "Đầu ra chỉ đặt ngoặc kép cho ô cần thiết, nhân đôi ngoặc bên trong và giữ nguyên xuống dòng trong ô — kết quả nhập lại vào Excel, cơ sở dữ liệu hay script không gặp bất ngờ. Sao chép trực tiếp hoặc tải về UTF-8 có BOM để Excel mở đúng bộ mã.",
    ],
    steps: [
      "Thả tệp .xlsx, .xlsm hoặc .xls vào vùng thả.",
      "Nếu có nhiều trang tính, chọn trang cần xuất.",
      "Chọn dấu phẩy, chấm phẩy hoặc tab làm dấu phân cách đầu ra.",
      "Sao chép CSV hoặc tải về tệp .csv UTF-8.",
    ],
    faqs: [
      {
        q: "Trang tính nào được chuyển đổi?",
        a: "Mặc định là trang đầu tiên. Khi sổ có nhiều trang, bộ chọn hiện ngay trên phần xem trước; mỗi lần xuất chỉ gồm đúng một trang vì định dạng CSV không lưu được nhiều trang.",
      },
      {
        q: "Công thức và định dạng thì sao?",
        a: "Bạn nhận được giá trị tính cuối cùng đúng như ô hiển thị — không phải công thức. Ô đang hiển thị 1.234,50 sẽ xuất với giá trị đó, còn định dạng như ký hiệu tiền tệ giữ nguyên theo hiển thị.",
      },
    ],
  },
  "contrast-checker": {
    name: "Kiểm tra tương phản",
    tagline:
      "Tính tỷ lệ tương phản WCAG giữa hai màu cùng kết quả đậu / rớt AA và AAA cho chữ thường và chữ lớn, kèm xem trước trực tiếp. Tất cả chạy ngay trong trình duyệt.",
    intro: [
      "Nhập màu chữ và màu nền — dạng hex như #333 hay #1F2937, hoặc rgb()/rgba() — và đọc tỷ lệ tương phản WCAG với hai chữ số thập phân, cùng kết quả ngay lập tức của bốn ngưỡng quan trọng: AA và AAA, chữ thường và chữ lớn. Phần xem trước hiển thị một đoạn văn và một tiêu đề lớn bằng màu thật.",
      "Phép tính dùng công thức độ sáng tương đối chính thức của WCAG 2.x — giống hệt bộ kiểm tra của W3C — nên 4.5 ở đây là 4.5 ở mọi nơi. Trong các cặp mẫu có cặp xám 4.54:1 cho bạn thấy ngưỡng AA khít đến mức nào.",
    ],
    steps: [
      "Nhập giá trị hex hoặc rgb(), hoặc dùng bộ chọn màu, cho màu chữ.",
      "Làm tương tự với màu nền.",
      "Đọc tỷ lệ và kết quả AA / AAA, hoặc chạm vào một cặp mẫu.",
      "Tự đánh giá cặp màu bằng mắt qua khối xem trước.",
    ],
    faqs: [
      {
        q: "Cần tỷ lệ tương phản bao nhiêu để đạt?",
        a: "Theo WCAG 2.x: chữ thường cần 4.5:1 cho AA và 7:1 cho AAA. Chữ lớn — từ 24 px, hoặc 18.7 px đậm — cần 3:1 cho AA và 4.5:1 cho AAA. Thành phần giao diện và đồ họa cần 3:1.",
      },
      {
        q: "Tỷ lệ được tính thế nào?",
        a: "Mỗi màu được tuyến tính hóa từ sRGB rồi gộp thành độ sáng tương đối L = 0.2126·R + 0.7152·G + 0.0722·B; tỷ lệ bằng (L sáng + 0.05) / (L tối + 0.05) — đúng công thức trong đặc tả WCAG 2.x. Alpha của rgba() nhỏ hơn 1 được dẹt lên nền trắng trước khi tính.",
      },
    ],
  },
  "grade-calculator": {
    name: "Máy tính điểm",
    tagline:
      "Máy tính điểm theo trọng số hoặc theo điểm: thêm bài tập, theo dõi điểm và xếp hạng hiện tại theo thời gian thực, và biết chính xác cần bao nhiêu ở bài thi cuối kỳ.",
    intro: [
      "Thêm từng bài tập với điểm, điểm tối đa và (ở chế độ trọng số) trọng số phần trăm — điểm tổng và xếp hạng cập nhật liên tục. Chế độ theo điểm chỉ nhìn điểm đạt được trên tổng điểm tối đa, đúng kiểu chấm của nhiều môn khoa học.",
      "Máy tính bài thi cuối trả lời câu hỏi bạn thật sự quan tâm: nếu bài cuối chiếm X% hoặc X điểm thì cần bao nhiêu để đạt mục tiêu tổng? Nó nói thẳng khi mục tiêu đã chắc chắn hay về mặt toán học là không thể, và thang điểm có thể đổi: A–F thang 10, có cộng/trừ, Đạt / Không đạt hoặc ngưỡng tự chọn.",
    ],
    steps: [
      "Thêm một hàng cho mỗi bài tập: tên (tùy chọn), điểm, điểm tối đa và trọng số ở chế độ trọng số.",
      "Chuyển giữa Trọng số và Điểm cho đúng cách môn học của bạn chấm điểm.",
      "Nhập trọng số hoặc điểm của bài thi cuối cùng tỷ lệ mục tiêu tổng.",
      "Đọc số điểm cần đạt ở bài thi cuối, hoặc chọn thang xếp hạng mong muốn.",
    ],
    faqs: [
      {
        q: "Chế độ trọng số và chế độ điểm khác nhau thế nào?",
        a: "Chế độ trọng số gán cho mỗi bài một trọng số phần trăm và tính Σ(trọng số × điểm ÷ tối đa) ÷ Σtrọng số. Chế độ điểm bỏ qua trọng số: điểm đạt chia tổng điểm tối đa. Bài 90/100 ở chế độ điểm ngang với bài kiểm tra 45/50, còn ở chế độ trọng số chỉ đáng đúng phần trọng số của nó.",
      },
      {
        q: "Trọng số của tôi không cộng đủ 100% thì sao?",
        a: "Không sao. Điểm hiện tại được chuẩn hóa theo đúng trọng số bạn đã nhập, nên môn mới chấm được một nửa vẫn hiện con số công bằng. Phần tính bài thi cuối xếp trọng số của kỳ thi lên trên trọng số đã chấm, đúng như đề cương quy định. Kết quả trên 100% nghĩa là mục tiêu ngoài tầm với; số âm nghĩa là đã chắc chắn.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Image                                                               */
  /* ------------------------------------------------------------------ */
  "image-border": {
    name: "Viền ảnh",
    tagline:
      "Thêm viền màu đặc hoặc trong suốt quanh một ảnh hay cả lô — xem trước trực tiếp, xuất PNG hay JPG, chạy hoàn toàn trong trình duyệt của bạn.",
    intro: [
      "Viền làm khung ảnh chụp màn hình, ảnh sản phẩm và avatar mà không cần mở phần mềm chỉnh sửa. Kéo thả một ảnh hay cả lô, kéo thanh độ rộng và chọn kiểu đệm: canvas mở rộng ra ngoài, không một điểm ảnh nào của bản gốc bị cắt hay đổi tỉ lệ.",
      "Đệm trong suốt giữ khung nhìn xuyên qua ở đầu ra PNG — tiện cho sticker và ảnh đã tách nền trên mọi phông. Màu đặc thì dùng ở đâu cũng được, kể cả JPG, và mỗi tệp được xử lý ngay trên thiết bị của bạn.",
    ],
    steps: [
      "Kéo thả một ảnh hay cả lô.",
      "Kéo thanh độ rộng viền và xem bản xem trước trực tiếp.",
      "Chọn đệm trong suốt hay màu đặc, và đầu ra PNG hay JPG.",
      "Thêm viền cho tất cả ảnh rồi tải từng kết quả về, hoặc gộp một ZIP.",
    ],
    faqs: [
      {
        q: "Viền có làm ảnh bị cắt hay thu nhỏ không?",
        a: "Không. Canvas nở ra gấp đôi độ rộng viền — mỗi bên một viền — và ảnh của bạn được đặt bên trong ở kích thước đầy đủ. Không có gì bị cắt, phóng to hay dịch chuyển.",
      },
      {
        q: "Khi nào nên chọn viền trong suốt?",
        a: "Đệm trong suốt chỉ có ý nghĩa với đầu ra PNG: khung nhìn xuyên qua nên ảnh hợp mọi phông. JPG không có kênh alpha, nên ở đó viền được tô bằng màu đặc bạn đã chọn.",
      },
      {
        q: "Vì sao không có JPG với đệm trong suốt?",
        a: "JPG không lưu được độ trong suốt — lưu thì khung sẽ thành màu trắng. Công cụ tự chuyển sang PNG bất cứ khi nào đệm trong suốt được chọn; muốn JPG thì chọn tùy chọn Màu.",
      },
    ],
  },
  "image-splitter": {
    name: "Chia ảnh",
    tagline:
      "Cắt một ảnh thành lưới đều các ô PNG theo hàng × cột — xem trước lưới trực tiếp, tải về ZIP, mọi thứ xử lý cục bộ ngay trong trình duyệt.",
    intro: [
      "Cắt ảnh lớn thành các ô lưới cho dàn lưới Instagram, layout in ấn, sprite sheet hay các bước trình chiếu. Chọn 2–6 hàng và 2–6 cột, xem lưới khớp lên ảnh của bạn, rồi xuất từng ô dưới dạng PNG không mất dữ liệu.",
      "Các ô cắt từ cùng một ảnh giữ đúng vị trí điểm ảnh nên ghép lại hoàn hảo. Khi kích thước không chia hết, ô thường dùng kích thước nguyên điểm ảnh và hàng và cột cuối hấp thụ phần dư — không có gì bị kéo giãn.",
    ],
    steps: [
      "Kéo thả một ảnh.",
      "Đặt số hàng và số cột (mỗi loại 2–6) — bản xem trước hiển thị lưới.",
      "Chia thành các ô và kiểm tra từng mảnh.",
      "Tải từng ô về hoặc gộp tất cả vào một ZIP.",
    ],
    faqs: [
      {
        q: "Nếu kích thước không chia hết cho lưới thì sao?",
        a: "Ô thường có kích thước floor(chiều rộng ÷ cột) × floor(chiều cao ÷ hàng) điểm ảnh, và hàng cùng cột cuối nhận phần dư. Ảnh 305 × 205 chia 3 cột × 2 hàng cho các ô 101 × 102 px, cột cuối rộng 103 px. Mỗi ô là số nguyên điểm ảnh — không kéo giãn, không kẽ hở.",
      },
      {
        q: "Các ô được đặt tên theo thứ tự nào?",
        a: "Từng hàng, từ trái sang phải: photo-r1c1.png, photo-r1c2.png … photo-r3c4.png. Hậu tố rNcM nói chính xác từng ô nằm ở đâu, nên ghép lại chẳng khó gì.",
      },
      {
        q: "Vì sao đầu ra là PNG?",
        a: "PNG không mất dữ liệu nên ô giữ nguyên điểm ảnh của nguồn. Điều đó quan trọng khi các mảnh sẽ được ghép lại hay dùng làm sprite.",
      },
    ],
  },
  "crop-circle-image": {
    name: "Cắt ảnh tròn",
    tagline:
      "Cắt một ảnh hay cả lô thành hình tròn căn giữa với bốn góc trong suốt — thanh thu nhỏ, xem trước trực tiếp, đầu ra PNG không mất dữ liệu, trong trình duyệt.",
    intro: [
      "Avatar tròn, ảnh đại diện, huy hiệu và sticker đều bắt đầu từ một lần cắt tròn. Công cụ đặt hình tròn vào giữa mỗi ảnh, giữ phần bên trong và bỏ bốn góc thành vùng trong suốt — đường kính khởi điểm từ cạnh ngắn hơn, và thanh trượt thu nhỏ theo phần trăm nếu bạn muốn chừa lề.",
      "Đầu ra luôn là PNG để các góc thật sự trong suốt, không phải trắng. Kéo thả cả lô để chuyển nhiều ảnh cùng lúc, xem trước ảnh đầu tiên trực tiếp, và tải từng hình tròn về riêng.",
    ],
    steps: [
      "Kéo thả một ảnh hay cả lô.",
      "Kéo thanh thu nhỏ nếu muốn hình tròn nhỏ hơn toàn bộ cạnh ngắn hơn.",
      "Kiểm tra bản xem trước trực tiếp của ảnh đầu tiên.",
      "Cắt tất cả ảnh thành hình tròn và tải từng PNG về.",
    ],
    faqs: [
      {
        q: "Cái gì quyết định kích thước hình tròn?",
        a: "Mặc định đường kính bằng cạnh ngắn hơn của ảnh: ảnh vuông thành hình tròn trọn, ảnh chữ nhật được cắt theo hình tròn căn giữa lớn nhất vừa khít. Thanh trượt thu nhỏ giảm đường kính đó theo phần trăm.",
      },
      {
        q: "Các góc có bị trắng không?",
        a: "Không — đầu ra là PNG có kênh alpha thật, nên vùng ngoài hình tròn trong suốt hoàn toàn và kết quả nằm gọn gàng trên mọi phông.",
      },
      {
        q: "Ảnh của tôi có bị mã hóa lại và giảm chất lượng không?",
        a: "Các điểm ảnh trong hình tròn được sao chép nguyên vẹn vào PNG không mất dữ liệu. Chỉ phần ngoài biến mất; bên trong không bị đổi tỉ lệ hay nén lại.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Developer                                                           */
  /* ------------------------------------------------------------------ */
  "base64-image": {
    name: "Ảnh Base64",
    tagline:
      "Chuyển ảnh thành data URL base64 và ngược lại — xem trước, kiểm tra, tải xuống, kèm so sánh kích thước chính xác. Mọi thứ chạy trong trình duyệt của bạn.",
    intro: [
      "Kéo thả một ảnh PNG, JPEG, GIF, WebP hay SVG và nhận ngay URL data:image/…;base64,… sẵn sàng dán vào CSS, HTML hay JSON nội tuyến. Công cụ hiển thị kích thước tệp gốc cạnh kích thước văn bản thu được, nên bạn thấy mức phình ~33% của base64 trước khi quyết định nhúng.",
      "Dán một data URL và chế độ xem ngược sẽ giải mã nó: ảnh được xem trước, MIME khai báo được đối chiếu với byte thật, và nút tải xuống lưu lại thành tệp. base64 không hợp lệ hay kiểu không phải ảnh sẽ thất bại với thông báo rõ ràng thay vì bản xem trước lỗi.",
    ],
    steps: [
      "Kéo thả ảnh vào khung (hoặc dán từ clipboard) để mã hóa.",
      "Sao chép data URL — hoặc chỉ phần base64 — và xem so sánh kích thước trước khi nhúng.",
      "Chuyển sang tab giải mã, dán bất kỳ data URL ảnh nào, rồi xem trước hoặc tải xuống.",
    ],
    faqs: [
      {
        q: "Khi nào đáng nhúng ảnh dưới dạng data URL?",
        a: "Với icon nhỏ, avatar và placeholder khi tải. Base64 làm văn bản lớn hơn nhị phân ~33%, nên dưới vài kilobyte bạn thường tiết kiệm được một yêu cầu HTTP; với ảnh chụp, chi phí phát sinh gần như luôn lớn hơn lợi ích.",
      },
      {
        q: "Vì sao bản base64 lại lớn hơn tệp của tôi?",
        a: "Base64 mã hóa mỗi 3 byte thành 4 ký tự văn bản — phình cố định 33%, cộng thêm tiền tố data:image/…;base64,. Không có gì nén hay mất đi; đó chỉ đơn giản là biểu diễn văn bản an toàn của chính những byte đó.",
      },
      {
        q: "Bộ giải mã hỗ trợ những định dạng nào?",
        a: "Bất cứ gì trình duyệt của bạn vẽ được như ảnh: PNG, JPEG, GIF, WebP, SVG, BMP, AVIF và hơn nữa. Công cụ xác minh payload là base64 hợp lệ, MIME khai báo là kiểu ảnh, và cảnh báo khi magic byte của tệp không khớp kiểu đã khai báo.",
      },
    ],
  },
  "html-to-markdown": {
    name: "HTML sang Markdown",
    tagline:
      "Biến HTML thành Markdown sạch ngay khi gõ — tiêu đề, danh sách, liên kết, ảnh và code, với tiêu đề ATX hoặc Setext và dấu đầu dòng tùy chọn của bạn.",
    intro: [
      "Dán markup từ trang web, bản xuất CMS hay email và nhận ngay Markdown dễ đọc. Việc chuyển đổi do turndown, thư viện chuẩn HTML-to-Markdown, đảm nhiệm: tiêu đề, nhấn mạnh, liên kết, ảnh, danh sách có thứ tự và không thứ tự, blockquote và khối code đều ánh xạ sang tương đương Markdown của chúng.",
      "Hai tùy chọn nhỏ đáp ứng đa số style guide: tiêu đề kiểu ATX (# Tiêu đề) hay Setext (gạch chân), và chọn -, * hay + làm dấu đầu dòng cho danh sách không thứ tự. Kết quả cập nhật trực tiếp khi bạn gõ hoặc đổi tùy chọn.",
    ],
    steps: [
      "Dán HTML của bạn vào khung nhập.",
      "Markdown hiện trực tiếp — chỉnh kiểu tiêu đề hay dấu đầu dòng nếu style guide của bạn muốn khác.",
      "Sao chép Markdown hoặc tải xuống dưới dạng tệp .md.",
    ],
    faqs: [
      {
        q: "HTML nào được chuyển đổi, phần còn lại thì sao?",
        a: "Markup tài liệu chuẩn — tiêu đề, đoạn văn, danh sách, liên kết, ảnh, nhấn mạnh, code, blockquote và đường kẻ ngang — được chuyển đổi trọn vẹn. Các phần tử không có tương đương Markdown, như bảng và form, bị làm phẳng thành nội dung văn bản của chúng.",
      },
      {
        q: "Tiêu đề ATX khác Setext thế nào?",
        a: "ATX viết tiêu đề bằng dấu # ở đầu (## Tiêu đề); Setext gạch chân bằng === cho H1 hay --- cho H2. Setext chỉ hỗ trợ hai cấp, nên tiêu đề sâu hơn luôn quay về dấu # kiểu ATX.",
      },
      {
        q: "HTML của tôi có rời trình duyệt không?",
        a: "Không. Việc chuyển đổi chạy cục bộ bằng turndown trong trình duyệt — không có gì được tải lên, kể cả khi bạn tải tệp .md.",
      },
    ],
  },
  "xml-to-json": {
    name: "XML sang JSON",
    tagline:
      "Chuyển XML thành JSON ngay trong trình duyệt — thuộc tính trở thành khóa @, phần tử lặp gộp thành mảng, còn đầu vào lỗi cho thông báo rõ theo dòng.",
    intro: [
      "Dán mục sitemap, mục RSS, phản hồi SOAP hay tệp cấu hình và nhận ngay JSON được định dạng đẹp. Việc chuyển đổi dùng fast-xml-parser với thuộc tính được giữ lại: mỗi thuộc tính giữ nguyên làm khóa có tiền tố @, các phần tử anh em trùng tên gộp thành mảng, và nội dung văn bản nằm dưới #text khi phần tử cũng có thuộc tính.",
      "Đầu vào lỗi không bao giờ cho ra nửa vời kết quả phỏng đoán: tài liệu được xác thực trước, và lỗi chỉ đúng dòng vi phạm — thiếu thẻ đóng chỉ cần sửa một dòng.",
    ],
    steps: [
      "Dán XML của bạn vào khung bên trái.",
      "JSON được định dạng xuất hiện bên phải ngay khi bạn gõ.",
      "Sao chép JSON khi ưng ý.",
    ],
    faqs: [
      {
        q: "Thuộc tính được biểu diễn trong JSON thế nào?",
        a: 'Mỗi thuộc tính trở thành khóa có tiền tố @ — <book id="7"> trả về dưới dạng { "@id": "7" }. Giá trị thuộc tính giữ nguyên là chuỗi, còn văn bản trông như số hay boolean được chuyển sang kiểu JSON tương ứng.',
      },
      {
        q: "Phần tử lặp thì sao?",
        a: "Các phần tử anh em trùng tên thành mảng JSON. Lưu ý: phần tử đơn lẻ vẫn là giá trị thường, nên hãy kiểm tra có phải mảng không nếu bên nhận dữ liệu kỳ vọng danh sách.",
      },
      {
        q: "XML của tôi có được tải lên đâu không?",
        a: "Không. Việc phân tích diễn ra cục bộ trong trình duyệt bằng fast-xml-parser — không gì rời khỏi thiết bị của bạn.",
      },
    ],
  },
  "json-to-xml": {
    name: "JSON sang XML",
    tagline:
      "Chuyển JSON thành XML hợp chuẩn với thuộc tính, phần tử lặp và escape đúng quy cách — khớp cặp với công cụ XML sang JSON của chúng tôi. Toàn bộ cục bộ.",
    intro: [
      'Dán JSON và nhận tài liệu XML được định dạng đẹp với khai báo chuẩn và thụt lề 2 dấu cách. Đối tượng thành phần tử, mảng lặp lại khóa của nó mỗi mục một lần, và thành viên "@key" trở thành thuộc tính XML — đúng nghịch đảo của bộ chuyển đổi XML sang JSON, dữ liệu có thể đi rồi về.',
      'Mọi thứ được escape đúng quy tắc (& < > " \') và khóa tùy ý được ép thành tên phần tử hợp lệ, nên đầu ra luôn là XML hợp chuẩn. Những giá trị XML không diễn tả được — null, mảng rỗng — trở thành phần tử rỗng, còn các giới hạn được nêu rõ bên dưới.',
    ],
    steps: [
      "Dán JSON của bạn vào ô nhập.",
      "XML hiện trực tiếp — đặt tên phần tử gốc tùy chỉnh nếu cần.",
      "Sao chép kết quả hoặc tải xuống dưới dạng tệp .xml.",
    ],
    faqs: [
      {
        q: "Thuộc tính và mảng ánh xạ sang XML thế nào?",
        a: 'Khóa bắt đầu bằng @ (hoặc @_) thành thuộc tính của phần tử cha, và "#text" thành nội dung văn bản của phần tử — giống hệt những gì công cụ XML sang JSON của chúng tôi xuất ra. Mảng lặp lại cùng một phần tử cho mỗi mục; mảng JSON trên cùng được bọc thành <root><item>…</item></root> vì tài liệu cần một gốc duy nhất.',
      },
      {
        q: "Ánh xạ JSON ⇄ XML có giới hạn gì?",
        a: "XML không có ký hiệu cho null hay mảng rỗng — cả hai thu về phần tử rỗng. Nội dung hỗn hợp (văn bản xen lẫn phần tử con) không thể đi xuôi về ngược: văn bản được giữ thành một khối. Và khi phân tích ngược lại, một phần tử lặp đơn độc trở thành giá trị thường chứ không phải mảng một mục.",
      },
      {
        q: "Khóa không phải tên XML hợp lệ thì sao?",
        a: 'Chúng được ép lại: ký tự bất hợp pháp thành dấu gạch dưới và khóa bắt đầu bằng chữ số được thêm gạch dưới phía trước ("2fa" → <_2fa>). Chữ CJK và có dấu vốn là tên XML hợp lệ nên được giữ nguyên.',
      },
    ],
  },
  "cron-explainer": {
    name: "Giải mã biểu thức cron",
    tagline:
      "Biến mọi biểu thức cron thành lời nói dễ hiểu: phân tích từng trường, năm lần chạy kế tiếp theo múi giờ của bạn và mẫu có sẵn chỉ một cú nhấp.",
    intro: [
      "Biểu thức cron gồm năm hoặc sáu trường khó đọc quyết định công việc chạy khi nào — một ký tự sai khiến nó không bao giờ chạy, hoặc đúng 3 giờ sáng mỗi Chủ nhật. Dán biểu thức vào đây: công cụ giải thích từng trường bằng lời giản dị (phút, giờ, ngày trong tháng, tháng, ngày trong tuần, cộng thêm giây nếu có), rồi hiển thị năm lần chạy kế tiếp để bạn xác nhận lịch chạy đúng như mình nghĩ.",
      "Việc kiểm tra trung thực và ngay tại chỗ: giá trị ngoài khoảng, khoảng bị đảo chiều và các phần mở rộng Quartz không hỗ trợ như L, W, # đều nhận thông báo lỗi cụ thể, dễ hiểu. Năm mẫu thường dùng — mỗi phút, mỗi giờ, nửa đêm hằng ngày, 9 giờ sáng ngày làm việc và hằng quý — điền bằng một cú nhấp.",
    ],
    steps: [
      "Nhập biểu thức cron hoặc nhấp vào một mẫu để bắt đầu từ giá trị đáng tin.",
      "Đọc phần phân tích từng trường bằng lời giản dị.",
      "Kiểm tra năm lần chạy kế tiếp, chuyển qua lại giữa giờ địa phương và UTC.",
      "Sửa phần bất ngờ trong crontab, bộ lập lịch hoặc cấu hình CI của bạn.",
    ],
    faqs: [
      {
        q: "cron chuẩn khác cú pháp Quartz ở điểm nào?",
        a: "cron chuẩn của Unix (và công cụ này) dùng 5 trường: phút, giờ, ngày trong tháng, tháng, ngày trong tuần — thành 6 khi trường đầu là giây. Quartz thêm giây mặc định, trường thứ bảy cho năm, và các phần mở rộng như L (ngày cuối), W (ngày làm việc gần nhất), # (ngày thứ n trong tuần, ví dụ MON#2). Những phần mở rộng riêng của Quartz không nằm trong phạm vi này; mọi thứ chuẩn — số, tên như JAN và MON, khoảng, danh sách, bước nhảy — đều có.",
      },
      {
        q: "Tôi ghi cả ngày trong tháng lẫn ngày trong tuần — sao nó chạy nhiều hơn dự tính?",
        a: "cron cổ điển ghép hai trường bằng HOẶC: khi cả hai đều bị giới hạn (không trường nào là *), ngày khớp một trong hai đã kích hoạt công việc. «0 0 1 * MON» chạy vào ngày 1 hằng tháng và mỗi thứ Hai. Muốn cả hai điều kiện cùng thỏa thì phải viết biểu thức khác đi — nhìn năm lần chạy kế tiếp ở đây khiến hành vi hiện ra ngay lập tức.",
      },
    ],
  },
  "gradient-generator": {
    name: "Trình tạo gradient CSS",
    tagline:
      "Pha từ hai đến năm màu thành gradient CSS tuyến tính, tròn hay nón, với xem trước trực tiếp, mã dán ngay được và bảng màu hài hòa một cú nhấp.",
    intro: [
      "Chọn từ hai đến năm màu, chọn tuyến tính, tròn hay nón, rồi kéo góc — xem trước cập nhật ngay khi bạn gõ và mã CSS luôn cách một lần sao chép. Để trống vị trí của một điểm màu, nó sẽ được đặt tự động đúng cách CSS làm; nhập phần trăm chính xác để có đường cắt cứng và vùng pha lệch tâm.",
      "Đầu ra là một khối mã sản phẩm đúng nghĩa: dòng màu đặc dự phòng cho trình duyệt cổ, dòng có tiền tố -webkit- cho nhân WebKit cũ, và cú pháp chuẩn ở cuối. Nút hài hòa ngẫu nhiên xoay sắc độ của bảng màu trong không gian HSL nên mỗi lần xáo trộn vẫn cân bằng thay vì chói lóa.",
    ],
    steps: [
      "Chỉnh hai đến năm màu, hoặc bắt đầu từ một bảng màu có sẵn.",
      "Chọn loại gradient, rồi chỉnh góc hay hình dạng; ghim vị trí các điểm nếu muốn.",
      "Sao chép khối CSS và dán vào bảng kiểu của bạn.",
    ],
    faqs: [
      {
        q: "Vì sao CSS có dòng với tiền tố -webkit-?",
        a: "Đó là dòng tương thích cho các trình duyệt WebKit cũ (thời Safari 5-6 chằng khác) chỉ hiểu -webkit-linear-gradient. Mọi trình duyệt trong thập kỷ qua đều đọc dòng chuẩn, nên bạn có thể xóa dòng có tiền tố nếu không cần hỗ trợ các bản đó — giữ lại tốn một dòng, bỏ đi không tốn gì.",
      },
      {
        q: "Góc trong gradient tuyến tính nghĩa là gì?",
        a: "Đó là hướng đi của gradient, đo theo chiều kim đồng hồ tính từ hướng lên trên: 0deg chạy từ dưới lên, 90deg từ trái sang phải, 180deg từ trên xuống. Công cụ chuẩn hóa mọi góc bạn nhập (−45 thành 315) và quy ước ngược chiều của cú pháp cũ đã được xử lý sẵn trong dòng -webkit-.",
      },
    ],
  },
  "compress-image-to-size": {
    name: "Nén ảnh về kích thước chỉ định",
    tagline:
      "Nén ảnh về ngân sách KB chính xác: tìm kiếm nhị phân trên chất lượng JPEG hoặc WebP đạt tới giới hạn của định dạng — theo lô, ngoại tuyến, không tải lên.",
    intro: [
      "Biểu mẫu tải lên, giới hạn email và trường của CMS đòi hỏi kích thước, không phải thanh trượt chất lượng. Nhập trần bằng KB, thả ảnh vào, công cụ sẽ tìm kiếm nhị phân trên chất lượng mã hóa cho tới khi tệp lọt dưới vạch — báo chính xác chất lượng và tỷ lệ thu nhỏ đã dùng cho từng ảnh, xử lý theo lô.",
      "Công cụ trung thực với vật lý: nếu sàn chất lượng vẫn vượt mục tiêu, ảnh sẽ được thu nhỏ dần; và nếu một ảnh lớn nhiều chi tiết thực sự không thể vừa với ngân sách tí hon, bạn nhận được kết quả gần nhất kèm nhãn rõ ràng “vượt mục tiêu” — chứ không phải một tệp bị hỏng lặng lẽ.",
    ],
    steps: [
      "Thả vào một ảnh hoặc cả một lô.",
      "Nhập kích thước mục tiêu bằng KB và chọn JPEG hoặc WebP.",
      "Nhấn nén — mỗi dòng hiển thị kích thước đạt được, chất lượng và tỷ lệ thu nhỏ.",
      "Tải các kết quả đạt chuẩn, hoặc bản gần nhất trung thực.",
    ],
    faqs: [
      {
        q: "Vì sao không phải ảnh nào cũng đạt được mục tiêu tí hon?",
        a: "Một tấm ảnh vẫn giữ thông tin ngay cả ở chất lượng thấp nhất, nên ảnh 2 MB độ phân giải 4000 px gần như không bao giờ lọt vào 10 KB. Khi chất lượng chạm sàn, công cụ thu nhỏ cả điểm ảnh — độ phân giải là đòn bẩy thứ hai để giảm byte. Nếu mục tiêu vẫn ngoài tầm với, bạn nhận kết quả gần nhất với cảnh báo rõ ràng, không bao giờ là tệp âm thầm hỏng hóc.",
      },
      {
        q: "Nên chọn JPEG hay WebP?",
        a: "Ở cùng chất lượng nhìn thấy, WebP thường nhỏ hơn JPEG từ 20–30%, nên với ngân sách khắt khe nó thường lọt qua với ít hao hụt hơn. JPEG là lựa chọn an toàn khi tệp phải mở được ở mọi nơi, kể cả phần mềm cũ chưa hỗ trợ WebP.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Calculators — finance, health, everyday                              */
  /* ------------------------------------------------------------------ */
  "mortgage-calculator": {
    name: "Máy tính vay mua nhà",
    tagline:
      "Tính khoản trả hàng tháng của khoản vay mua nhà — gốc lẫn lãi cộng thuế, bảo hiểm và phí ban quản lý — kèm tổng lãi và bảng trả góp theo năm.",
    intro: [
      "Nhập giá nhà, khoản trả trước, lãi suất và thời hạn để nhận khoản trả gốc lãi hằng tháng theo công thức trả góp chuẩn mà ngân hàng dùng. Thêm thuế nhà năm, bảo hiểm năm và phí ban quản lý hằng tháng để xem con số PITI đầy đủ mà bên cho vay thường nêu.",
      "Số tiền vay, tổng lãi trong suốt thời hạn và bảng trả góp theo năm cập nhật ngay khi bạn gõ, nên so sánh trả trước 20% với 10%, hay hạn 15 năm với 30 năm, chỉ mất vài giây.",
    ],
    steps: [
      "Nhập giá nhà và khoản trả trước, theo phần trăm hay số tiền.",
      "Đặt lãi suất năm và thời hạn tính bằng năm.",
      "Tuỳ chọn thêm thuế nhà năm, bảo hiểm năm và phí ban quản lý hằng tháng.",
      "Đọc khoản trả gốc lãi hằng tháng, tổng PITI và bảng trả góp theo năm.",
    ],
    faqs: [
      {
        q: "Máy tính vay mua nhà dùng công thức nào?",
        a: "Công thức trả góp lãi suất cố định chuẩn: M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), trong đó L là số tiền vay (giá trừ khoản trả trước), r là lãi tháng (lãi năm ÷ 12 ÷ 100) và n là số tháng. Ví dụ: nhà 300.000, trả trước 20%, lãi 6%, hạn 30 năm cho khoản trả gốc lãi khoảng 1.438,92 — lãi suất bạn nhập chỉ là ví dụ, không phải chào giá.",
      },
      {
        q: "PITI nghĩa là gì?",
        a: "Principal, Interest, Taxes và Insurance — bốn phần của một khoản trả chỗ ở hằng tháng điển hình. Công cụ cộng phần một phần mười hai của thuế và bảo hiểm năm bạn nhập, cùng phí ban quản lý, vào khoản trả gốc lãi. Việc thuế và bảo hiểm có gửi quỹ ủy thác (escrow) hay không tùy bên cho vay.",
      },
      {
        q: "Vì sao những năm đầu tôi trả nhiều lãi thế?",
        a: "Lãi mỗi tháng tính trên dư nợ còn lại, lớn nhất lúc đầu. Bảng trả góp cho thấy điểm lật: các kỳ đầu gần như toàn lãi, những năm cuối gần như toàn gốc. Vì vậy trả thêm gốc sớm sẽ tiết kiệm lãi nhiều nhất.",
      },
    ],
  },
  "salary-to-hourly": {
    name: "Máy tính lương năm sang lương giờ",
    tagline:
      "Đổi lương năm thành mức trả theo giờ, ngày, tuần, hai tuần và tháng — và xem mức giờ đã điều chỉnh sau khi khấu trừ ngày nghỉ không lương.",
    intro: [
      "Nhập lương năm với nhịp làm việc quen thuộc — giờ mỗi tuần và tuần mỗi năm — và máy tính tách nó thành các đơn vị mà tin tuyển dụng và phiếu lương dùng: theo giờ, ngày, tuần, hai tuần và tháng. Chuẩn 40 giờ một tuần qua 52 tuần đã điền sẵn.",
      "Nếu bạn nghỉ không lương, mức giờ đã điều chỉnh cho thấy cùng số lương đó tính ra bao nhiêu một giờ làm thật, vì mỗi ngày không lương bớt đi một phần năm tuần làm việc của năm.",
    ],
    steps: [
      "Gõ lương năm.",
      "Đặt giờ mỗi tuần và tuần mỗi năm (mặc định 40 và 52).",
      "Thêm ngày nghỉ không lương mỗi năm nếu có.",
      "Đọc mức giờ và các mức tương đương ngày, tuần, hai tuần và tháng.",
    ],
    faqs: [
      {
        q: "Mức giờ được tính thế nào?",
        a: "Theo giờ = lương năm ÷ (giờ mỗi tuần × tuần mỗi năm). Với mặc định 40 giờ qua 52 tuần, lương 52.000 ra đúng 25,00 một giờ. Trả ngày dựa trên tuần 5 ngày, trả tuần là lương năm chia số tuần, trả hai tuần gấp đôi, còn trả tháng là lương năm chia 12.",
      },
      {
        q: "Ngày nghỉ không lương thay đổi kết quả thế nào?",
        a: "Mỗi ngày không lương bớt một phần năm tuần làm việc, nên 10 ngày rút năm xuống còn khoảng 50 tuần làm. Mức điều chỉnh chia cùng số lương cho số giờ làm thật: 52.000 với tuần 40 giờ và 10 ngày không lương tương đương 26,00 một giờ. Tổng tuần và tháng vẫn hiện lương đã khai.",
      },
      {
        q: "Có gồm thuế và khấu trừ không?",
        a: "Không — mọi con số là tổng (gross) trước thuế thu nhập, đóng góp xã hội và khấu trừ khác. Lương thực lãnh phụ thuộc bậc thuế và nơi ở của bạn, nên coi các kết quả này là số tổng để so sánh.",
      },
    ],
  },
  "hourly-to-salary": {
    name: "Máy tính lương giờ sang lương năm",
    tagline:
      "Biến mức giờ thành trả ngày, tuần, hai tuần, tháng và năm theo nhịp làm thật của bạn — mặc định 40 giờ một tuần qua 52 tuần.",
    intro: [
      "Nhập mức giờ cùng nhịp làm việc nó áp dụng, và máy tính nhân lên con số năm mà nhà tuyển dụng và bên cho vay hỏi, cùng các mức tuần, hai tuần và tháng như trên phiếu lương. Chuẩn 40 giờ, 52 tuần đã điền sẵn; lịch bán thời gian hay theo mùa chỉ cần đổi hai con số đó.",
      "Trả ngày giả định tuần làm 5 ngày. Vì mọi con số đều là phép nhân thẳng, kết quả trùng với những gì một lời mời lương tháng đáng trả cho cùng số giờ.",
    ],
    steps: [
      "Gõ mức giờ.",
      "Đặt giờ mỗi tuần và tuần mỗi năm (mặc định 40 và 52).",
      "Đọc con số năm và các mức tương đương tháng, hai tuần, tuần và ngày.",
    ],
    faqs: [
      {
        q: "Lương năm tính từ mức giờ thế nào?",
        a: "Năm = mức giờ × giờ mỗi tuần × tuần mỗi năm. Ở 25,00 một giờ với tuần 40 giờ suốt 52 tuần ra đúng 52.000 một năm; mức tháng là lương năm chia 12, và mức hai tuần là lương tuần nhân hai.",
      },
      {
        q: "Còn làm thêm, tiền tip hay nghỉ không lương?",
        a: "Không tính — kết quả là phép nhân thẳng cho nhịp bạn nhập. Để ước lượng làm thêm, cộng đại khái số giờ thường tăng thêm vào ô giờ mỗi tuần cùng mức giá; làm mùa vụ hay nghỉ không lương thì giảm số tuần mỗi năm.",
      },
      {
        q: "Vì sao phiếu lương thật khác?",
        a: "Các con số là tổng. Thuế thu nhập, an sinh xã hội và khấu trừ phúc lợi làm giảm thực lãnh, và nhiều việc lương tháng trải khoản trả qua 12 tháng dù bạn làm ít tuần hơn. Hãy dùng kết quả năm để so lời mời, không phải để ước thu nhập ròng.",
      },
    ],
  },
  "break-even-calculator": {
    name: "Máy tính điểm hoà vốn",
    tagline:
      "Tìm số lượng sản phẩm và doanh thu nơi sản phẩm ngừng lỗ — chi phí cố định, giá và chi phí biến đổi vào, biên đóng góp và bảng lợi nhuận ra.",
    intro: [
      "Nhập chi phí cố định — tiền thuê, lương, thiết bị, những hóa đơn trả bất kể sản lượng — cộng giá mỗi đơn vị và chi phí biến đổi mỗi đơn vị. Máy tính chia chi phí cố định cho biên đóng góp, tức giá trừ chi phí biến đổi, để cho số lượng sản phẩm nơi lợi nhuận vượt qua con số không.",
      "Bảng nhỏ cho thấy lãi hay lỗ tại một nửa, một lần rưỡi và hai lần sản lượng hoà vốn, để bạn thấy biên cộng dồn nhanh thế nào sau khi vượt điểm. Nếu giá chưa che nổi cả chi phí biến đổi, công cụ nói thẳng thay vì hiện một con số không vô nghĩa.",
    ],
    steps: [
      "Nhập tổng chi phí cố định của kỳ.",
      "Đặt giá mỗi đơn vị và chi phí biến đổi mỗi đơn vị.",
      "Đọc số lượng và doanh thu hoà vốn, cộng biên mỗi đơn vị.",
      "Xem bảng lợi nhuận tại 0,5×, 1,5× và 2× sản lượng hoà vốn.",
    ],
    faqs: [
      {
        q: "Phân tích hoà vốn dùng công thức nào?",
        a: "Số lượng hoà vốn = chi phí cố định ÷ (giá mỗi đơn vị − chi phí biến đổi mỗi đơn vị). Phần chênh là biên đóng góp: với 10.000 chi phí cố định, giá 50 và chi phí biến đổi 30, mỗi lần bán góp 20, vậy 500 đơn vị — 25.000 doanh thu — mới hoà vốn.",
      },
      {
        q: "Nếu biên bằng không hoặc âm thì sao?",
        a: "Thì không sản lượng nào hoà vốn được, và máy tính nói vậy thay vì trả về một số: mỗi đơn vị bán ra lại thêm lỗ thay vì gánh chi phí cố định. Cách sửa là giá cao hơn, chi phí biến đổi thấp hơn, hoặc cả hai.",
      },
      {
        q: "Có xử lý được nhiều sản phẩm hay chi phí thay đổi không?",
        a: "Nó mô hình một sản phẩm với kinh tế đơn vị không đổi — tình huống sách giáo khoa kinh điển. Với danh mục sản phẩm, dùng trung bình trộn của giá trừ chi phí biến đổi; với chiết khấu theo sản lượng hay chi phí cố định bậc thang, tính lại từng kịch bản.",
      },
    ],
  },
  "bmr-calculator": {
    name: "Máy tính BMR",
    tagline:
      "Tính chuyển hóa cơ bản bằng phương trình Mifflin-St Jeor (1990) — số calo cơ thể bạn đốt mỗi ngày khi nghỉ ngơi hoàn toàn.",
    intro: [
      "Chuyển hóa cơ bản (BMR) là năng lượng cơ thể tiêu chỉ để sống — thở, bơm máu, giữ ấm — trước mọi cử động hay tiêu hoá. Máy tính này dùng phương trình Mifflin-St Jeor, công bố năm 1990 và đến nay vẫn là công cụ dự đoán rộng dùng chính xác nhất cho dân số hiện đại: nam 10 × cân nặng (kg) + 6,25 × chiều cao (cm) − 5 × tuổi + 5; nữ lấy biểu thức đó trừ 161.",
      "Nhập thông số theo đơn vị mét hay Anh và kết quả cập nhật khi bạn gõ. Hãy coi con số này là ước lượng mức dân số — thường lệch khoảng ±10% so với đo trong phòng thí nghiệm — chứ không phải chẩn đoán y khoa.",
    ],
    steps: [
      "Chọn giới tính và đơn vị mét (cm + kg) hay Anh (ft + in + lb).",
      "Nhập chiều cao, cân nặng và tuổi.",
      "Đọc BMR tính bằng kilocalo mỗi ngày.",
      "Đưa vào máy tính calo để lấy mức duy trì và mục tiêu.",
    ],
    faqs: [
      {
        q: "Dùng công thức nào và chính xác cỡ nào?",
        a: "Phương trình Mifflin-St Jeor, công bố 1990 và được Hiệp hội Dinh dưỡng Hoa Kỳ khuyến nghị sau khi đối chiếu với phép đo nhiệt lượng gián tiếp. Nó dự đoán năng lượng nghỉ đo được trong khoảng ±10% cho phần lớn người trưởng thành, chính xác hơn phương trình Harris-Benedict cũ (1919).",
      },
      {
        q: "BMR khác nhu cầu calo hằng ngày chỗ nào?",
        a: "BMR chỉ tính nghỉ hoàn toàn. Đốt thật mỗi ngày của bạn là BMR nhân hệ số hoạt động — khoảng 1,2 cho ngày ít vận động đến 1,9 với người rất năng động. Máy tính calo sẽ nhân hệ số đó và áp mục tiêu của bạn giúp bạn.",
      },
      {
        q: "Có phải lời khuyên y khoa không?",
        a: "Không — đây là ước lượng, không phải lời khuyên y khoa. Bệnh tật, thuốc, thai kỳ và cơ thể thành phần khác thường đều làm dịch chi tiêu năng lượng thật; mọi thay đổi ăn uống nên bàn với chuyên gia y tế.",
      },
    ],
  },
  "calorie-calculator": {
    name: "Máy tính calo",
    tagline:
      "Biến BMR thành mục tiêu calo hằng ngày: năm mức hoạt động (×1,2–1,9) cộng mục tiêu giảm, giữ hay tăng khoảng ±500 kcal mỗi ngày.",
    intro: [
      "Nhu cầu năng lượng hằng ngày là BMR nhân hệ số hoạt động: 1,2 ít vận động, 1,375 vận động nhẹ, 1,55 vừa phải, 1,725 nhiều vận động và 1,9 rất năng động. Tích đó — tổng năng lượng tiêu hao mỗi ngày (TDEE) — là cái giữ cân nặng hiện tại của bạn. Bản thân BMR lấy từ phương trình Mifflin-St Jeor (1990).",
      "Chọn mục tiêu và công cụ chỉnh con số duy trì: khoảng −500 kcal/ngày để giảm cỡ 0,5 kg mỗi tuần, +500 kcal/ngày để tăng, hay giữ nguyên để duy trì. Kinh nghiệm ±500 kcal rút ra từ việc 1 kg mỡ tích ≈ 7.700 kcal. Mọi thứ ở đây đều là ước lượng — chuyển hoá thật thích nghi khi cân nặng và thói quen đổi.",
    ],
    steps: [
      "Chọn giới tính, đơn vị và nhập chiều cao, cân nặng, tuổi.",
      "Chọn mức hoạt động khớp với một tuần điển hình.",
      "Chọn giảm, giữ hay tăng.",
      "Đọc mức duy trì (TDEE) và calo mục tiêu mỗi ngày.",
    ],
    faqs: [
      {
        q: "Dùng công thức và hệ số nào?",
        a: "BMR từ phương trình Mifflin-St Jeor (1990), nhân các hệ số hoạt động TDEE chuẩn: 1,2 ít vận động, 1,375 nhẹ, 1,55 vừa, 1,725 nhiều, 1,9 rất năng động. Mục tiêu cộng hay trừ khoảng 500 kcal/ngày — kinh nghiệm kinh điển cho thay đổi 0,5 kg mỗi tuần (1 kg mỡ ≈ 7.700 kcal).",
      },
      {
        q: "Thâm hụt 500 kcal có an toàn, kết quả bao lâu hiện ra?",
        a: "Khoảng −500 kcal/ngày cho thay đổi ≈0,5 kg/tuần là nhịp mà phần lớn hướng dẫn sức khoẻ cộng đồng gọi là vừa phải và bền. Sụt đầu tiên có phần nước, và tiêu hao giảm khi bạn nhẹ đi, nên kết quả theo tuần không tuyến tính — tính lại mỗi vài ký.",
      },
      {
        q: "Có phải lời khuyên y khoa không?",
        a: "Không — đây là ước lượng, không phải lời khuyên y khoa. Nếu bạn mang thai, quản bệnh mãn tính, đang uống thuốc hay từng rối loạn ăn uống, hãy đặt mục tiêu cùng chuyên gia y tế.",
      },
    ],
  },
  "body-fat-calculator": {
    name: "Máy tính tỷ lệ mỡ",
    tagline:
      "Ước tỷ lệ mỡ bằng thước dây theo phương pháp Hải quân Mỹ (Hodgdon & Beckett, 1984) từ chiều cao, cổ và vòng bụng — hông thêm cho nữ.",
    intro: [
      "Phương pháp chu vi của Hải quân Mỹ ước mỡ chỉ bằng một thước dây. Với nam: %BF = 495 / (1,0324 − 0,19077·log10(vòng bụng − cổ) + 0,15456·log10(chiều cao)) − 450, tất cả tính bằng xentimét. Nữ cộng hông vào số hạng chu vi — log10(vòng bụng + hông − cổ) — và dùng hệ số nữ của cùng bài báo 1984 của Hodgdon và Beckett.",
      "Đo cổ dưới thanh môn, dây hơi nghiêng xuống phía trước; vòng bụng ở rốn với nam hoặc chỗ hẹp nhất với nữ; hông ở chỗ đầy nhất. Kéo dây sát da nhưng không bóp da. Kết quả là ước lượng với sai số điển hình ±3–4% so với phương pháp phòng thí nghiệm, không phải chẩn đoán.",
    ],
    steps: [
      "Chọn giới tính và đơn vị mét hay Anh.",
      "Đo và nhập chiều cao, cổ và vòng bụng — nữ thêm hông.",
      "Đọc tỷ lệ mỡ ước lượng của bạn.",
      "Đo lại hằng tháng trong cùng điều kiện để theo dõi xu hướng.",
    ],
    faqs: [
      {
        q: "Phương pháp Hải quân chính xác cỡ nào?",
        a: "So với cân dưới nước và DEXA, các phương trình Hải quân 1984 trung bình lệch khoảng 3–4 điểm phần trăm, sai số cá nhân lớn hơn khi mỡ tích chỗ khác thường. Nó theo thay đổi tốt nếu bạn đo đều theo một cách — điều này quan trọng hơn con số tuyệt đối khi xét tiến bộ.",
      },
      {
        q: "Khoảng mỡ nào được coi là khoẻ?",
        a: "American Council on Exercise nêu với nam: 2–5% mỡ thiết yếu, 6–13% vận động viên, 14–17% thể hình, 18–24% trung bình, 25%+ béo phì. Với nữ: 10–13% thiết yếu, 14–20% vận động viên, 21–24% thể hình, 25–31% trung bình, 32%+ béo phì. Nữ cần mỡ thiết yếu nhiều hơn cho chức năng hormone.",
      },
      {
        q: "Vì sao kết quả ra âm hay vô lý?",
        a: "Công thức in ra không kẹp giới hạn, nên đầu vào vô lý — ví dụ vòng bụng chưa lớn hơn cổ — cho đầu ra vô lý. Hãy coi mọi giá trị dưới mức mỡ thiết yếu hay trên khoảng 60% là sai sót đo và đo lại. Và như thường lệ, ước lượng này không phải lời khuyên y khoa.",
      },
    ],
  },
  "ideal-weight-calculator": {
    name: "Máy tính cân nặng lý tưởng",
    tagline:
      "Xem cân nặng lý tưởng theo công thức Devine (1975) và dải BMI khoẻ (18,5–24,9) theo chiều cao của bạn, hiển thị bằng kg hay pound.",
    intro: [
      "Máy tính này cho hai câu trả lời bổ trợ nhau. Công thức Devine (1975) — nam 50 kg + 2,3 kg mỗi inch quá 5 ft, nữ 45,5 kg + 2,3 kg mỗi inch — vốn được suy ra để định liều thuốc như digoxin và đến nay vẫn là phương trình cân nặng lý tưởng được trích dẫn nhiều nhất trong y học. Dải BMI khoẻ nhân chiều cao mét bình phương với 18,5 và 24,9 — giới hạn vùng bình thường của WHO.",
      "Nhập chiều cao bằng xentimét hay feet và inch. Hai phương pháp thường lệch nhau vài ký, và đúng đó mới là điểm mấu chốt: không tồn tại một cân nặng lý tưởng duy nhất. Hãy coi cả hai số là khung tham chiếu quanh một vùng khoẻ, không phải mục tiêu để ép mình vào — ước lượng này không phải lời khuyên y khoa.",
    ],
    steps: [
      "Chọn đơn vị mét (cm) hay Anh (ft + in).",
      "Nhập chiều cao của bạn.",
      "So sánh ước lượng Devine nam và nữ với dải BMI khoẻ.",
      "Khi đặt mục tiêu cân nặng, dùng vùng, đừng dùng một con số.",
    ],
    faqs: [
      {
        q: "Công thức Devine từ đâu ra?",
        a: "Bác sĩ B. J. Devine công bố năm 1975 như cách nhanh ước cân nặng để định liều thuốc theo chiều cao: nam 50 kg cho 5 feet đầu cộng 2,3 kg mỗi inch thêm; nữ 45,5 kg. Nó chưa bao giờ được thiết kế làm mục tiêu thẩm mỹ hay thể hình — vì thế dải BMI dựa theo WHO được đặt cạnh.",
      },
      {
        q: "Vì sao đáp án là một vùng chứ không phải một số?",
        a: "Vì cân nặng khoẻ phụ thuộc khung xương, khối cơ, tuổi và dân tộc, không con số nào hợp cho tất cả. Dải 18,5–24,9 × chiều cao² lấy từ phân loại BMI của WHO và bao các mức cân mà nghiên cứu gắn với rủi ro tổng thể thấp nhất cho phần lớn người trưởng thành.",
      },
      {
        q: "Có phải lời khuyên y khoa không?",
        a: "Không — đây là ước lượng, không phải lời khuyên y khoa. Vận động viên và người nhiều cơ nằm trên dải mà vẫn khoẻ mạnh hoàn toàn, và một số tình trạng dịch vùng khoẻ. Cân nặng mục tiêu nên bàn với chuyên gia y tế.",
      },
    ],
  },
  "water-intake-calculator": {
    name: "Máy tính nước cần uống",
    tagline:
      "Nhận mục tiêu nước hằng ngày: 35 ml mỗi kilôgam cân nặng cộng khoảng 350 ml cho mỗi 30 phút vận động, kèm hướng dẫn khi trời nóng.",
    intro: [
      "Máy tính này khởi đầu từ kinh nghiệm chuẩn về dịch duy trì dùng trong lâm sàng: 35 ml nước mỗi kilôgam cân nặng mỗi ngày, trước mọi hoạt động. Sau đó cộng khoảng 350 ml cho mỗi 30 phút vận động để bù mồ hôi, và hiển thị mức nền cùng phần thưởng vận động riêng rẽ để bạn thấy tổng đến từ đâu.",
      "Nhập cân nặng theo kilôgam hay pound và số phút vận động mỗi ngày. Trời nóng, hoặc đổ mồ hôi nhiều, thì uống nhiều hơn tổng đã tính; thức ăn và thức uống khác cũng cấp nước. Kết quả là ước lượng bù nước chung, không phải lời khuyên y khoa.",
    ],
    steps: [
      "Chọn đơn vị mét (kg) hay Anh (lb).",
      "Nhập cân nặng cơ thể.",
      "Nhập số phút vận động mỗi ngày.",
      "Đọc mức nền, phần thưởng vận động và mục tiêu ngày gộp lại.",
    ],
    faqs: [
      {
        q: "Quy tắc 35 ml/kg từ đâu ra?",
        a: "Đó là kinh nghiệm dịch duy trì kinh điển từ nhi khoa tới người lớn, dùng khắp thực hành lâm sàng (với người lớn hay được trích 30–35 ml/kg/ngày). Để so sánh, Cơ quan An toàn Thực phẩm châu Âu đặt tổng lượng nước đầy đủ ở 2,0 L/ngày cho nữ và 2,5 L/ngày cho nam — tính cả nước trong thức ăn.",
      },
      {
        q: "Cà phê, trà và đồ ăn có tính vào tổng không?",
        a: "Có. Khoảng 20–30% lượng nước hằng ngày thường đến từ thức ăn, và thức uống có cafein vừa phải góp phần bù nước thay vì rút nước. Con số tính ra là chỉ dẫn nước sạch trên nền ăn uống bình thường, nên bạn không cần uống toàn bộ bằng nước lọc.",
      },
      {
        q: "Có phải lời khuyên y khoa không?",
        a: "Không — đây là ước lượng chung. Người bệnh tim, thận hay gan, và người được dặn hạn chế dịch, thường cần ít hơn mức đã tính: hãy theo chỉ dẫn của bác sĩ điều trị.",
      },
    ],
  },
  "pace-calculator": {
    name: "Máy tính pace",
    tagline:
      "Tính pace chạy mỗi km và mỗi dặm từ bất kỳ cự ly và thời gian nào, rồi dự đoán thời gian thi đấu bằng công thức mũ 1,06 của Peter Riegel.",
    intro: [
      "Nhập cự ly bất kỳ — 5K, 10K, nửa marathon, marathon hay cự ly riêng bằng kilômét hay dặm — cộng thời gian về đích, và xem một lúc pace mỗi km, pace mỗi dặm cùng tốc độ km/h và mph. Nửa marathon trong 2:00 hiện thành 5:41/km, 9:10/dặm và 10,6 km/h mà không cần tính nhẩm.",
      "Bộ dự đoán thi đấu áp công thức sức bền của Peter Riegel T₂ = T₁ × (D₂/D₁)^1,06: đưa nó một kết quả thi thật lòng, nó chiếu thời gian về đích dự kiến của bạn cho từng cự ly chuẩn, từ 5K tới marathon.",
    ],
    steps: [
      "Chọn một cự ly thi dựng sẵn, hoặc chọn Riêng và nhập cự ly bất kỳ theo km hay dặm.",
      "Gõ thời gian về đích theo giờ, phút và giây.",
      "Đọc pace mỗi km, pace mỗi dặm và cả hai tốc độ — hoặc chuyển sang Dự đoán thi đấu để lấy thời gian chiếu cho từng cự ly.",
    ],
    faqs: [
      {
        q: "Công thức dự đoán thi đấu từ đâu ra?",
        a: "Từ Peter Riegel, kỹ sư nghiên cứu công bố T₂ = T₁ × (D₂/D₁)^1,06 trên Runner's World năm 1977. Mũ 1,06 nắm được cách pace nhả dần theo cự ly: gấp đôi cự ly thi tốn khoảng 9% thời gian nhiều hơn gấp đôi thời gian. Nó giả định bạn tập riêng cho cự ly đích — sẽ không dự được marathon từ một 5K nhanh nếu bạn chưa từng chạy dài.",
      },
      {
        q: "Vì sao pace mỗi km dự đoán chậm dần ở cự ly dài?",
        a: "Đó là công thức đang làm việc của nó. Mũ 1,06 nghĩa là mỗi lần gấp đôi cự ly tốn thêm khoảng 6% thời gian ngoài phần tỷ lệ, phản ánh cạn glycogen, tiếp nhiên liệu và mệt mỏi. Ngược lại các dự đoán ngắn hơn (10K từ nửa marathon) ra nhanh hơn mỗi km vì cùng lý do.",
      },
      {
        q: "Máy tính xử lý được dặm cùng kilômét không?",
        a: "Có. Cự ly riêng nhận cả hai đơn vị, và kết quả luôn hiện theo cả hai kiểu: pace mỗi km và mỗi dặm, tốc độ km/h và mph. Phép chuyển dùng dặm quốc tế chính xác 1,609344 km.",
      },
    ],
  },
  "one-rep-max-calculator": {
    name: "Máy tính 1RM",
    tagline:
      "Ước mức nâng một lần tối đa (1RM) từ bất kỳ bộ tạ × lần với công thức Epley và Brzycki, kèm bảng tập 1–12 lần theo phần trăm 1RM.",
    intro: [
      "Nhập tạ đã nhấc và số lần thực hiện sạch, sẽ nhận 1RM ước tính từ hai công thức chuẩn: Epley w × (1 + reps/30) và Brzycki w × 36/(37 − reps). Ở 225 lb × 10 cả hai chạm đúng 300 lb — vì thế bộ này thành kinh điển phòng gym.",
      "Dưới ước lượng, bảng tập đổi 1RM thành tạ làm việc: tải nặng nhất bạn có thể kỳ vọng nhấc cho từng số lần từ 1 tới 12, kèm phần trăm của 1RM — những phần trăm huấn luyện viên dùng để soạn các khối mạnh, phì đại và sức bền.",
    ],
    steps: [
      "Nhập tạ đã nhấc và chọn kg hay lb.",
      "Nhập số lần thực hiện với kỹ thuật tốt.",
      "Đọc ước tính Epley và Brzycki cùng bảng tập 1–12 lần phía dưới.",
    ],
    faqs: [
      {
        q: "Nên tin công thức nào?",
        a: "Cả hai là ước lượng từ bộ dưới mức tối đa, chính xác nhất khoảng giữa 4 và 10 lần. Epley (1976) hơi lạc quan ở số lần thấp; Brzycki (1993) hơi dè dặt. Cách làm thông thường là coi hai con số như một khoảng: nếu khớp nhau trong vài ký, ước 1RM của bạn đáng tin.",
      },
      {
        q: "Vì sao bảng cho 75% của 1RM ở 10 lần?",
        a: "Các phần trăm lấy từ đảo phương trình Epley: mức tối đa nâng được cho n lần khoảng 1RM × 30/(30 + n). Mười lần ra 75%, năm lần khoảng 86%. Phần trăm thật trôi theo bài tập (squat chịu nhiều lần hơn press) và theo cơ cấu sợi của bạn, nên coi bảng là điểm khởi đầu để soạn bài.",
      },
      {
        q: "Vì sao không nhập được quá 20 lần?",
        a: "Vì ở đó công thức hết nghĩa. Qua khoảng 12 lần, kết quả bị sức bền cục bộ chi phối hơn là sức mạnh, và mẫu số của Brzycki (37 − reps) sụp về không. Bộ nhiều lần đo thể trạng; muốn ước mức tối đa từ chúng thì dùng công thức thiết kế cho bài bền.",
      },
    ],
  },
  "sleep-calculator": {
    name: "Máy tính giấc ngủ",
    tagline:
      "Tìm giờ đi ngủ tốt nhất cho giờ dậy cố định — hoặc dậy lúc nào nếu ngủ ngay bây giờ — theo chu kỳ ngủ 90 phút cộng 15 phút để nhập ngủ.",
    intro: [
      "Dậy giữa chu kỳ mới là thứ làm buổi sáng tệ, chứ không phải tổng giờ ngủ. Công cụ này bày giấc ngủ theo chu kỳ tròn 90 phút: nói cho nó giờ bạn phải dậy, nó liệt kê các giờ đi ngủ làm chuông reo đúng mép chu kỳ — sáu chu kỳ (9 giờ) xuống ba (4,5 giờ), mỗi giờ gồm khoảng 15 phút để vào giấc.",
      "Ngủ ngay bây giờ? Chế độ ngược cộng chu kỳ về phía trước: vào giấc lúc 23:30 thì các điểm dậy tự nhiên là 01:15, 02:45, 04:15, 05:45, 07:15 và 08:45 — chọn điểm sớm nhất mà vẫn đủ nghỉ.",
    ],
    steps: [
      "Chọn Giờ dậy → giờ ngủ, hay Ngủ ngay → các giờ dậy.",
      "Nhập giờ bạn phải dậy, hay giờ bạn lên giường.",
      "Chọn một dòng: mỗi dòng là bội nguyên của chu kỳ 90 phút, có hiện thời lượng ngủ.",
    ],
    faqs: [
      {
        q: "Chu kỳ ngủ có thật sự 90 phút không?",
        a: "90 phút là mức trung bình hay được trích, nhưng chu kỳ cá nhân dao động khoảng 80–120 phút, và chu kỳ của cùng một người khác nhau qua đêm. Vì vậy các giờ ở đây là đích, không phải bảo đảm: nếu sau hai tuần chuông theo chu kỳ mà vẫn mơ màng, dời giờ ngủ 15–20 phút rồi xem buổi sáng khá lên không.",
      },
      {
        q: "Vì sao phép tính cộng 15 phút?",
        a: "Vì chu kỳ đầu chỉ bắt đầu khi bạn nhập ngủ thật, và phần lớn người mất cỡ 10–20 phút. Công cụ trích 15 phút giữa lúc lên giường và đầu chu kỳ một; nếu bạn thường vào giấc nhanh hay chậm hơn, tự cộng bớt phần chênh.",
      },
      {
        q: "Tôi cần bao nhiêu chu kỳ?",
        a: "Phần lớn người lớn ổn với 5 chu kỳ (7,5 giờ) và nhiều người cần 6 (9 giờ); 4 chu kỳ (6 giờ) cho một số người đỡ ngắn hạn nhưng hiếm khi về lâu. Thói quen đều đặn quan trọng như tổng số — cùng 6 chu kỳ mà giờ ngủ thất thường làm bạn tệ hơn.",
      },
    ],
  },
  "workdays-calculator": {
    name: "Máy tính ngày làm việc",
    tagline:
      "Đếm ngày làm việc giữa hai ngày hay cộng và trừ ngày làm việc từ một ngày — với định nghĩa cuối tuần của bạn và danh sách ngày nghỉ riêng.",
    intro: [
      "Hạn hợp đồng, thời gian giao hàng và đồng hồ SLA chạy theo ngày làm việc chứ không phải ngày lịch. Đếm ngày làm giữa hai ngày (cả hai mút đều tính: thứ Hai đến thứ Sáu là 5), hoặc tiến hay lùi N ngày làm từ một ngày gốc và xem ngày đáp chính xác cùng thứ của nó.",
      "Dán danh sách ngày nghỉ của bạn — mỗi dòng một YYYY-MM-DD — để loại ngày công ty nghỉ và ngày lễ, và đổi định nghĩa cuối tuần nếu tuần của bạn nghỉ thứ Sáu với thứ Bảy. Toàn bộ phép tính ngày chạy trên số ngày UTC, nên các lượt chuyển giờ mùa hè không bao giờ xô kết quả lệch một ngày.",
    ],
    steps: [
      "Chọn Ngày làm việc giữa, hay Cộng / trừ ngày làm việc.",
      "Nhập hai ngày, hoặc ngày gốc và số ngày làm việc cần dịch.",
      "Tuỳ chọn đặt ngày cuối tuần và dán ngày nghỉ, mỗi dòng một YYYY-MM-DD.",
      "Đọc con số cùng phần bóc tách, hay ngày kết quả cùng thứ của nó.",
    ],
    faqs: [
      {
        q: "Ngày ở hai mút có bị đếm không?",
        a: "Có — phép đếm giữa tính cả hai đầu: từ thứ Hai 2026-11-02 đến thứ Sáu 2026-11-06 là 5 ngày làm, và khoảng thứ Sáu sang thứ Hai là 2. Ở chế độ cộng/trừ, ngày đầu không bị tiêu: thứ Sáu + 1 ngày làm đáp thứ Hai, và thứ Bảy + 1 cũng đáp thứ Hai.",
      },
      {
        q: "Nhập ngày nghỉ thế nào?",
        a: "Mỗi dòng một ngày theo định dạng YYYY-MM-DD, ví dụ 2026-11-26 cho Lễ Tạ ơn Mỹ. Dòng không hợp lệ bị bỏ qua thay vì làm gãy phép đếm, trùng nhau vô hại, còn ngày lễ rơi đúng ngày cuối tuần của bạn chẳng đổi gì — nó vốn đã bị loại.",
      },
      {
        q: "Vì sao công cụ nhắc UTC và giờ mùa hè?",
        a: "Số học ngày theo giờ địa phương có thể trôi một ngày quanh các lượt chuyển giờ mùa hè — khoảng thời gian vượt qua lượt đổi tháng Mười Một hay tháng Ba có thể ra thiếu hoặc thừa một ngày ở vài trình duyệt. Đếm theo ngày UTC trọn vẹn né hẳn vấn đề: từ thứ Sáu sang thứ Hai là 2 ngày làm ở bất cứ đâu trên trái đất.",
      },
    ],
  },
  "cooking-conversion": {
    name: "Máy chuyển đổi nấu ăn",
    tagline:
      "Chuyển cốc, muỗng canh và muỗng cà phê sang gam và ounce cho 24 nguyên liệu quen thuộc, kèm bảng lò °F↔°C — đều là trung bình công bố, không gọi máy chủ.",
    intro: [
      "Một cốc bột không phải một cốc mật ong: đổi thể tích sang trọng lượng cần tỷ trọng của nguyên liệu, chứ không phải một hệ số thần kỳ duy nhất. Chọn một trong 24 nguyên liệu quen thuộc — bột mì 120 g/cốc, đường 200, bơ 227, mật ong 340, ca cao 100, yến mạch cán 90 — và đổi hai chiều giữa cốc, muỗng canh, muỗng cà phê, ounce thể tích, mililít và lít một bên, gam, kilôgam, ounce và pound bên kia.",
      "Các phép đổi thể tích-qua-thể tích (2 cốc = 480 ml) và cân-qua-cân (1 lb = 453,6 g) chạy mà không cần chọn nguyên liệu, và bảng lò hai chiều dịch các mức °F chuẩn sang °C — 350 °F là 175 °C — để công thức nước ngoài hết là trò đoán mò.",
    ],
    steps: [
      "Chọn nguyên liệu trong danh sách (bỏ qua bước này nếu đổi thể tích-qua-thể tích hay cân-qua-cân).",
      "Nhập lượng mà công thức yêu cầu.",
      "Chọn đơn vị đổi đi và đơn vị muốn đổi tới.",
      "Đọc kết quả, hay tra nhiệt độ lò trong bảng °F↔°C.",
    ],
    faqs: [
      {
        q: "Giá trị gam mỗi cốc chính xác cỡ nào?",
        a: "Đó là trung bình được công bố (King Arthur, USDA và các nguồn tương tự), còn múc thật thì lênh đênh: một cốc bột có thể lệch ±15% tùy bạn xúc bằng muỗng rồi gạt phẳng hay cắm thẳng cốc vào bao. Giá trị đủ dùng cho nấu hằng ngày; làm bánh cần chính xác thì cân nguyên liệu và coi bảng là ước lượng.",
      },
      {
        q: "Công cụ dùng cốc nào?",
        a: "Cốc nấu kiểu Mỹ 240 ml, thứ mà phần lớn công thức Mỹ và bảng chuyển đổi ngầm định. Đó là 16 muỗng canh 15 ml hay 48 muỗng cà phê 5 ml. Nếu công thức viết theo cốc đo mét (250 ml) hay cốc đế chế Anh (284 ml), kết quả trôi vài phần trăm — chỉnh tỷ lệ theo.",
      },
      {
        q: "Vì sao 350 °F đổi thành 175 °C mà không phải 176,7 °C?",
        a: "Phép đổi đúng là (350 − 32) × 5/9 = 176,7 °C, nhưng lò được khắc theo bậc 5–10 độ và người viết công thức làm tròn về mức quen thuộc gần nhất, nên 175 °C mới là cặp chuẩn. Bảng hiện các cặp quy ước đó; nhiệt thật của núm lò vốn dĩ chỉ là xấp xỉ.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Developer — placeholder image                                        */
  /* ------------------------------------------------------------------ */
  "placeholder-image-generator": {
    name: "Trình tạo ảnh giữ chỗ",
    tagline:
      "Tạo ảnh giữ chỗ kích thước nào cũng được dưới dạng SVG, PNG hay JPG — chọn màu và nhãn, xem trước tức thì, rồi tải tệp hoặc sao chép markup SVG.",
    intro: [
      "Mockup và wireframe cần khung ảnh trước khi tài liệu thật tồn tại. Gõ chiều rộng và cao — hero 1200×630, avatar 256×256, hay bất kỳ từ 1×1 tới 5000×5000 — chọn màu nền và chữ, thêm nhãn nếu muốn, và ảnh giữ chỗ vẽ ngay theo từng phím bạn gõ.",
      "Tải kết quả về dạng SVG, PNG hay JPG, hoặc chép markup SVG thẳng vào clipboard: đó là một nắm phần tử đọc được, chứ không phải cháo base64, nên bạn dán vào HTML, JSX hay Figma rồi sửa chữ và màu bằng tay. Mọi thứ sinh ra trong trình duyệt của bạn; không có gì được gửi đi.",
    ],
    steps: [
      "Nhập chiều rộng và cao tính bằng pixel.",
      "Đặt màu nền và chữ, và nhãn tuỳ chọn (mặc định: kích thước).",
      "Tải về dạng SVG, PNG hay JPG — hoặc chép markup SVG và dán vào đâu cũng được.",
    ],
    faqs: [
      {
        q: "Khi nào nên dùng SVG thay vì PNG hay JPG?",
        a: "SVG là văn bản: nhỏ xíu, phóng vô hạn và sửa được bằng tay — lý tưởng cho mockup, tài liệu và bố cục thân thiện thư điện tử. PNG an toàn hơn cho các nền tảng làm hỏng SVG nhúng (vài CMS và ứng dụng nhắn tin), còn JPG hợp với ảnh giữ chỗ giống ảnh chụp ở dung lượng nhỏ. Bản xem trước của cả ba như nhau.",
      },
      {
        q: "Giới hạn kích thước và màu sắc là gì?",
        a: "Chiều rộng và cao phải là số nguyên từ 1 tới 5000 pixel; màu phải là hex — #RRGGBB hay dạng rút gọn #RGB. Bất kỳ thứ gì khác đều bị từ chối kèm gợi ý thay vì lặng lẽ sinh ra ảnh hỏng.",
      },
      {
        q: "Có gì được gửi lên máy chủ không?",
        a: "Không. SVG được dựng từ một mẫu chuỗi trong trình duyệt của bạn và các bản raster vẽ trên canvas cục bộ. Không có gì rời trang: chạy cả khi ngoại tuyến và an toàn cho thiết kế chưa phát hành.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Calculators & timers — pay, rent, savings, health, time              */
  /* ------------------------------------------------------------------ */
  "overtime-pay-calculator": {
    name: "Máy tính lương làm thêm giờ",
    tagline:
      "Tính lương làm thêm giờ theo mức 1,5× hoặc 2× lương giờ của bạn — lương bình thường, phụ cấp tăng ca, tổng tuần và con số quy năm từ lương.",
    intro: [
      "Nhập lương giờ — hoặc lương năm mà máy tính quy đổi dựa trên số giờ làm bình thường mỗi tuần — rồi thêm số giờ tăng ca bạn dự kiến. Kết quả tách riêng lương bình thường và phần phụ cấp: một phẩy lương theo mặc định, hoặc lương gấp đôi nếu hợp đồng hay quy định địa phương trả như vậy.",
      "Mọi thứ cập nhật trực tiếp: lương giờ sau khi tăng, lương bình thường và tăng ca của tuần, tổng cộng tuần, và con số quy năm sau khi nhân với số tuần bạn thực sự làm trong năm. Cách tính phản ánh đúng cách Đạo luật Tiêu chuẩn Lao động Công bằng (FLSA) của Mỹ tính tăng ca cho người lao động không được miễn.",
    ],
    steps: [
      "Nhập lương giờ, hoặc chuyển sang chế độ lương năm và gõ mức lương năm.",
      "Đặt số giờ bình thường mỗi tuần (mặc định 40) và số tuần mỗi năm.",
      "Thêm giờ tăng ca và chọn hệ số — 1,5× hoặc 2×.",
      "Xem lương giờ tăng ca, phần chia theo tuần và tổng quy năm.",
    ],
    faqs: [
      {
        q: "Ở Mỹ, khi nào phải trả lương làm thêm giờ?",
        a: "Theo FLSA, người lao động không được miễn phải nhận ít nhất 1,5 lần lương giờ bình thường cho mỗi giờ vượt quá 40 trong tuần làm việc. Việc miễn trừ phụ thuộc nhiệm vụ và mức lương; một số tiểu bang đi xa hơn — chẳng hạn California cũng tính tăng ca theo ngày sau 8 giờ. Lương giờ 25,00 thì mỗi giờ tăng ca nhận thêm 37,50.",
      },
      {
        q: "Chế độ lương năm quy đổi lương thành lương giờ thế nào?",
        a: "Nó lấy lương năm chia cho số giờ bình thường mỗi tuần × số tuần mỗi năm — cùng căn cứ với phép đổi lương năm sang lương giờ. Lương 52.000 với tuần 40 giờ và 52 tuần ra đúng 25,00 mỗi giờ, nên năm giờ tăng ca hệ số 1,5× cộng thêm 187,50 trên tuần bình thường 1.000,00.",
      },
      {
        q: "Toàn bộ lương có được dùng để tính lương giờ tăng ca không?",
        a: "FLSA tính tăng ca trên «mức lương bình thường», vốn có thể gồm nhiều hơn lương cơ bản — ví dụ phụ cấp ca và thưởng không tùy ý. Máy tính này chỉ dùng mức lương cơ bản, nên nếu bạn nhận các khoản đó thì mức tăng ca theo luật của bạn có thể cao hơn con số hiển thị ở đây.",
      },
    ],
  },
  "rent-affordability-calculator": {
    name: "Máy tính khả năng trả tiền thuê nhà",
    tagline:
      "Tìm mức tiền thuê tối đa mà thu nhập hàng tháng của bạn gánh được theo quy tắc 30%, 33% hay 40% — rồi xem còn lại bao nhiêu sau nợ và bảo hiểm người thuê.",
    intro: [
      "Nhập thu nhập hàng tháng (trước hay sau thuế), chọn tỷ lệ tiền thuê trên thu nhập — 30% thu nhập trước thuế cổ điển, 33% thoải mái hơn, hoặc 40% thu nhập sau thuế cho thành phố đắt đỏ — và máy tính vẽ trần tiền thuê của bạn. Các khoản nợ hàng tháng khác và bảo hiểm người thuê sau đó được trừ đi để con số bạn thấy thực sự đáng sống.",
      "Bạn cũng nhận được tỷ lệ nợ trên thu nhập ở mức tiền thuê tối đa đó — chính là chỉ số bên cho vay xem trước khi duyệt hợp đồng thuê hay thế chấp. Dòng ngân hàng thành thật chuyển âm khi tiền thuê cộng nợ vượt thu nhập — dấu hiệu nên tìm chỗ rẻ hơn thay vì cố gồng.",
    ],
    steps: [
      "Nhập thu nhập hàng tháng và cho biết trước hay sau thuế.",
      "Chọn tỷ lệ tiền thuê trên thu nhập: 30%, 33% hay 40%.",
      "Thêm các khoản trả nợ hàng tháng khác và bảo hiểm người thuê, nếu có.",
      "Xem trần tiền thuê, ngân hàng còn lại và tỷ lệ nợ trên thu nhập của bạn.",
    ],
    faqs: [
      {
        q: "Quy tắc 30% cho tiền thuê đến từ đâu?",
        a: "Nó truy về Tu chính án Brooke của Mỹ năm 1969, vốn trần tiền thuê nhà công ở 25% thu nhập và nâng lên 30% năm 1981. HUD đến nay vẫn gọi các hộ chi hơn 30% thu nhập cho chỗ ở là «cost-burdened» — vì thế 30% thu nhập trước thuế trở thành cách nói ngắn cho tiền thuê phải chăng.",
      },
      {
        q: "Nên lập ngân sách thuê nhà theo thu nhập trước hay sau thuế?",
        a: "Quy tắc 30% cổ điển áp cho thu nhập trước thuế, nên bỏ qua thuế và trông hào phóng hơn phiếu lương của bạn. Nếu muốn kế hoạch theo thu nhập thực nhận, dùng tỷ lệ cao hơn như 40% sau thuế sẽ rơi vào gần đúng chỗ. Quan trọng là chọn một căn cứ và giữ nhất quán.",
      },
      {
        q: "Tỷ lệ nợ trên thu nhập ở đây nghĩa là gì?",
        a: "Là phần thu nhập bị mức tiền thuê tối đa cộng các khoản nợ và bảo hiểm đã khai chiếm dụng. Bên cho vay thường thích tổng DTI dưới khoảng 36%; trên khoảng 43% thì khó đủ điều kiện vay thế chấp. Số cao nghĩa là trần tiền thuê quá tham vọng so với nghĩa vụ khác của bạn.",
      },
    ],
  },
  "apy-calculator": {
    name: "Máy tính APY",
    tagline:
      "Đổi lãi danh nghĩa APR thành APY hiệu quả — và ngược lại — cho nhập vốn hàng ngày, hàng tháng, hàng quý hay hàng năm, tùy chọn thêm phần tăng trưởng tiền gửi.",
    intro: [
      "Lãi suất danh nghĩa và lãi suất hiệu quả không phải một con số, và quảng cáo lặng lẽ chọn cái nhìn đẹp hơn. Nhập một lãi suất và tần suất nhập vốn — hàng ngày (365), hàng tháng, hàng quý hay hàng năm — máy tính này đổi APR thành APY, hoặc đổi APY ngược về APR danh nghĩa tạo ra nó.",
      "Thêm tùy chọn một khoản tiền gửi và chân trời tính bằng năm để xem tiền thực sự lớn thành gì: số dư sau nhập vốn và lãi kiếm được bên trên. Phép đổi chính xác hai chiều — đảo hướng và kiểm chứng vòng đi-về với bất kỳ báo giá ngân hàng nào.",
    ],
    steps: [
      "Gõ lãi suất được báo cho bạn — APR danh nghĩa hoặc APY hiệu quả.",
      "Chọn tần suất nhập vốn: hàng ngày, hàng tháng, hàng quý hay hàng năm.",
      "Tùy chọn thêm tiền gửi và số năm để chiếu phần tăng trưởng.",
      "Xem lãi suất đã đổi, số dư cuối và lãi kiếm được.",
    ],
    faqs: [
      {
        q: "Tại sao cùng lãi danh nghĩa mà APY cao hơn APR?",
        a: "Vì nhập vốn trả lãi trên lãi. APY = (1 + r ÷ n)^n − 1, nên lãi danh nghĩa 12% nhập vốn hàng tháng thành (1,01)^12 − 1 = 12,6825% hiệu quả: 0,6825 điểm chênh chính là lãi mà lãi của bạn kiếm về. Nhập vốn càng thường xuyên, khoảng cách càng rộng — hàng ngày thắng hàng tháng, hàng tháng thắng hàng năm.",
      },
      {
        q: "Nên so sánh lãi suất nào giữa các ngân hàng?",
        a: "So APY với APY cho tiết kiệm và tiền gửi có kỳ hạn — nó đã gộp sẵn tần suất nhập vốn, nên APY 5,10% nhập tháng thực sự tốt hơn APY 5,05% nhập năm. Với khoản vay, so APR với APR. Trộn APR với APY trong một phép so sánh chính là cách báo giá đánh lừa.",
      },
      {
        q: "Tùy chọn hàng ngày dùng 365 hay 360 ngày?",
        a: "Máy tính này dùng 365 kỳ mỗi năm, quy ước mà phần lớn tài khoản tiết kiệm cá nhân theo. Một số sản phẩm tài chính thay vào đó quy năm trên cơ sở 360 ngày, làm lệch nhẹ lãi hiệu quả — nếu dòng chữ nhỏ ghi 360, hãy coi kết quả là xấp xỉ gần đúng chứ không phải báo giá chính xác.",
      },
    ],
  },
  "gpa-calculator": {
    name: "Máy tính GPA",
    tagline:
      "Đổi các môn học kỳ này thành GPA trên thang 4,0 với điểm chất lượng chuẩn, rồi hòa điểm tín chỉ cũ thành một GPA tích lũy trung thực.",
    intro: [
      "Thêm từng môn với số tín chỉ và điểm chữ, máy tính áp bảng điểm chất lượng chuẩn thang 4,0 — A = 4,0, A− = 3,7, B+ = 3,3, v.v. — và cân mỗi điểm theo tín chỉ. A của môn 4 tín chỉ nặng hơn A của môn 3 tín chỉ, đúng như bảng điểm của bạn ghi.",
      "Đã có điểm từ trước? Nhập GPA cũ và số tín chỉ tích lũy đến giờ, kết quả học kỳ sẽ hòa vào GPA tích lũy bằng đúng trung bình có trọng số mà phòng đào tạo của bạn chạy. Hàng dở dang bị bỏ qua thay vì đoán mò, nên con số chỉ phản ánh môn bạn thực sự nhập.",
    ],
    steps: [
      "Thêm một hàng cho mỗi môn: tên (tùy chọn), số tín chỉ và điểm chữ.",
      "Học kỳ đầu để trống các ô trước đó, hoặc nhập GPA đến hiện tại.",
      "Nhập tín chỉ đã tích lũy để phép hòa được cân đúng trọng số.",
      "Xem GPA học kỳ và GPA tích lũy ghép chung.",
    ],
    faqs: [
      {
        q: "Mỗi điểm chữ mang bao nhiêu điểm chất lượng?",
        a: "Trên thang 4,0 chuẩn: A+ và A = 4,0, A− = 3,7, B+ = 3,3, B = 3,0, B− = 2,7, C+ = 2,3, C = 2,0, C− = 1,7, D+ = 1,3, D = 1,0, D− = 0,7 và F = 0. GPA = Σ(điểm × tín chỉ) ÷ Σtín chỉ, nên A môn 4 tín chỉ góp 12 điểm chất lượng, trong khi B+ môn 3 tín chỉ chỉ 9,9.",
      },
      {
        q: "GPA tích lũy hòa hai bảng điểm thế nào?",
        a: "GPA tích lũy = (GPA học kỳ × tín chỉ học kỳ + GPA cũ × tín chỉ cũ) ÷ tổng tín chỉ. Ví dụ, học kỳ 3,60 trên 7 tín chỉ đặt lên bảng điểm 3,00 trên 60 tín chỉ cho (3,60 × 7 + 3,00 × 60) ÷ 67 ≈ 3,06. Cân theo tín chỉ chính là điều giữ học kỳ nhẹ khỏi làm méo hồ sơ của bạn.",
      },
      {
        q: "Sao hàng không có điểm chữ hay tín chỉ không đổi GPA của tôi?",
        a: "Một môn chỉ được tính khi có cả số tín chỉ lẫn điểm chữ — mọi thứ nhập dở bị loại thay vì tính như 0, để GPA phản ánh đúng các môn bạn thực sự hoàn thành. Hoàn tất hàng đó và các tổng số cập nhật ngay.",
      },
    ],
  },
  "heart-rate-zones-calculator": {
    name: "Máy tính vùng nhịp tim",
    tagline:
      "Đổi nhịp tim tối đa và nhịp nghỉ thành năm vùng tập luyện theo phương pháp Karvonen — khởi động, đốt mỡ, aerobic, anaerobic và VO₂ max, tính bằng bpm.",
    intro: [
      "Nhập tuổi và nhịp tim nghỉ, máy tính ước lượng nhịp tim tối đa của bạn (206,9 − 0,67 × tuổi, một hồi quy từ các mức tối đa đo trong phòng thí nghiệm), rồi cắt khoảng giữa nghỉ và tối đa thành năm vùng tập luyện cổ điển. Người 30 tuổi với nhịp nghỉ 60 bpm được mức tối đa cỡ 187 bpm và dải aerobic Z3 khoảng 149–161 bpm — những con số thật để đối chiếu với dây đeo ngực hay đồng hồ.",
      "Các vùng tính theo phương pháp dự trữ nhịp tim của Karvonen: bpm = nghỉ + % × (tối đa − nghỉ). Vì đại lượng được co giãn là dự trữ — không phải mức tối đa — nên vùng vẫn trung thực với người có nhịp nghỉ thấp hay cao bất thường. Biết mức tối đa đo được từ xét nghiệm phòng lab hoặc một cuộc đua dữ dội? Chuyển sang chế độ thủ công và nhập thẳng.",
    ],
    steps: [
      "Nhập tuổi để ước lượng nhịp tối đa, hoặc chuyển sang Manual và gõ giá trị đo được.",
      "Nhập nhịp tim nghỉ — lần đo buổi sáng trước khi rời giường là tốt nhất.",
      "Xem năm vùng với % dự trữ và khoảng bpm tương ứng.",
      "Trong buổi tập, đối chiếu đồng hồ hay dây đeo với vùng bạn nhắm tới.",
    ],
    faqs: [
      {
        q: "206,9 − 0,67 × tuổi có chính xác hơn 220 − tuổi?",
        a: "Ở mức độ dân số, có. Quy tắc cũ 220 − tuổi bắt nguồn từ một bảng thập niên 1970 chưa từng bình duyệt và ước quá cao nhịp tối đa của người lớn tuổi. Các hồi quy hiện đại dựng trên mức tối đa đo trong phòng thí nghiệm — 208 − 0,7 × tuổi của Tanaka, 207 − 0,7 × tuổi của Gellish, và các phương trình tương tự như 206,9 − 0,67 × tuổi dùng ở đây — bám mức tối đa thật tốt hơn hẳn ở mọi độ tuổi. Nhưng phương trình nào cũng mang độ tản cá nhân khoảng ±10 bpm: ước lượng chỉ là điểm khởi đầu, và mức tối đa đo trong lab hay ở một nỗ lực thật sự dốc toàn lực luôn thắng.",
      },
      {
        q: "Vì sao máy tính dùng dự trữ nhịp tim (HRR) thay vì phần trăm nhịp tối đa?",
        a: "Phương pháp Karvonen đo cường độ từ khoảng cách giữa nhịp nghỉ và nhịp tối đa — phần thực sự làm việc. Dùng % tối đa trực tiếp, vùng 60–70% của ví dụ người 30 tuổi trên nằm ở 112–131 bpm; dùng % dự trữ thì ở 136–149 bpm. Về sinh lý, mức gắng sức tăng theo phần dự trữ bạn đang dùng, nên vùng dựa trên dự trữ khớp tốt hơn với ngưỡng thông khí và cảm giác cố gắng — đặc biệt với người có nhịp nghỉ thấp.",
      },
      {
        q: "Đo nhịp tim nghỉ của tôi thế nào?",
        a: "Đo buổi sáng, vừa tỉnh dậy và trước khi rời giường: đếm mạch 60 giây (hoặc 30 giây × 2), lặp lại vài ngày để làm mượt nhiễu. Con số nghỉ 7 ngày của thiết bị đeo cũng ổn. Người trưởng thành điển hình rơi vào khoảng 60–80 bpm; vận động viên bền bỉ luyện tốt thường ngồi ở vùng 40 hay 50. Nếu nhịp nghỉ của bạn cao hơn mức tối đa ước lượng — hoặc thuốc như beta-blocker ảnh hưởng nhịp tim — hãy nhập cả hai số thủ công.",
      },
    ],
  },
  "shoe-size-converter": {
    name: "Máy chuyển đổi cỡ giày",
    tagline:
      "Đổi cỡ giày giữa các hệ US, UK, EU và Nhật cho nam và nữ — mọi kết quả neo vào chiều dài bàn chân tính bằng centimet.",
    intro: [
      "Chọn bất kỳ hệ và cỡ nào, mọi cỡ tương đương hiện ra cùng lúc, neo vào chiều dài bàn chân tính bằng centimet để so sánh mang tính vật lý chứ không phải phỏng đoán.",
      "Cỡ giày không được chuẩn hóa giữa các hãng — coi kết quả là điểm khởi đầu và đo chân vào cuối ngày, khi chân to nhất.",
    ],
    steps: [
      "Chọn bảng cỡ nam hoặc nữ.",
      "Chọn hệ bạn biết và nhập cỡ.",
      "Xem cỡ tương đương trong mọi hệ còn lại.",
    ],
    faqs: [
      {
        q: "Vì sao các hãng chênh nhau nửa cỡ?",
        a: "Dáng phom và cách sản xuất khác nhau. Bảng cho phép chuyển đổi chuẩn; từng hãng có thể nhỏ hơn hay lớn hơn, nên khi mua online luôn xem bảng cỡ riêng của hãng đó.",
      },
      {
        q: "Đo bàn chân thế nào?",
        a: "Cuối ngày, đứng lên tờ giấy, tô viền cả hai bàn chân rồi đo từ gót tới ngón dài nhất bằng centimet. Lấy chân to hơn.",
      },
    ],
  },
  "stopwatch": {
    name: "Đồng hồ bấm giây",
    tagline:
      "Đồng hồ bấm giây trực tuyến chính xác với thời gian từng vòng — bắt đầu, tạm dừng, bấm vòng và đặt lại — tính giờ không trôi, neo vào đồng hồ hệ thống.",
    intro: [
      "Đo thời gian trôi đến phần trăm giây bằng đồng hồ hệ thống thay vì cộng dồn các khoảng, nên vẫn chính xác cả khi trình duyệt làm chậm tab nền.",
      "Bấm vòng khi đang chạy; mỗi vòng hiển thị đoạn riêng và tổng luỹ kế, với chữ số dạng bảng cỡ lớn để đọc lướt vẫn thấy rõ.",
    ],
    steps: [
      "Nhấn Bắt đầu để bắt đầu tính giờ.",
      "Nhấn Vòng để ghi một đoạn mà không dừng đồng hồ.",
      "Tạm dừng, tiếp tục hoặc đặt lại bất cứ lúc nào.",
    ],
    faqs: [
      {
        q: "Nó có chính xác không?",
        a: "Có — thời gian trôi được suy từ Date.now() so với một dấu thời gian bắt đầu cố định, không phải các lệnh gọi hẹn giờ cộng dồn, nên việc trình duyệt tiết chế tab nền không thể gây trôi.",
      },
      {
        q: "Các vòng có sống sót qua lần tải lại trang?",
        a: "Không — như đồng hồ bấm giây thật, đặt lại hay tải lại xóa sạch phiên. Giữ tab mở để giữ các vòng.",
      },
    ],
  },
  "countdown-timer": {
    name: "Đồng hồ đếm ngược",
    tagline:
      "Đặt đếm ngược với vòng tiến độ và tiếng chuông lúc về 0 — cài sẵn 1 đến 25 phút hoặc bất kỳ thời lượng tùy chỉnh nào.",
    intro: [
      "Một đồng hồ đếm ngược gọn gàng cho nấu ăn, tập luyện, cuộc họp và học bài. Vòng hiển thị tiến độ thoáng nhìn, và một tiếng kêu tổng hợp ngắn vang lên khi hết giờ.",
      "Thời điểm hết giờ neo vào đồng hồ hệ thống, nên đếm ngược tiếp tục chạy đúng dù bạn chuyển sang tab khác.",
    ],
    steps: [
      "Đặt giờ, phút, giây — hoặc chạm một cài đặt nhanh.",
      "Nhấn Bắt đầu; vòng rút dần theo thời gian.",
      "Về 0, chuông kêu và vòng chuyển sang màu xanh lá.",
    ],
    faqs: [
      {
        q: "Nó có chạy tiếp trong tab nền?",
        a: "Có — thời điểm hết giờ neo vào đồng hồ hệ thống, nên đổi tab hay bị tiết chế không ảnh hưởng thời gian còn lại.",
      },
      {
        q: "Tôi có nghe thấy tiếng chuông?",
        a: "Đó là một âm ngắn tổng hợp qua WebAudio. Giữ tab không tắt tiếng và mở âm lượng thiết bị; không có tệp âm thanh nào cần tải.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Development — TypeScript, JSON diff, JSON paths, YAML                */
  /* ------------------------------------------------------------------ */
  "json-to-typescript": {
    name: "JSON sang TypeScript",
    tagline:
      "Sinh interface TypeScript từ JSON bất kỳ — đối tượng lồng nhau, mảng và union, sẵn sàng dán vào dự án của bạn.",
    intro: [
      "Dán một response JSON và nhận interface có kiểu ngay lập tức: đối tượng lồng nhau thành interface có tên, mảng đối tượng gộp mọi phần tử thành một hình dạng, mảng hỗn hợp thành union. Tên gốc có thể đặt lại.",
      "Sinh ra cho công việc API — dán response của endpoint, sao chép các kiểu, và để compiler bắt các thay đổi hình dạng thay bạn.",
    ],
    steps: [
      "Dán JSON của bạn (response API chạy tốt nhất).",
      "Đổi tên interface gốc nếu muốn gì khác ngoài Root.",
      "Sao chép các interface đã sinh vào dự án.",
    ],
    faqs: [
      {
        q: "Mảng được xử lý thế nào?",
        a: "Mảng đối tượng gộp khóa của mọi phần tử vào một interface (khóa thiếu lẽ ra đã là lỗi lúc chạy). Mảng kiểu hỗn hợp thành union như string | number. Mảng rỗng hạ xuống unknown[].",
      },
      {
        q: "Mọi trường đều bắt buộc?",
        a: "Có — một mẫu đơn không chứng minh được tính tùy chọn nên tất cả đều bắt buộc. Tự đánh dấu trường tùy chọn ở chỗ API của bạn cho phép null hay thiếu khóa.",
      },
    ],
  },
  "json-diff": {
    name: "JSON Diff",
    tagline:
      "So sánh hai tài liệu JSON theo từng đường dẫn — khóa thêm, khóa mất, giá trị đổi kèm giá trị trước/sau, tất cả chạy cục bộ.",
    intro: [
      "Dán hai tài liệu JSON và xem mọi khác biệt cấu trúc: khóa được thêm, khóa bị xóa, giá trị thay đổi — mỗi mục báo kèm đường dẫn đầy đủ như $.user.name.",
      "Đối tượng và mảng lồng nhau được đi đệ quy, nên thay đổi chôn sâu ba tầng vẫn hiện ra với đúng đường dẫn và cả hai giá trị.",
    ],
    steps: [
      "Dán JSON thứ nhất (bản gốc).",
      "Dán JSON thứ hai (bản mới).",
      "Đọc danh sách khác biệt — mỗi dòng là một thay đổi cấp đường dẫn.",
    ],
    faqs: [
      {
        q: "Mảng được so sánh ra sao?",
        a: "Theo chỉ số: phần tử 0 với phần tử 0, cứ thế tiếp diễn. Phần tử thừa ở bên nào hiện là thêm hoặc bớt tại chỉ số của nó.",
      },
      {
        q: "Thứ tự khóa có quan trọng không?",
        a: "Không — đối tượng so theo khóa, không theo thứ tự chèn. Hai tài liệu cùng khóa nhưng khác thứ tự được coi là giống hệt.",
      },
    ],
  },
  "json-path-query": {
    name: "Truy vấn JSON Path",
    tagline:
      "Rút bất kỳ giá trị nào từ JSON bằng đường dẫn như $.user.name hay $.items[0].id — tức thì, khoan dung, không cần học cú pháp jq.",
    intro: [
      "Chỉ thẳng vào giá trị bạn cần: ký tự chấm, chỉ số mảng và khóa có ngoặc đều chạy ($.items[0].id, $['weird key']). Chuẩn để kéo một trường ra khỏi response API khổng lồ.",
      "Không bao giờ ném lỗi — path sai trả về lý do bằng ngôn ngữ đời thường (không tìm thấy khóa, chỉ số vượt phạm vi) để bạn sửa rồi thử lại.",
    ],
    steps: [
      "Dán JSON của bạn.",
      "Gõ đường dẫn tới giá trị muốn lấy — $ là gốc.",
      "Sao chép giá trị đã rút ra.",
    ],
    faqs: [
      {
        q: "Hỗ trợ cú pháp đường dẫn nào?",
        a: "Tập con hằng ngày: ký tự chấm ($.a.b), chỉ số mảng ($.items[0]), khóa có ngoặc ($['odd key']). Bộ lọc và ký tự đại diện của JSONPath đầy đủ nằm ngoài phạm vi — công cụ này để trích trực tiếp.",
      },
      {
        q: "Path sai thì sao?",
        a: "Bạn nhận đúng lý do: khóa nào thiếu hay chỉ số nào vượt phạm vi. Không gì đổ vỡ.",
      },
    ],
  },
  "json-yaml-converter": {
    name: "Chuyển đổi JSON ⇄ YAML",
    tagline:
      "Chuyển JSON sang YAML và ngược lại — sẵn sàng cho file cấu hình, với nút hoán đổi để làm tiếp và thông báo lỗi chính xác.",
    intro: [
      "Chuyển đổi hai chiều giữa JSON và YAML: dán JSON nhận YAML sạch thụt lề 2 khoảng trắng cho file cấu hình; dán YAML nhận JSON. Nút hoán đổi lật chiều để bạn đi-về-trong một bảng duy nhất.",
      "Chạy trên js-yaml với báo lỗi chính xác — thụt lề sai hay khóa trùng chỉ đích danh chỗ sai thay vì một thất bại mơ hồ.",
    ],
    steps: [
      "Dán JSON hay YAML tùy chiều chuyển.",
      "Bấm chuyển đổi — kết quả hiện bên dưới.",
      "Dùng nút hoán đổi để tiếp tục chuyển theo chiều ngược lại.",
    ],
    faqs: [
      {
        q: "Hỗ trợ những tính năng YAML nào?",
        a: "Lược đồ core chuẩn của js-yaml: map lồng nhau, sequence, scalar, chuỗi có ngoặc. Anchor YAML và tag tùy chỉnh nằm ngoài phạm vi để đảm bảo đi-về đáng tin cậy.",
      },
      {
        q: "Vì sao chuyển đổi của tôi thất bại?",
        a: "Thường nhất là ký tự tab trong thụt lề YAML (bị cấm ở đó) hay khóa trùng trong JSON. Thông báo lỗi chỉ đúng chỗ trục trặc.",
      },
    ],
  },
  "sha1-generator": {
    name: 'Trình tạo SHA-1',
    tagline: 'Tính băm SHA-1 của văn bản hoặc tệp ngay trong trình duyệt bằng WebCrypto gốc — vẫn còn trong Git commit và checksum cũ. Xử lý 100% cục bộ.',
    intro: ['Dán văn bản để thấy digest SHA-1 160-bit ngay lập tức, hoặc thả tệp để lấy vân tay cục bộ. Cỗ máy WebCrypto của trình duyệt làm việc — không byte nào rời khỏi thiết bị.', 'SHA-1 là thuật toán cũ nhưng vẫn sống: Git vẫn định danh đối tượng bằng nó và nhiều hệ thống cũ xác minh tải xuống bằng checksum SHA-1. Dùng cho tương thích — còn bảo mật thì chọn SHA-256 trở lên.'],
    steps: ['Nhập hoặc dán văn bản — digest cập nhật theo thời gian thực.', 'Hoặc chuyển sang chế độ tệp và thả tệp để băm cục bộ.', 'Sao chép digest thập lục phân và so với giá trị mong đợi.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "sha384-generator": {
    name: 'Trình tạo SHA-384',
    tagline: 'Tính băm SHA-384 của văn bản hoặc tệp ngay trong trình duyệt bằng WebCrypto gốc — digest SHA-2 mạnh nhất cho checksum, HMAC và toàn vẹn lưu trữ. Xử lý 100% cục bộ.',
    intro: ['Dán văn bản để thấy digest 384-bit ngay lập tức, hoặc thả tệp để lấy vân tay cục bộ. Trên phần cứng 64-bit SHA-384 thường nhanh hơn SHA-256 — lý tưởng cho kho lưu trữ lớn.', 'SHA-384 xuất hiện trong chữ ký HMAC của API, xác minh ảnh đĩa và checksum lưu trữ dài hạn. Sao chép digest thập lục phân và so với giá trị công bố.'],
    steps: ['Nhập hoặc dán văn bản — digest cập nhật theo thời gian thực.', 'Hoặc chuyển sang chế độ tệp và thả tệp để băm cục bộ.', 'Sao chép digest thập lục phân và so sánh.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "sha512-generator": {
    name: 'Trình tạo SHA-512',
    tagline: 'Tính băm SHA-512 của văn bản hoặc tệp ngay trong trình duyệt bằng WebCrypto gốc — digest SHA-2 mạnh nhất cho checksum, HMAC và toàn vẹn lưu trữ. Xử lý 100% cục bộ.',
    intro: ['Dán văn bản để thấy digest 512-bit ngay lập tức, hoặc thả tệp để lấy vân tay cục bộ. Trên phần cứng 64-bit SHA-512 thường nhanh hơn SHA-256 — lý tưởng cho kho lưu trữ lớn.', 'SHA-512 xuất hiện trong chữ ký HMAC của API, xác minh ảnh đĩa và checksum lưu trữ dài hạn. Sao chép digest thập lục phân và so với giá trị công bố.'],
    steps: ['Nhập hoặc dán văn bản — digest cập nhật theo thời gian thực.', 'Hoặc chuyển sang chế độ tệp và thả tệp để băm cục bộ.', 'Sao chép digest thập lục phân và so sánh.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "text-to-binary": {
    name: 'Văn bản → nhị phân',
    tagline: 'Chuyển bất kỳ văn bản nào thành byte nhị phân 8-bit và ngược lại — an toàn UTF-8, tức thì, hoàn toàn trong trình duyệt. Hợp cho giảng dạy, đố vui và bài tập tin học.',
    intro: ["Mỗi ký tự bạn gõ trở thành chuỗi byte UTF-8 hiển thị thành nhóm tám chữ 0 và 1. 'Hi!' thành 01001000 01101001 00100001 — đúng những bit máy tính lưu trữ, ở dạng có thể đọc và sao chép.",
        'Bật Giải mã để đi ngược: dán các nhóm nhị phân cách nhau bằng dấu cách và nhận lại văn bản gốc. Ký tự nhiều byte như emoji và CJK được xử lý đúng vì giải mã đi qua TextDecoder UTF-8 gốc của trình duyệt.'],
    steps: ['Nhập hoặc dán văn bản để mã hóa — nhị phân hiện ngay.',
        "Bật 'Giải mã nhị phân thành văn bản' để chuyển các nhóm nhị phân ngược thành từ.",
        'Sao chép kết quả bằng một cú nhấp.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "text-to-unicode": {
    name: 'Văn bản → Unicode',
    tagline: 'Escape văn bản bất kỳ thành \\uXXXX, \\u{...}, U+XXXX hoặc điểm mã thập phân — và giải mã tất cả ngược lại. An toàn emoji, tức thì, hoàn toàn cục bộ.',
    intro: ['Escape Unicode là cách mã nguồn, tải trọng JSON và tệp cấu hình biểu diễn các ký tự khó gõ hoặc không an toàn để nhúng. Dán chuỗi bất kỳ và chọn ký hiệu: \\uXXXX cho dạng cổ điển JavaScript/Java, \\u{...} hỗ trợ đầy đủ mặt bổ sung, U+XXXX như trong bảng mã, hoặc điểm thập phân.',
        'Chế độ giải mã hiểu cả bốn ký hiệu trộn lẫn: từ \\u00e9 đến U+1F600 hay &#128512; bạn nhận lại văn bản đọc được. Ký tự ngoài BMP (emoji, CJK hiếm) tự chuyển sang \\u{...} trong chế độ \\uXXXX thay vì tạo cặp thay thế hỏng.'],
    steps: ['Dán văn bản để escape — kết quả cập nhật ngay.',
        'Chọn ký hiệu: \\uXXXX, \\u{...}, U+XXXX hoặc thập phân.',
        'Hoặc bật chế độ giải mã và dán escape để nhận lại văn bản.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "text-to-nato-alphabet": {
    name: 'Bộ chuyển đổi bảng chữ NATO',
    tagline: 'Đánh vần bất kỳ văn bản nào bằng bảng chữ âm NATO — Alfa, Bravo, Charlie — và giải mã các từ được đánh vần ngược thành văn bản. Chuẩn cho liên lạc vô tuyến và điện thoại rõ ràng.',
    intro: ['Bảng chữ cái phiên âm NATO (Alfa, Bravo, Charlie…) thay mỗi chữ bằng một từ duy nhất, nhờ đó văn bản được truyền qua vô tuyến hay điện thoại không sai dù có ồn ào.',
        'Dán văn bản của bạn: mọi chữ, chữ số và ký hiệu được chuyển thành từ mã chuẩn ICAO/NATO.',
        'Chế độ giải mã làm ngược lại: dán chuỗi từ mã và nhận lại văn bản gốc.',
        'Các biến thể chính tả phổ biến vẫn được nhận diện (Alfa/Alpha, Juliett/Juliet).',
        'Mọi thứ chạy ngay trong trình duyệt: không gửi văn bản nào lên máy chủ.'],
    steps: ['Dán hoặc gõ văn bản cần đánh vần vào ô nhập liệu.',
        'Đọc chuỗi từ mã được tạo, hoặc bật chế độ giải mã rồi dán các từ mã vào.',
        'Sao chép kết quả và dùng cho liên lạc vô tuyến, hỗ trợ kỹ thuật hoặc đánh vần tên.'],
    faqs: [
        { q: 'Bảng chữ cái NATO là gì?', a: 'Bảng phiên âm chuẩn NATO/ICAO: mỗi chữ được thay bằng một từ (A = Alfa, B = Bravo…) để tránh nhầm lẫn khi truyền tin. Hàng không, quân đội, cứu hộ và hỗ trợ kỹ thuật đều dùng.' },
        { q: 'Chữ số có được chuyển không?', a: 'Có. 0–9 thành Zero, One (Wun), Two, Tree, Fower, Five, Six, Seven, Eight, Nine — cách đọc chuẩn ICAO hiện bên cạnh mỗi từ mã.' },
        { q: 'Dấu thanh và emoji?', a: 'Chữ có dấu được quy về chữ gốc (É → Echo); emoji và ký tự ngoài bảng chữ cái được giữ nguyên kèm ghi chú vì không thể đánh vần.' },
    ],
  },
  "hmac-generator": {
    name: 'Trình tạo HMAC',
    tagline: 'Tính chữ ký HMAC-SHA-256/384/512 cho bất kỳ thông điệp nào với khóa bí mật — ngay trong trình duyệt qua WebCrypto. Công cụ cần thiết để xác minh webhook, xác thực API và ký yêu cầu.',
    intro: ['HMAC (Hash-based Message Authentication Code) chứng minh thông điệp đến từ người giữ khóa bí mật chung — mà không cần gửi khóa đi. Stripe, GitHub, Slack và hầu hết webhook đều ký payload theo cách này; dán chữ ký và khóa của bạn vào đây để tái tạo và đối chiếu.',
        'Chọn SHA-256 làm mặc định, SHA-512 để có biên an toàn tối đa, SHA-1 chỉ khi API cũ yêu cầu. Kết quả hiển thị cả hex lẫn Base64 — dùng đúng định dạng mà dịch vụ mong đợi.'],
    steps: ['Nhập khóa bí mật chung — chính là chuỗi mà máy chủ hay nhà cung cấp webhook đã cấp.',
        'Dán phần thân thông điệp thô (đúng từng byte: JSON, query string, timestamp+payload — cái mà API ký).',
        'So sánh chữ ký hex hoặc Base64 vừa tạo với tiêu đề X-Signature, hoặc dùng để ký yêu cầu của chính bạn.'],
    faqs: [
        { q: 'HMAC khác gì băm thông thường?', a: 'Ai cũng tính được SHA-256(thông điệp). HMAC(bí mật, thông điệp) đòi hỏi khóa: chỉ người giữ khóa mới tái tạo được chữ ký. Đây là bằng chứng nguồn gốc và toàn vẹn, không chỉ là checksum.' },
        { q: 'Vì sao webhook dùng HMAC?', a: 'Khi Stripe hay GitHub POST vào endpoint của bạn, họ kèm chữ ký HMAC của phần thân. Tính lại bằng khóa webhook; khớp nghĩa là yêu cầu thật sự đến từ họ — không có khóa thì không ai giả mạo nổi.' },
        { q: 'Dán khóa bí mật vào đây có an toàn không?', a: 'An toàn — toàn bộ phép tính chạy trong WebCrypto của trình duyệt. Khóa và thông điệp không bao giờ rời thiết bị; không ghi log hay truyền đi đâu. Dù vậy, như thói quen chung, hãy xoay vòng các khóa bạn dán vào bất kỳ trang web nào.' },
        { q: 'HMAC-SHA-256 hay HMAC-SHA-512?', a: 'SHA-256 là chuẩn phổ biến. SHA-512 cho biên lớn hơn và thậm chí nhanh hơn trên CPU 64-bit; dùng khi đặc tả cho phép. Tránh SHA-1 trừ khi hệ thống cũ bắt buộc.' },
    ],
  },
  "unlock-pdf": {
    name: 'Mở khóa PDF',
    tagline: 'Loại bỏ các hạn chế cấp chủ sở hữu khỏi tệp PDF đọc được và tải bản sao sạch — mở khóa ngay trong trình duyệt, không cần tải lên.',
    intro: ['Một số PDF mở bình thường nhưng từ chối in, sao chép hay chú thích vì các cờ quyền của chủ sở hữu. Công cụ này tải tài liệu bằng pdf-lib rồi lưu một bản sao mới không còn những hạn chế đó, nên in ấn và chọn văn bản hoạt động trở lại trong mọi trình đọc.',
        'Mọi thứ diễn ra trên thiết bị của bạn: tệp được đọc và ghi lại cục bộ, không bao giờ gửi lên máy chủ. Hãy lưu ý giới hạn thực tế — tệp PDF bắt buộc nhập mật khẩu mỗi lần mở không thể giải mã tại đây, và công cụ này cũng không thêm mã hóa; nó chỉ tạo bản sao không hạn chế của tệp mà bạn vốn đọc được.'],
    steps: ['Thả tệp PDF bị hạn chế nhưng mở được mà không cần mật khẩu.',
        'Bấm Bỏ bảo vệ — tệp sẽ được lưu lại cục bộ mà không có các cờ quyền.',
        'Tải bản sao sạch và in, sao chép hoặc chú thích thoải mái.'],
    faqs: [
        { q: 'Có thể bỏ mật khẩu mở tệp không?', a: 'Chỉ khi trình đọc của bạn đã lưu mật khẩu và hiển thị nội dung không cần hỏi. Tệp thực sự cần mật khẩu để mở thì được mã hóa bằng mật khẩu đó, và công cụ này không cố bẻ khóa hay giải mã.' },
        { q: 'Có thể đặt mật khẩu cho PDF tại đây không?', a: 'Không. Mã hóa AES đáng tin cho PDF không khả thi với bản triển khai nhẹ chỉ trong trình duyệt, nên trang không cung cấp thêm mật khẩu — chỉ gỡ hạn chế khỏi tệp đọc được.' },
    ],
  },
  "flatten-pdf": {
    name: 'Làm phẳng PDF',
    tagline: 'Gắn các trường biểu mẫu PDF vào trang như nội dung tĩnh trước khi nộp — ô đánh dấu, ô nhập liệu và chữ ký trở thành vĩnh viễn, ngay trong trình duyệt của bạn.',
    intro: ['Biểu mẫu PDF đã điền là tương tác: giá trị nằm trong các đối tượng trường riêng mà một số trình đọc sẽ đặt lại, làm mất hoặc sắp xếp lại khi chuyển tiếp tệp. Làm phẳng bằng pdf-lib vẽ từng trường trực tiếp lên trang của nó, nên những gì bạn điền chính là thứ mọi trình đọc hiển thị — yêu cầu bắt buộc ở nhiều cổng tuyển dụng, thuế và lưu trữ.',
        'Tài liệu sau xử lý trông giống hệt nhưng không còn chứa trường biểu mẫu: không thể xóa, sửa hay nộp lại gì cả. Mọi thứ chạy trên thiết bị của bạn với pdf-lib; tệp không bao giờ rời trình duyệt. Nếu PDF không có trường điền được, công cụ sẽ báo thay vì tạo bản sao vô nghĩa.'],
    steps: ['Thả biểu mẫu PDF đã điền mà bạn sắp nộp.',
        'Bấm Làm phẳng biểu mẫu — các trường được vẽ lên các trang như nội dung tĩnh.',
        'Tải PDF đã làm phẳng và nộp hoặc chia sẻ an tâm.'],
    faqs: [
        { q: 'Trang có nhìn giống hệt sau khi làm phẳng không?', a: 'Có. Giá trị trường được vẽ tại chỗ, nên kết quả hiển thị khớp với những gì bạn thấy. Khác biệt nằm bên dưới: tệp không còn các đối tượng trường tương tác.' },
        { q: 'Biểu mẫu có thể chỉnh sửa lại được không?', a: 'Không, và đó chính là mục đích. Làm phẳng là không thể đảo ngược ở tệp kết quả — các giá trị trở thành nội dung trang thường. Giữ tệp gốc tương tác nếu bạn có thể cần chỉnh sửa sau.' },
    ],
  },
  "pdf-crop": {
    name: 'Cắt PDF',
    tagline: 'Cắt trang PDF bằng cách kéo một hình chữ nhật trên bản xem trước trực tiếp — lề giảm hoặc viền quét cho mọi trang hoặc danh sách tùy chọn, hoàn toàn trong trình duyệt của bạn.',
    intro: ['Máy quét thêm viền rộng, slide giữ khung đen, và bài thuyết trình chứa nhiều khoảng trắng hơn màn hình cần. Kéo hình chữ nhật trên trang đầu đã kết xuất, hoặc tinh chỉnh phần trăm trái, trên, rộng, cao bằng ô nhập số, rồi áp dụng cho mọi trang hoặc chỉ những trang bạn liệt kê, như “1-3, 7”.',
        'Việc cắt được ghi thành crop box của PDF bằng pdf-lib: trình đọc và máy in chỉ hiển thị vùng đã chọn trong khi nội dung gốc vẫn nằm trong tệp — không phá hủy gì và có thể hoàn tác bằng cách đặt lại hộp. Không tải lên, không raster hóa — văn bản vẫn chọn được và chất lượng nguyên vẹn.'],
    steps: ['Thả tệp PDF và xem bản xem trước của trang 1.',
        'Kéo hình chữ nhật lên vùng muốn giữ, hoặc nhập phần trăm chính xác bên dưới bản xem trước.',
        'Chọn tất cả các trang hoặc danh sách tùy chọn, bấm Cắt PDF và tải kết quả về.'],
    faqs: [
        { q: 'Việc cắt có phá hủy nội dung không?', a: 'Không. Crop box chỉ thay đổi vùng nào được hiển thị và in; nội dung gốc vẫn nằm trong tệp. Trình đọc nào đặt lại crop box về media box sẽ hiển thị lại trang gốc đầy đủ.' },
        { q: 'Tại sao bản xem trước chỉ có trang 1?', a: 'Hình chữ nhật được định nghĩa theo phần trăm của trang, nên nó co giãn cho mọi trang đích dù kích thước khác nhau. Trang 1 được kết xuất trực tiếp bằng pdf.js, và bốn ô nhập số cho điều khiển chính xác khi kéo chưa đủ chuẩn.' },
    ],
  },
  "eta-calculator": {
    name: 'Máy tính ETA',
    tagline: 'Ước tính khi nào công việc hoàn thành từ tổng khối lượng và tốc độ hoàn thành theo giờ, ngày hay tuần — với đếm ngược số ngày và thời lượng dễ đọc kiểu "3 ngày 4 giờ".',
    intro: ['Nhập tổng khối lượng công việc (bất kỳ đơn vị nào: ticket, trang, ki-lô-mét, dòng), tốc độ hoàn thành và tùy chọn số giờ làm việc mỗi ngày. Máy tính trả về thời điểm hoàn thành dự kiến, đếm ngược từ bây giờ, và thời lượng dạng dễ đọc như "3 ngày 4 giờ".',
        'Tốc độ theo ngày và tuần tôn trọng số giờ làm việc bạn đặt: với ngày làm 8 giờ, một công việc 40 giờ trải trên năm ngày lịch thay vì giả định bạn làm việc suốt ngày đêm.'],
    steps: ['Nhập tổng khối lượng và đơn vị đo — số dương nào cũng được.',
        'Chọn tốc độ hoàn thành theo giờ, theo ngày hoặc theo tuần.',
        'Đặt số giờ làm việc mỗi ngày (tùy chọn) và, nếu cần, thời điểm bắt đầu tùy chỉnh.',
        'Xem thời điểm hoàn thành dự kiến, số ngày còn lại và thời lượng; sao chép thời điểm hoàn thành bằng một cú nhấp.'],
    faqs: [
        { q: 'Giờ làm việc ảnh hưởng thế nào đến ước tính?', a: 'Tốc độ "theo ngày" giả định bạn đạt được nó trong số giờ làm việc hằng ngày đã đặt, và đếm ngược theo lịch kéo dài tương ứng. Tốc độ "theo tuần" giả định tuần làm việc 5 ngày: một tuần tốc độ trải qua bảy ngày lịch.' },
        { q: 'Dùng đơn vị nào cho khối lượng?', a: 'Bất kỳ đơn vị nhất quán nào: ticket, bài viết, ki-lô-mét đường, dòng cơ sở dữ liệu. Máy tính chỉ cần tỷ lệ giữa khối lượng và tốc độ, nên hai phía phải dùng cùng một đơn vị.' },
        { q: 'Có thể đặt thời điểm bắt đầu ở tương lai hoặc quá khứ không?', a: 'Được. Mặc định đếm ngược bắt đầu từ bây giờ, nhưng bạn có thể bật thời điểm bắt đầu tùy chỉnh — hữu ích để ước tính công việc bắt đầu thứ Hai tới, hoặc kiểm tra khi nào công việc bắt đầu tuần trước sẽ xong.' },
    ],
  },
  "mime-types": {
    name: 'Bảng kiểu MIME',
    tagline: 'Tìm trong hơn 120 kiểu MIME phổ biến theo phần mở rộng hoặc tiền tố MIME, có danh mục và mô tả, và sao chép bất kỳ kiểu nào bằng một cú nhấp.',
    intro: ['Khi cấu hình máy chủ web, bộ xử lý tải lên, tiêu đề CORS hay bộ lọc đính kèm thư, bạn cần kiểu MIME chính xác cho từng phần mở rộng — đoán mò giữa image/jpg và image/jpeg khiến lỗi xuất hiện lặng lẽ. Bảng này bao phủ những phần mở rộng thực tế hay gặp: tài nguyên web, hình ảnh, âm thanh và video, tài liệu văn phòng, tập tin nén, phông chữ, tệp cấu hình và một số mã nguồn ngôn ngữ lập trình.',
        'Lọc theo phần mở rộng (có hoặc không có dấu chấm) hoặc tiền tố MIME như text/ hay application/json. Mỗi hàng có nút sao chép một cú nhấp, nên chuỗi đến clipboard chính xác là chuỗi cần đưa vào cấu hình của bạn.'],
    steps: ['Nhập phần mở rộng (pdf, .png) hoặc tiền tố MIME (audio/, video/web) vào ô lọc.',
        'Xem các hàng khớp: phần mở rộng, kiểu MIME, danh mục và mô tả ngắn.',
        'Nhấp Sao chép trên một hàng để đưa kiểu MIME chính xác vào clipboard.'],
    faqs: [
        { q: 'Vì sao một số mục hiển thị text/javascript thay vì application/javascript?', a: 'RFC 9239 đã tuyên bố application/javascript lỗi thời, thay bằng text/javascript, và các máy chủ WHATWG dùng nó làm mặc định. Bảng này theo tiêu chuẩn hiện hành ở những chỗ đã thay đổi, nên giá trị bạn sao chép chính là giá trị máy chủ và trình kiểm tra hiện đại mong đợi.' },
        { q: 'Đây có phải toàn bộ danh mục kiểu phương tiện của IANA?', a: 'Không — IANA liệt kê hơn một nghìn kiểu đã đăng ký, nhiều kiểu dành riêng cho nhà cung cấp hoặc mang tính lịch sử. Bảng này tập trung vào khoảng 120 mục thực sự gặp trong phát triển web, cấu hình triển khai và thư điện tử, với giá trị hiện hành chính xác.' },
        { q: 'Vì sao .ts xuất hiện hai lần với danh mục khác nhau?', a: 'Phần mở rộng này thực sự nhập nhằng: mã nguồn TypeScript (text/x.typescript) và luồng truyền MPEG (video/mp2t) đều dùng .ts. Máy chủ quyết định theo ngữ cảnh thư mục, nên hãy kiểm tra trường hợp nào áp dụng cho bạn.' },
    ],
  },
  "keycode-info": {
    name: 'Mã phím',
    tagline: 'Nhấn phím bất kỳ để xem ngay event.key, event.code và keyCode kiểu cũ, cùng trạng thái phím bổ trợ và lịch sử 10 lần nhấn phím gần nhất.',
    intro: ['Lỗi xử lý bàn phím thường đến từ việc nhầm lẫn ba giá trị nhận diện của KeyboardEvent: event.key là ký tự tạo ra ("a" hoặc "A" khi giữ Shift), event.code là phím vật lý (KeyA bất kể bố cục bàn phím), và keyCode là mã số kiểu cũ mà mã cũ vẫn dựa vào. Nhấn phím trên trang này hiển thị cả ba cạnh nhau ngay lập tức, kèm các phím bổ trợ đang giữ ở thời điểm đó.',
        'Trang còn giữ 10 lần nhấn gần nhất trong một bảng lịch sử nhỏ, để bạn so sánh giá trị giữa các phím thay vì nhấn rồi quên. Hữu ích khi nối điều khiển game, phím tắt, hoặc gỡ lỗi lý do handler keydown kích hoạt hai lần (bật tùy chọn bỏ qua lặp để lọc tự động lặp).'],
    steps: ['Nhấp ở bất kỳ đâu trên trang để trang nhận tiêu điểm bàn phím, rồi nhấn một phím.',
        'Đọc event.key, event.code và keyCode từ ba thẻ; Ctrl/Alt/Shift/Meta sáng lên khi đang giữ.',
        'Bật "bỏ qua tự động lặp" để lọc các lần nhấn giữ, và so sánh các phím trong bảng 10 lần gần nhất.'],
    faqs: [
        { q: 'Vì sao event.key và event.code khác nhau cho cùng một phím?', a: 'event.key báo ký tự tạo ra theo bố cục và trạng thái bổ trợ hiện tại ("A", "á", "1"), còn event.code báo vị trí vật lý (KeyA, Digit1) độc lập với bố cục. Phím tắt thường nên khớp theo code; xử lý văn bản nên đọc key.' },
        { q: 'keyCode đã bị loại bỏ?', a: 'Có — nó là di sản, chỉ giữ lại để tương thích với mã cũ phân nhánh theo số như 13 (Enter) hoặc 27 (Escape). Mã mới nên dùng event.key hoặc event.code; công cụ này hiển thị nó để tra các hằng số cũ khi chuyển đổi.' },
        { q: 'Vì sao cùng một giá trị lặp lại khi tôi giữ một phím?', a: 'Giữ phím khiến hệ điều hành gửi các sự kiện keydown lặp lại với repeat là true. Bật "bỏ qua tự động lặp" để chỉ hiển thị lần nhấn đầu; tắt đi nếu cần kiểm tra handler của bạn có nhận đúng sự kiện lặp.' },
    ],
  },
  "ipv4-subnet-calculator": {
    name: 'Máy tính subnet IPv4',
    tagline: 'Nhập CIDR như 192.168.1.0/24 để nhận địa chỉ mạng và broadcast, mặt nạ, wildcard, dải host, số host dùng được, lớp IP và cờ dải riêng tư.',
    intro: ['Định cỡ mạng, viết quy tắc tường lửa hay tóm tắt tuyến đều bắt đầu từ cùng một nhóm giá trị: mạng bắt đầu và kết thúc ở đâu, mặt nạ nào diễn đạt nó và thực tế chứa bao nhiêu host. Nhập một CIDR (hoặc IP đơn lẻ, coi như /32) và mọi giá trị xuất hiện cùng lúc — địa chỉ mạng và broadcast, mặt nạ subnet dạng chấm, mặt nạ wildcard cho cú pháp ACL, host dùng được đầu tiên và cuối cùng, tổng số và số dùng được, chữ lớp, và dải có phải riêng tư không (RFC 1918, loopback, link-local hay CGNAT).',
        'Chế độ thứ hai trả lời câu hỏi khác: cho hai địa chỉ IP, khối CIDR đơn nhỏ nhất chứa cả hai là gì? Đó chính là điều bạn cần khi gộp hai host vào một quy tắc tường lửa hay tóm tắt tuyến — và tính tay dễ sai một cách đáng ngạc nhiên.'],
    steps: ['Nhập CIDR như 10.0.0.0/8 hoặc 192.168.1.130/26; IP không có tiền tố được coi là /32.',
        'Đọc mạng, broadcast, mặt nạ, wildcard, dải và số lượng từ các thẻ kết quả; giá trị chính sao chép bằng một cú nhấp.',
        'Chuyển sang tab CIDR nhỏ nhất và nhập hai IP để nhận khối nhỏ nhất chứa cả hai.'],
    faqs: [
        { q: 'Vì sao /31 báo tất cả địa chỉ đều dùng được?', a: 'RFC 3021 định nghĩa /31 cho liên kết điểm-điểm, nơi không dành riêng địa chỉ mạng lẫn broadcast, nên cả hai địa chỉ đều dùng được. /32 là tuyến single-host với một địa chỉ theo định nghĩa. Quy tắc cổ điển "trừ hai" chỉ áp dụng từ /30 trở lên.' },
        { q: 'Công cụ kiểm tra những dải riêng tư nào?', a: 'Không gian riêng RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), loopback (127.0.0.0/8), link-local IPv4 (169.254.0.0/16) và không gian chia sẻ CGNAT (100.64.0.0/10). Ngoài những dải này, địa chỉ được đánh dấu công khai.' },
        { q: 'Lớp IP còn có ý nghĩa không?', a: 'Không cho định tuyến — internet chuyển sang CIDR không lớp từ nhiều thập kỷ trước. Chữ A/B/C/D/E chỉ hiển thị để tham khảo, vì tài liệu cũ, đề thi và một số thiết bị cũ vẫn dùng thuật ngữ lớp.' },
        { q: 'CIDR nhỏ nhất chứa hai IP được tính thế nào?', a: 'Hai địa chỉ được XOR để tìm các bit thấp nào khác nhau; tiền tố là vị trí bit đầu tiên hai địa chỉ trùng nhau, và khối được căn theo biên đó. Ví dụ 10.1.2.3 và 10.1.9.200 cùng rơi vào 10.1.0.0/20.' },
    ],
  },
  "json-viewer": {
    name: 'Trình xem JSON',
    tagline: 'Dán JSON và khám phá dưới dạng cây có thể gập với giá trị được định kiểu, tô màu bên cạnh nguồn đã định dạng — tức thì, riêng tư, ngay trong trình duyệt.',
    intro: ['Phản hồi API lồng nhau và file cấu hình khó đọc dưới dạng văn bản thô. Trình xem này phân tích JSON của bạn và vẽ cây gập được bên trái — mọi đối tượng hay mảng đều gập/mở được — trong khi khung bên phải hiển thị tài liệu đã định dạng. Giá trị được định kiểu và tô màu: chuỗi xanh lá, số xanh dương, boolean hổ phách, null xám; chuỗi dài bị cắt ở 60 ký tự.',
        'Đầu vào không hợp lệ bị bắt ngay với số dòng và cột — một dấu phẩy lạc không còn tốn phút dò tìm. Mọi thứ phân tích cục bộ trong trình duyệt; không gửi gì đi.'],
    steps: ['Dán JSON vào ô nhập.',
        'Duyệt cây gập được — mũi tên ▾/▸ gập và mở đối tượng, mảng.',
        'Đọc JSON đã định dạng bên phải và sao chép bằng một cú nhấp.'],
    faqs: [
        { q: 'Làm sao tìm chỗ JSON bị gãy?', a: 'Khi phân tích thất bại, dòng và cột chính xác được hiển thị, ví dụ «line 3, column 12: Unexpected token }». Sửa chỗ đó — cây hiện ngay; nguyên nhân thường là dấu phẩy thừa ở cuối, khóa thiếu ngoặc kép hoặc thiếu ngoặc.' },
        { q: 'Tài liệu lớn có xử lý được không?', a: 'Có với payload API và cấu hình thông thường — hàng chục nghìn nút render mượt. Việc cắt 60 ký tự chỉ áp dụng cho hiển thị; khung thô và nút sao chép luôn giữ dữ liệu đầy đủ.' },
        { q: 'Dữ liệu của tôi có rời thiết bị không?', a: 'Không. Phân tích và render diễn ra hoàn toàn trong bộ nhớ trình duyệt. Không có gì gửi đến máy chủ — an toàn cho phản hồi API nội bộ và cấu hình.' },
    ],
  },
  "chmod-calculator": {
    name: 'Máy tính chmod',
    tagline: 'Lắp quyền file UNIX bằng ô tích — chế độ bát phân, ký hiệu, và lệnh chmod hoàn chỉnh; gồm setuid/setgid/sticky.',
    intro: ['Quyền UNIX dạng bát phân (755? 644?) trông mờ cho đến khi bạn thấy chúng như chín ô tích: đọc/ghi/thực thi cho chủ sở hữu, nhóm và người khác. Tích vào — chế độ số, dạng rwxr-xr-x và lệnh chmod đầy đủ cập nhật trực tiếp.',
        'Các bit đặc biệt cũng có mặt: setuid (4), setgid (2) và sticky (1) — mỗi bit kèm giải thích nó thực sự làm gì trên file và thư mục. Nhập ngược cũng chạy: gõ 644, các ô tự được tích.'],
    steps: ['Tích quyền cho chủ sở hữu, nhóm và người khác.',
        'Thêm setuid, setgid hoặc sticky nếu cần.',
        'Sao chép lệnh chmod đã tạo hoặc chế độ bát phân.'],
    faqs: [
        { q: '755 nghĩa chính xác là gì?', a: 'Chủ sở hữu: đọc+ghi+thực thi (7=4+2+1); nhóm: đọc+thực thi (5=4+1); người khác: đọc+thực thi (5). Cấu hình điển hình cho thư mục chia sẻ và script cho phép chạy.' },
        { q: 'Sticky bit để làm gì?', a: 'Trên thư mục nó cấm xóa file của người khác — chính là «t» trong /tmp (drwxrwxrwt). Trên file thực thi nó giữ chương trình trong bộ nhớ — nay phần lớn chỉ còn ý nghĩa lịch sử.' },
        { q: 'setuid và setgid làm gì?', a: 'Trên file thực thi, setuid chạy nó bằng danh tính chủ sở hữu (setgid: nhóm) — đây là lý do chúng nguy hiểm. Trên thư mục, setgid buộc file mới kế thừa nhóm của thư mục.' },
    ],
  },
  "ulid-generator": {
    name: 'Trình tạo ULID',
    tagline: 'Tạo ULID — định danh duy nhất 26 ký tự sắp được, có nhãn thời gian mili-giây nhúng — và giải mã bất kỳ ULID nào về thời điểm tạo nó.',
    intro: ['UUIDv4 thuần ngẫu nhiên nên các dòng mang nó sắp xếp thành mớ hỗn độn: chỉ mục phân mảnh, truy vấn theo thời gian cần cột riêng. ULID đặt nhãn thời gian 48-bit mili-giây lên đầu, theo sau là 80 bit ngẫu nhiên — 26 ký tự Crockford Base32 sắp đúng thứ tự ngay cả khi coi là chuỗi thường.',
        'Bảng chữ Crockford (0-9 và A-Z trừ I, L, O, U) loại bỏ các ký tự hay nhầm nhất khi chép tay: không I/1, không O/0. Nửa ngẫu nhiên dùng crypto.getRandomValues, nửa thời gian dùng đồng hồ hệ thống — bám sát đặc tả ULID.',
        'Ngoài việc tạo, dán ULID có sẵn để giải mã: nhãn thời gian nhúng được trích ra và hiển thị dạng ngày ISO — mọi ULID trong log của bạn tự động thành bản ghi thời điểm tạo. Chế độ loạt: tối đa 50 cái một lần, cùng một khoảnh khắc.'],
    steps: ['Nhấn Tạo để có một loạt ULID (hoặc dán một cái để giải mã).',
        'Mỗi ULID hiển thị nhãn thời gian nhúng của nó — thời điểm tạo, định dạng ISO.',
        'Sao chép từng ULID hay cả danh sách cho fixture, seed database hay phân tích log.'],
    faqs: [
        { q: 'Vì sao chọn ULID thay vì UUIDv4?', a: 'Vì việc sắp xếp. 10 ký tự đầu của ULID mã hóa nhãn thời gian: thứ tự từ điển = thứ tự thời gian — khóa chính tụ lại trong chỉ mục, quét theo dải thời gian chạy trực tiếp, log tự sắp. UUIDv4 không có tính chất nào trong số đó; ULID vẫn giữ 128 bit kháng va chạm.' },
        { q: 'Crockford Base32 là gì?', a: 'Bảng 32 ký tự (chữ số cộng A-Z trừ I, L, O, U) được thiết kế để sống sót qua khâu chép tay: không có cặp trông giống nhau, không phân biệt hoa-thường. Dày hơn hex 25% và không có +, /, = — an toàn cho URL, tên file và XML mà không cần escape.' },
        { q: 'Hai ULID tạo trong cùng mili-giây có va nhau không?', a: 'Thực tế là không: 80 bit ngẫu nhiên cho ~1,2 × 10²⁴ khả năng mỗi mili-giây. Đặc tả còn định nghĩa sinh đơn điệu (tăng phần ngẫu nhiên trong cùng mili-giây), mà chế độ loạt tuân theo ngay từ cấu trúc.' },
    ],
  },
  "user-agent-parser": {
    name: 'Trình phân tích User-Agent',
    tagline: 'Phân tích bất kỳ chuỗi User-Agent nào thành trình duyệt, engine, hệ điều hành và thiết bị — nhận diện bot, WebView và shell di động, tất cả cục bộ trong trình duyệt.',
    intro: ['Mọi yêu cầu HTTP tự giới thiệu bằng chuỗi User-Agent, và đọc đúng nó là một nghệ thuật nhỏ: Chrome tự nhận là Safari mà Safari tự nhận là Mozilla; Edge nấp trong danh sách token của Chrome; bot, WebView và shell di động để lại chữ ký riêng. Dán UA vào đây: phân tích tách họ và phiên bản trình duyệt, engine render (Blink/Gecko/WebKit), hệ điều hành kèm phiên bản, và loại thiết bị — desktop, di động, tablet hay crawler đã biết.',
        'Quy tắc là bảng mẫu tường minh: phát hiện họ Chrome chạy trước fallback chung, Edg/OPR/Samsung Internet có mục riêng, còn Googlebot, bingbot và bạn bè được nhận diện theo tên thay vì đoán là trình duyệt desktop. UA bị cắt cụt hay dị dạng được ghi nhận trung thực, không bịa phỏng đoán.',
        'Mọi thứ phân tích ngay trong trình duyệt; chuỗi UA không bao giờ rời thiết bị — tiện khi soi header từ file log bạn không muốn chia sẻ. UA của chính bạn có sẵn làm ví dụ trong một cú nhấp.'],
    steps: ['Dán chuỗi User-Agent vào ô nhập — hoặc nhấn ví dụ để phân tích của bạn.',
        'Đọc các trường: tên và phiên bản trình duyệt, engine, hệ điều hành, loại thiết bị, cờ bot.',
        'Xem các trường hợp biên — WebView và tiền tố lạ được gán nhãn tường minh, không phỏng đoán.'],
    faqs: [
        { q: 'Vì sao Chrome nhận mình là Safari và Mozilla?', a: 'Tương thích lịch sử. Các site tương thích Netscape phục vụ cho trình duyệt tuyên bố «Mozilla», và Chrome kế thừa lớp ngụy trang đó để nhận nội dung như nhau — vì thế UA Chrome hiện đại đọc là «Mozilla/5.0 … AppleWebKit/537.36 (KHTML, like Gecko) Chrome/…». Bộ phân tích đọc từ cuối chuỗi (token Chrome), không từ đầu.' },
        { q: 'Cách nào phân biệt bot với người dùng thật?', a: 'Crawler quen thuộc công khai token của mình — Googlebot, bingbot, DuckDuckBot, Applebot, facebookexternalhit xuất hiện nguyên văn trong UA. Bộ phân tích này gọi tên theo chữ ký thay vì đoán; thứ không nhận ra được vẫn là trình duyệt thường, không bị gắn nhãn bot.' },
        { q: 'UA sniffing đủ tin để điều khiển tính năng không?', a: 'Không cho đường dẫn quan trọng — chuỗi UA nói dối theo thiết kế và dễ giả mạo. Dùng phân tích UA cho phân tích lưu lượng, log và các quyết định ngoài bảo mật (hiện giao diện di động, đếm traffic bot); với bất cứ thứ gì chức năng, hãy feature-detect trong trang. Công cụ này đọc UA, chứ không tin UA.' },
    ],
  },
  "token-generator": {
    name: 'Trình tạo Token',
    tagline: 'Tạo token API, ID phiên và bí mật ngẫu nhiên bằng mật mã ngay trong trình duyệt — crypto.getRandomValues, xuất theo loạt, hiển thị entropi mỗi token.',
    intro: ['Khóa API, bearer token, bí mật webhook, ID phiên — phần lớn chỉ là chuỗi ngẫu nhiên, và cách tạo sai là Math.random(). Trình tạo này dùng crypto.getRandomValues, nguồn mật mã của trình duyệt: mỗi token được rút đều từ tập ký tự của nó, không thiên lệch nào đoán được.',
        'Chiều dài 8–128 ký tự, tập ký tự (chữ-số, hex, hoặc kèm ký hiệu an toàn-URL), tiền tố tùy chọn để grep trong log, tới 50 cái một lần — tiện khi gieo dữ liệu thử nghiệm hay cấp khóa cho nhiều dịch vụ. Entropi ước tính theo bit hiện trực tiếp cho cấu hình hiện tại: 32 ký tự chữ-số mang ~190 bit.',
        'Token sinh trong bộ nhớ và không bao giờ được truyền đi: tải lại trang là biến mất. Công cụ vì thế an toàn cho bí mật production chứ không chỉ dữ liệu thử — dù nơi cuối cùng của khóa sống lâu vẫn là trình quản lý mật khẩu hay vault bí mật.'],
    steps: ['Đặt chiều dài, tập ký tự, tiền tố tùy chọn và số lượng token.',
        'Nhấn Tạo — token hiện dưới dạng danh sách, mỗi cái có nút sao chép một cú nhấp.',
        'Nhấn Làm mới cho loạt mới; sao chép thứ bạn cần trước khi rời trang.'],
    faqs: [
        { q: 'Có an toàn cho khóa API production không?', a: 'An toàn. crypto.getRandomValues là CSPRNG cùng hạng mà TLS và trình quản lý mật khẩu dựa vào, và việc sinh diễn ra hoàn toàn trong bộ nhớ trình duyệt — không gì qua mạng, không gì được lưu. Sức mạnh lý thuyết của token bằng đúng entropi hiển thị: chọn chiều dài theo mô hình đe dọa của bạn.' },
        { q: 'Token nên dài bao nhiêu?', a: 'Khóa nội bộ và ID phiên thì 32 ký tự chữ-số (~190 bit) đã vượt xa brute force. Token hex được ưa vì khớp byte chính xác: 32 ký tự hex = 16 byte ngẫu nhiên. Ký hiệu tăng entropi mỗi ký tự nhưng làm hỏng hệ thống không URL-encode — chỉ dùng khi phía tiêu thụ xử lý được.' },
        { q: 'Token, UUID hay ULID?', a: 'Dùng token ngẫu nhiên mờ đục (công cụ này) khi định danh không được đoán ra: khóa API, phiên, bí mật webhook. UUID/ULID dành cho định danh sinh song song hay sắp được theo thời gian — chúng rò rỉ nhịp hay số lượng và không nên gánh vai trò bảo mật. Cần ID sắp được? Dùng trình tạo ULID.' },
    ],
  },
};