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
    deepDive: [
      {
        heading: "Có mất dữ liệu hay không: nén thực sự làm gì với một PDF",
        paragraphs: [
          "PDF không phải là bức ảnh của các trang — nó là một chương trình mô tả chúng. Văn bản được lưu dưới dạng glyph và tọa độ, đồ họa vector dưới dạng lệnh vẽ, còn ảnh là bitmap nén nhúng bên trong. Chính cấu trúc này giải thích vì sao một PDF một trang thuần văn bản chỉ nặng vài kilobyte, trong khi cùng trang đó raster hóa ở 150 DPI có thể nặng gấp trăm lần. Khi một PDF trở nên nặng nề, cân nặng gần như luôn nằm ở các ảnh nhúng: hình chụp, logo và trên hết là bản scan — nơi mỗi trang là một bitmap khổng lồ.",
          "Công cụ này chủ động chọn con đường raster hóa: mỗi trang được vẽ lại ở DPI bạn chọn rồi mã hóa lại thành JPEG. Đó là nén có mất dữ liệu — chữ chọn được biến thành điểm ảnh — và chúng tôi nói thẳng điều đó, vì nhiều công cụ hay giấu khuyết điểm này. Đổi lại bạn nhận được sự dự đoán được: một bản scan 40 MB lưu dưới dạng bitmap nén kém sẽ thành vài trăm kilobyte JPEG được tinh chỉnh tốt, và ở 150 DPI bản in ra nhìn chung khó phân biệt bằng mắt với bản gốc.",
          "Với PDF nhiều bản scan, không có lối tắt nào thực sự không mất dữ liệu, vì dữ liệu nguồn vốn dĩ đã là điểm ảnh. Với PDF văn bản và vector, các mẹo không mất dữ liệu (xóa đối tượng trùng lặp, nén lại luồng dữ liệu) có tồn tại nhưng thường chỉ tiết kiệm được vài phần trăm — vì vậy công cụ nói thật khi một file hầu như không nhỏ lại: nếu các trang vốn đã gọn nhẹ, không còn gì để bóp mà không chấp nhận mất dữ liệu.",
        ],
      },
      {
        heading: "Chọn DPI và chất lượng: một bảng quyết định",
        paragraphs: [
          "DPI (điểm mỗi inch) quyết định mỗi trang được vẽ bằng bao nhiêu điểm ảnh; chất lượng JPEG quyết định những điểm ảnh đó bị nén mạnh đến đâu. Hai con số này nhân với nhau: một trang khổ letter ở 72 DPI có khoảng 612×792 điểm ảnh, ở 150 DPI khoảng 1275×1650 — gấp gần bốn lần. Để đọc trên màn hình, 72–96 DPI là đủ dư, vì màn hình laptop điển hình vốn hiển thị trang PDF ở đúng độ phân giải hiệu dụng ấy. Để in ấn, 150 DPI là mức sàn thực tế cho chữ in đọc được; 300 DPI chỉ cần thiết cho ảnh in hoặc chữ nhỏ mà bạn định phóng to.",
          "Chất lượng JPEG ít quan trọng hơn người ta tưởng trong khoảng 60 đến 80 — đó thường là vùng ngọt ngào nơi lỗi nén không nhìn ra trên tài liệu. Dưới khoảng 50, các khối lỗi vuông của JPEG bắt đầu làm nhòe mép chữ và những quầng xám xuất hiện quanh các ký tự. Chế độ xám là đòn bẩy thứ ba thầm lặng: một bản scan đen trắng lưu dưới dạng màu lãng phí hai phần ba số bit, nên chỉ riêng việc chuyển sang xám thường cắt bớt một phần ba dung lượng trở lên mà không chênh lệch gì nhìn thấy được.",
          "Quy trình hiệu quả là: nén thử một file đại diện trước, mở kết quả ở mức thu phóng 100% và kiểm tra chữ nhỏ nhất mà bạn quan tâm. Nếu đọc rõ ràng, hãy áp thông số đó cho cả lô. Bảng trước/sau hiển thị mức tiết kiệm theo từng file, nên những điểm bất thường (file hầu như không co lại) hiện ra ngay lập tức thay vì bị giấu trong con số trung bình.",
        ],
      },
      {
        heading: "Vì sao xử lý cục bộ lại quan trọng với tài liệu",
        paragraphs: [
          "PDF là một container và, khác với ảnh, thường mang theo nhiều hơn nội dung hiển thị: giá trị trường biểu mẫu, chú thích, font nhúng, đôi khi cả tệp đính kèm và metadata tiết lộ tác giả, phiên bản phần mềm và lịch sử chỉnh sửa. Tải một file như vậy lên dịch vụ nén nghĩa là trao đi tất cả những thứ đó — đa số mọi người chưa bao giờ kiểm tra bên trong file trước khi bấm tải lên. Hợp đồng, hồ sơ y tế, bảng lương và giấy tờ tùy thân đã scan chính là những file được nén nhiều nhất, và cũng chính là những file ít đáng để tải lên nhất.",
          "Công cụ này chạy hoàn toàn trong trình duyệt của bạn: file được đọc vào bộ nhớ trên thiết bị, vẽ lại bằng canvas và mã hóa lại bằng JavaScript, không bao giờ được truyền đi đâu cả. Không có hàng đợi phía máy chủ, không có thời gian lưu trữ nào để phải tin tưởng, không có chính sách xóa nào để phải xác minh. Bạn có thể ngắt mạng giữa chừng quá trình nén và nó vẫn hoàn tất.",
          "Trên thực tế, điều này cũng thay đổi quy trình làm việc. Vì không có gì được tải lên nên không có thời gian chờ và không có giới hạn dung lượng từ băng thông — một lô bản scan 200 MB chạy mượt như lô 2 MB, giới hạn duy nhất là bộ nhớ máy bạn. File nén xong được ghi bằng cơ chế tải xuống của chính trình duyệt, nên nó nằm trong thư mục Downloads như bất kỳ file nào bạn tự lưu.",
        ],
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
    deepDive: [
      {
        heading: "Xóa trang đụng vào cây trang, không đụng vào nội dung",
        paragraphs: [
          "Bên trong một PDF có cây trang: một danh sách có thứ tự các tham chiếu, mỗi tham chiếu trỏ tới một đối tượng trang, mà đối tượng trang lại trỏ tới các luồng nội dung, font và ảnh của nó. Xóa một trang là thao tác trên cây này — tham chiếu bị gỡ khỏi danh sách — trong khi các luồng nội dung, font và ảnh của trang đó chỉ đơn giản là không còn được tham chiếu và bị bỏ đi. Không một chút gì của các trang còn lại bị vẽ lại, mã hóa lại hay thay đổi theo bất kỳ cách nào.",
          "Điều này có một hệ quả thực dụng đáng biết: xóa trang là thao tác hoàn toàn không mất dữ liệu đối với những trang bạn giữ lại. Font vẫn nhúng nguyên như cũ, độ phân giải ảnh không bị đụng tới, chữ vẫn chọn được, và thậm chí số đối tượng nội bộ của các trang còn lại thường giữ nguyên. Khác với nén, ở đây không có núm chỉnh chất lượng nào vì không có gì bị xử lý lại.",
          "Chiều ngược lại cũng đúng: bất cứ thứ gì nằm trên các trang bị xóa sẽ biến mất hoàn toàn. Nếu một trang chứa chú thích hoặc lớp ẩn mà bạn cần, hãy chắc chắn nó nằm trên trang được giữ lại — công cụ làm việc ở cấp độ trang và không thể bốc nội dung từ trang này sang trang khác. Muốn vậy, hãy dùng quy trình trích xuất hoặc gộp file.",
        ],
      },
      {
        heading: "Những bẫy thường gặp khi xóa trang",
        paragraphs: [
          "Lỗi phổ biến nhất là đếm nhầm vì trình xem hiển thị và thứ tự trang nội bộ không khớp nhau. Nhãn trang — những con số “1, 2, iii, A-4” in ở góc PDF — chỉ là lớp hiển thị đè lên trình tự thật; một tài liệu mà nhãn đếm lại từ đầu mỗi chương vẫn có một trình tự trang tuyến tính duy nhất bên dưới. Công cụ này luôn làm việc trên trình tự thật, hiển thị dạng 1..N, nên hãy xác minh vị trí bằng nội dung chứ không phải bằng nhãn in sẵn.",
          "Bẫy thứ hai là xóa những trang mà trang khác phụ thuộc vào. Một mục lục hay chỉ mục ghi “xem trang 12” chứa tham chiếu văn bản thuần (hoặc trong những tài liệu tốt hơn là chú thích liên kết trỏ tới đối tượng trang). Nếu bạn xóa trang 12, tham chiếu văn bản âm thầm hỏng và liên kết có thể chết hoặc nhảy đến sai chỗ. Công cụ sẽ không cảnh báo về điều này — không công cụ nào làm được đáng tin — nên hãy lướt qua tài liệu tìm các tham chiếu chéo trước khi xóa số lượng lớn.",
          "Thứ ba, nhớ rằng một số trình xem có bộ nhớ đệm file cũ. Nếu bản đã xóa trông chẳng thay đổi, hãy đóng rồi mở lại PDF, hoặc kiểm tra dung lượng — file mới phải nhỏ hơn. Và nếu tài liệu là biểu mẫu mà các trang sau chứa định nghĩa trường được tham chiếu từ trước, hãy thử lại biểu mẫu sau khi chỉnh sửa.",
        ],
      },
      {
        heading: "Vì sao file không bao giờ rời khỏi thiết bị của bạn",
        paragraphs: [
          "Xóa trang vốn dĩ thường được làm vì lý do riêng tư: bỏ trang chứa dữ liệu cá nhân, phụ lục lương thưởng, hay bản thảo chưa đáng lưu hành. Gửi chính file đó lên một dịch vụ web để xóa thì phản lại mục đích ban đầu — chính trang bạn muốn biến mất giờ nằm trong hàng đợi và nhật ký của người khác. Công cụ này thực hiện việc chỉnh sửa cục bộ, ngay trong trình duyệt, nên file không hề đi qua mạng ở bất kỳ thời điểm nào.",
          "Cơ chế hoàn toàn phía máy khách: PDF được phân tích bằng JavaScript, các tham chiếu trang bạn chọn bị gỡ khỏi cây, và file mới được ghi thẳng vào thư mục tải xuống. Không cần tài khoản, không thanh tiến trình tải lên, không chính sách lưu trữ nào phải tin mù quáng. Mất mạng thì nó vẫn hoạt động y hệt.",
          "Một thói quen hữu ích sau khi xóa: chạy tìm kiếm văn bản trên kết quả với những từ khóa từng có trên các trang đã bỏ. Mười giây kiểm tra ấy xác nhận nội dung nhạy cảm đã thật sự biến mất khỏi file đầu ra — và nó cũng nhắc bạn rằng xóa ở đây là xóa cả trang, chứ không phải xóa từng từ trong một trang.",
        ],
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
    deepDive: [
      {
        heading: "Vì sao ảnh và PDF là hai loài khác nhau",
        paragraphs: [
          "File JPEG hay PNG là một lưới điểm ảnh phẳng, không có khái niệm trang, khổ giấy hay bố cục — nó chỉ đơn thuần là một ảnh. PDF ngược lại là định dạng mô tả trang: nó định nghĩa các trang với kích thước vật lý (tính bằng point, trong đó 72 point bằng một inch) và đặt nội dung lên những trang ấy. Chuyển ảnh thành PDF vì thế là một quyết định bố cục thực sự, chứ không chỉ đổi đuôi file.",
          "Công cụ này bọc mỗi ảnh trong một trang PDF có kích thước đúng bằng ảnh, giữ nguyên dữ liệu điểm ảnh gốc thay vì nén lại. Vì vậy việc chuyển ảnh sang PDF theo cách này là không mất chất về mặt hình ảnh: những điểm ảnh bạn thấy trong kết quả chính là những điểm ảnh bạn đưa vào. Dung lượng cũng gần bằng tổng các ảnh, vì PDF chỉ là cái vỏ chứa.",
          "Đáng hiểu thêm về hướng ngược lại: một số bộ chuyển mã hóa lại toàn bộ thành một mức chất lượng JPEG duy nhất, có thể âm thầm làm hỏng PNG chứa chữ sắc nét hoặc line art. Giữ nguyên dữ liệu ảnh gốc bên trong container PDF tránh hoàn toàn kiểu hỏng ấy — ảnh chụp màn hình của bạn vẫn sắc nét trong PDF như khi nó nằm ngoài.",
        ],
      },
      {
        heading: "Thứ tự, hướng trang và ghép nhiều trang",
        paragraphs: [
          "Vì PDF là một chuỗi trang có thứ tự, thứ tự bạn thêm ảnh chính là thứ tự trang của tài liệu. Với hợp đồng scan, sổ biên nhận hay bộ ảnh, thói quen đáng tin là sắp ảnh theo tên file trước khi thêm — tên file sắp theo thứ tự xác định, còn trí nhớ kiểu “chắc mình đã tải theo đúng thứ tự” thì không. Sắp lại sau đó vẫn khả thi bằng công cụ sắp trang, nhưng làm đúng ngay từ lúc thêm thì đỡ tốn công hơn.",
          "Kích thước lẫn lộn là chuyện bình thường và được xử lý theo từng trang: một lô ảnh lẫn ngang lẫn dọc sẽ cho ra các trang khớp với tỷ lệ từng ảnh. Nếu cần khổ giấy thống nhất (ví dụ A4 để in), hãy chạy kết quả qua bước cắt hoặc đổi kích thước sau đó — bọc ảnh ở kích thước gốc trước rồi chuẩn hóa sẽ hơn là cố ép mọi thứ vào một khổ ngay khi tạo.",
          "Một lưu ý về độ phân giải: trang PDF lấy kích thước điểm ảnh của ảnh tính theo 72 điểm ảnh mỗi inch, nên ảnh rộng 3000 điểm ảnh sẽ thành một trang rất lớn. Điều đó đúng cho lưu trữ và thu phóng; còn để in đúng khổ, điều quan trọng là ảnh nguồn có đủ điểm ảnh cho cỡ in đích — việc bọc vào PDF không làm thay đổi điều đó theo cách nào cả.",
        ],
      },
      {
        heading: "Ảnh của bạn ở lại trên thiết bị",
        paragraphs: [
          "Ảnh chụp và bản scan thuộc nhóm file cá nhân nhất mà người ta có — hình gia đình, scan giấy tờ tùy thân, biên lai, ảnh y tế. Gửi chúng lên một dịch vụ chuyển đổi trực tuyến nghĩa là các bản sao đã nằm trên kho lưu trữ của người khác trước khi bạn kịp xem kết quả. Công cụ này bọc ảnh hoàn toàn trong trình duyệt của bạn: ảnh được đọc từ đĩa vào bộ nhớ, nhúng vào các đối tượng trang PDF bằng JavaScript, và file hoàn chỉnh được ghi ngay tại máy. Không tải lên, không bản sao trên máy chủ, không lưu giữ gì cả.",
          "Vì không có sự truyền tải, trần giới dung lượng cũng biến theo. Các dịch vụ trực tuyến thường giới hạn tải lên 10–20 MB hoặc hạn chế người dùng miễn phí; ở đây, một thư mục 50 ảnh lớn chuyển đổi mượt như ba ảnh, giới hạn duy nhất là bộ nhớ thiết bị. Chuyển hàng loạt còn nhanh hơn vì không có vòng đi-về qua mạng — bước chậm nhất là đĩa của bạn chứ không phải băng thông của ai đó.",
          "Một thói quen riêng tư đáng áp dụng: ảnh chụp từ điện thoại mang metadata EXIF gồm cả tọa độ GPS. Việc nhúng chúng vào PDF giữ nguyên dữ liệu đó như trong ảnh gốc. Nếu bạn chia sẻ PDF đã chuyển rộng rãi, hãy cân nhắc xóa dữ liệu vị trí ngay từ nguồn — bọc ảnh vào PDF không thêm cũng không bớt metadata, nó chỉ bảo toàn những gì vốn có.",
        ],
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
    deepDive: [
      {
        heading: "Từ thư viện ảnh sang tài liệu: vì sao chuyển đổi này tồn tại",
        paragraphs: [
          "Các cơ quan nhà nước không chấp nhận hai mươi tệp JPEG rời rạc. Đơn thuê nhà, yêu cầu bồi thường bảo hiểm, báo cáo chi phí — họ muốn một file PDF duy nhất, các trang theo thứ tự, có thể in, đóng dấu và lưu trữ như một tài liệu giấy. Đó là toàn bộ lý do JPG-to-PDF tồn tại: biến một đống ảnh thành một tài liệu có phân trang, có thứ tự, gói trong một file mà các hệ thống hành chính có thể xử lý.",
          "Bản thân chuyển đổi rất đơn giản về cấu trúc: mỗi JPEG thành một trang PDF, và dữ liệu nén JPEG thậm chí có thể được nhúng nguyên vẹn, vì PDF hỗ trợ JPEG (DCTDecode) như một bộ lọc ảnh gốc. Một bộ chuyển tốt không giải nén rồi nén lại ảnh của bạn — nó bọc các byte sẵn có vào container trang, nghĩa là không mất chất và gần như không tăng dung lượng.",
          "Cái bạn quyết định còn quan trọng hơn cái công cụ làm: thứ tự ảnh trở thành thứ tự trang, và độ phân giải từng ảnh quyết định trang hiển thị thế nào khi thu phóng hay in. Việc của công cụ là không làm phiền — không nén lại ép buộc, không đổi kích thước bất ngờ, chỉ gói gọn trung thực.",
        ],
      },
      {
        heading: "Thói quen ghép file thực dụng giúp khỏi làm lại",
        paragraphs: [
          "Đặt tên file có số ở đầu trước khi bắt đầu: 01-bia.jpg, 02-trong.jpg, 03-chu-ky.jpg. Thứ tự tên file là thứ tự duy nhất mà mọi bên cùng công nhận, và nó sống sót qua mọi phương thức chuyển file — ứng dụng nhắn tin, thư mục đám mây, email. Ảnh chụp thẳng từ máy ảnh sắp theo dấu thời gian, ổn cho bộ ảnh theo trình tự thời gian nhưng vô dụng với “thứ tự tài liệu” theo cấu trúc một biểu mẫu.",
          "Kiểm tra hướng ảnh trước khi chuyển. Ảnh chụp xoay máy dựa vào cờ hướng EXIF, và một số trình xem PDF tôn trọng cờ này trong khi số khác không, khiến người nhận thấy các trang nằm ngang. Nếu ảnh hiển thị thẳng trong trình quản lý file nhưng lại nằm ngang trong PDF thành phẩm, thủ phạm là cờ EXIF — xoay hẳn các điểm ảnh sẽ sửa vĩnh viễn.",
          "Với tài liệu để in, hãy cân nhắc khổ trang có cần thống nhất không. Bọc mỗi ảnh theo kích thước riêng thì ổn khi xem và lưu trữ; còn để in, khổ trang lẫn lộn gây ra bất ngờ về tỉ lệ tại nhà in. Chuyển đổi trước, rồi chuẩn hóa khổ trang trong một bước sau, giúp mỗi bước đơn giản và dễ quay lại.",
        ],
      },
      {
        heading: "Ảnh, giấy tờ tùy thân và câu hỏi xử lý cục bộ",
        paragraphs: [
          "Những thứ người ta chuyển bằng công cụ này thường trùng khớp với những thứ nhạy cảm nhất: scan hộ chiếu để làm visa, ảnh thẻ để xác minh tài khoản, biên lai còn hiện số thẻ. Tải chúng lên trang chuyển đổi nghĩa là một bản sao giấy tờ tùy thân của bạn nằm trên một máy chủ xa lạ, chịu một chính sách lưu giữ xa lạ, trước cả khi bạn kiểm tra kết quả.",
          "Công cụ này đóng gói ngay trong trình duyệt của bạn: JPEG được đọc cục bộ, nhúng vào cấu trúc PDF bằng JavaScript, và kết quả được lưu bởi chính thiết bị. File không đi qua mạng theo bất kỳ hướng nào, nên không có nhật ký máy chủ, không bản sao của bên thứ ba, không câu chuyện về xóa dữ liệu phải tin.",
          "Còn một khoản lời thực dụng: không thời gian tải lên và không giới hạn dung lượng nghĩa là bạn có thể chuyển cả thư mục — năm mươi ảnh khảo sát bất động sản, cả hộp biên lai — trong một lượt. Các dịch vụ phụ thuộc mạng buộc bạn chia lô và chờ đợi; còn cục bộ, giới hạn duy nhất là bộ nhớ thiết bị, và toàn bộ công việc thường xong trong vài giây.",
        ],
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
    deepDive: [
      {
        heading: "Gộp file là phẫu thuật cây trang, không phải vẽ lại",
        paragraphs: [
          "Nỗi lo phổ biến về gộp PDF là công cụ sẽ “xử lý lại” các trang — mã hóa lại ảnh, vẽ lại chữ, âm thầm giảm chất lượng. Trong một bộ gộp làm đúng cách, không điều nào trong số đó xảy ra. Các trang của mỗi PDF sống trong một cây tham chiếu nội bộ, và gộp file là ghép những cây ấy vào một tài liệu mới: thứ tự trang được nối tiếp nhau, các tham chiếu được đánh số lại để tránh xung đột, nhưng bản thân các luồng nội dung, font và ảnh được sao chép từng byte nguyên vẹn.",
          "Vì vậy một phép gộp tốt là không mất chất theo đúng nghĩa cấu trúc. Chữ vẫn chọn được, độ phân giải ảnh nguyên vẹn, đồ họa vector giữ nguyên các đường cong. Các trang đầu ra, xét về nội dung, không thể phân biệt với trang đầu vào — thứ thay đổi chỉ là “mục lục” của container, nói cho đúng.",
          "Có hai thực tế cấu trúc đáng biết. Thứ nhất, đánh số trang bắt đầu lại: trang 1 của tài liệu B nối tiếp trang cuối của tài liệu A, bất kể nhãn in sẵn. Thứ hai, dấu trang, liên kết và điểm đến được đặt tên có thể sống sót hoặc không, tùy mức cẩn thận của bộ gộp khi ánh xạ lại tham chiếu nội bộ — những công cụ chỉ ghép cây trang có thể để liên kết nội bộ treo lơ lửng.",
        ],
      },
      {
        heading: "Thứ tự, file trùng và danh mục kiểm tra trước khi gộp",
        paragraphs: [
          "Thứ tự gộp là thứ tự bạn thêm file, và đó cũng là lỗi phổ biến nhất: đóng trang bìa sau phụ lục. Thói quen đáng tin là đặt tiền tố số vào tên file nguồn (01-hop-dong.pdf, 02-phu-luc.pdf) để thứ tự mong muốn hiện ra ngay lập tức và sống sót qua mọi kiểu sắp xếp của hộp thoại chọn file. Kiểm tra lại trình tự trên đầu ra trước khi phát hành — lật thử hai giây bắt được điều mà một giờ xấu hổ không cứu nổi.",
          "Khổ trang lẫn lộn là hợp lệ trong PDF và gộp sạch sẽ, nhưng hãy nghĩ đến người nhận: một tài liệu mà trang A4 xen kẽ trang khổ letter sẽ in xấu ở mọi máy. Nếu các nguồn khác khổ nhau, hãy quyết định trước khi gộp: chuẩn hóa khổ sau đó, hoặc chấp nhận sự lẫn lộn.",
          "Một mục danh sách nữa: biểu mẫu. Gộp hai PDF cùng chứa trường biểu mẫu có thể va chạm tên trường — hai trường cùng tên “chu_ky” có thể chung một giá trị, gõ vào một là tự động điền cả hai. Làm phẳng các file trước khi gộp là cách trị chuẩn, vì trang đã làm phẳng không còn cơ chế trường nào nữa.",
        ],
      },
      {
        heading: "Ghép tài liệu mà không tải lên cả hai",
        paragraphs: [
          "Gộp file thường được làm chính với những file không bao giờ đáng tải lên: hợp đồng kèm phụ lục, đơn xin kèm scan giấy tờ, báo cáo y tế kèm tóm tắt chẩn đoán hình ảnh. Gửi cả hai phần lên một dịch vụ gộp trực tuyến tạo ra một tài liệu hợp nhất trên máy chủ của người khác — phiên bản đầy đủ và nhạy cảm nhất của hồ sơ của bạn, gói trong một file tiện lợi, trong nhật ký của họ.",
          "Công cụ này thực hiện phép ghép hoàn toàn trong trình duyệt. Cả hai PDF nguồn được phân tích bằng JavaScript ngay trên thiết bị, các cây trang được nối trong bộ nhớ, và file gộp xong được ghi thẳng vào thư mục tải xuống. Không một phần nào của hai tài liệu được truyền đi, xếp hàng hay lưu trữ ở đâu cả, và việc gộp vẫn y hệt khi rút cáp mạng.",
          "Còn một lợi thế thông lượng: không có vòng tải lên-tải xuống, gộp cả file lớn — hồ sơ scan 100 MB cộng phụ lục 50 MB — xong trong vài giây, giới hạn chỉ là bộ nhớ cục bộ. Điều đó khiến việc gộp vào cuối mỗi phiên làm việc trở nên khả thi, giữ một file gốc gọn gàng cho mỗi dự án thay vì rải mảnh vụn khắp hộp thư.",
        ],
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
    deepDive: [
      {
        heading: "OCR có thể và không thể khôi phục gì từ một trang scan",
        paragraphs: [
          "Một bản scan chỉ là tấm ảnh chụp giấy — máy tính nhìn thấy điểm ảnh xám, chứ không phải chữ cái. OCR (nhận dạng ký tự quang học) là quá trình nhận ra hình dạng chữ trong các điểm ảnh đó và gắn văn bản nhận được vào trang như một lớp vô hình, tìm kiếm được, nằm dưới ảnh gốc. Sau OCR, bạn có thể chọn chữ, tìm một cụm từ, sao chép một đoạn — dù trang nhìn thấy vẫn là tấm ảnh scan.",
          "Giới hạn trung thực thì quan trọng. Độ chính xác của OCR phụ thuộc vào chất lượng scan trước hết: scan 300 DPI của chữ in sạch nhận dạng rất tốt, trong khi ảnh chụp độ phân giải thấp, trang bị nghiêng, bản photocopy mờ và chữ viết tay xấu đi rất nhanh. Văn bản nhận được không bao giờ đảm bảo hoàn hảo — một vết bẩn có thể thành một ký tự sai, và chi tiết trọng yếu như số tiền hay tên riêng xứng đáng được người đọc soát lại trước khi bạn tin vào văn bản trích xuất.",
          "OCR thật sự không thể làm gì: khôi phục chữ không đọc được trong ảnh, dịch thuật, hay cứu một bản scan hỏng căn bản. Nếu mắt người còn chật vật với một trang, máy nhận dạng sẽ chật vật hơn. Scan lại ở độ phân giải cao hơn thường là khoản đầu tư tốt hơn mọi hậu xử lý.",
        ],
      },
      {
        heading: "Cài đặt ngôn ngữ và khả năng tìm kiếm: để có đầu ra dùng được",
        paragraphs: [
          "OCR có nhận thức ngôn ngữ, và chọn sai ngôn ngữ là kẻ giết chất lượng phổ biến nhất. Bộ máy nhận dạng chấm điểm chuỗi ký tự dựa trên thống kê của ngôn ngữ đã chọn — chạy văn bản tiếng Việt qua mô hình chỉ có tiếng Anh thì mọi ký tự có dấu đều đáng ngờ, và ơ, ư, ệ tan ra thành nhiễu. Tài liệu đa ngôn ngữ cần bật đúng các ngôn ngữ tương ứng, nếu không các đoạn ngôn ngữ thiểu số sẽ thành vô nghĩa.",
          "Khả năng tìm kiếm còn một tầng nữa: lớp văn bản nhận dạng nằm sau ảnh, nên tìm kiếm trong trình xem sẽ ra cụm từ và nhảy đúng trang, nhưng các điểm ảnh bên dưới vẫn nguyên vẹn. Đó là cấu trúc “bánh mì kẹp” chuẩn mà mọi sản phẩm OCR nghiêm túc đều cho ra, và nó nghĩa là kho tài liệu của bạn giữ nguyên diện mạo gốc trong khi có thêm tìm kiếm toàn văn — cả hai lợi thế cùng lúc cho việc lưu trữ hồ sơ.",
          "Một quy trình thực dụng cho kho lưu trữ: OCR cả lô một lần với đúng ngôn ngữ, rồi kiểm tra ngẫu nhiên bằng cách tìm vài cụm từ đã biết (một cái tên, một ngày, một số hóa đơn). Nếu tìm ra, lớp văn bản hoạt động; nếu không, hoặc ngôn ngữ sai hoặc chất lượng scan dưới ngưỡng nhận dạng — kết quả tìm kiếm chỉ cho bạn những trang nào cần scan lại.",
        ],
      },
      {
        heading: "Nhận dạng ngay trên thiết bị, không phải trong kho của ai đó",
        paragraphs: [
          "Những tài liệu cần OCR thường lệch hẳn về phía nhạy cảm: sổ thuế cũ, hồ sơ y tế, hồ sơ nhân sự, giấy tờ nhà đất, bảng điểm. Đưa chúng qua một dịch vụ OCR web nghĩa là toàn bộ văn bản đọc được của hồ sơ bạn — đã được trích xuất, lập chỉ mục, tìm kiếm được bằng máy — nằm trên hạ tầng mà bạn không biết gì về nó. Văn bản còn dễ mang đi hơn cả ảnh scan: một khi đã trích xuất, nó có thể bị sao chép, lập chỉ mục hay khai thác mà bạn không hề hay biết.",
          "Công cụ này nhận dạng chữ hoàn toàn trong trình duyệt của bạn: các trang scan được xử lý trên thiết bị, lớp văn bản được gắn cục bộ, và PDF tìm kiếm được được ghi thẳng ra đĩa. Không trang nào trong kho của bạn được tải lên, không văn bản trích xuất nào rời khỏi máy. Hoạt động offline cũng vậy — rất hợp với những kho tài liệu vì lý do chính đáng mà sống trên máy không nối mạng.",
          "Hãy chuẩn bị một sự đánh đổi bạn nên biết trước: nhận dạng trong trình duyệt với một lô lớn tốn thời gian và bộ nhớ, vì phép tính diễn ra trên phần cứng của bạn thay vì trung tâm dữ liệu. Bản scan 20 trang là vài giây; kho 500 trang là một ly cà phê. Khoản thu là bước riêng tư nhất của việc số hóa hồ sơ diễn ra hoàn toàn trong tay bạn.",
        ],
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
    deepDive: [
      {
        heading: "Đánh số trang đè lên hoạt động thế nào trong một PDF",
        paragraphs: [
          "Thêm số trang vào PDF có sẵn không xử lý lại các trang. Nội dung gốc — chữ, ảnh, tất cả — nguyên vẹn; công cụ chỉ nối thêm một lệnh vẽ nhỏ vào luồng nội dung của mỗi trang để vẽ số ở vị trí bạn chọn. Về kỹ thuật đây là lớp phủ: mực mới vẽ lên trên trang hiện có, như con dấu đóng sau đó.",
          "Đó là lý do đánh số an toàn và có thể quay lại từ nguồn gốc: file gốc vẫn nằm trên đĩa không đổi, và bản đánh số chỉ khác bản gốc bởi vài lệnh vẽ thêm ấy. Font dùng cho số được thêm vào tài liệu hoặc vẽ bằng font chuẩn, và ở cỡ thông thường (9–12 pt) số chiếm một phần rất nhỏ của mỗi trang.",
          "Các tùy chọn định dạng phản chiếu những gì tài liệu thật dùng: chữ số đơn thuần (1, 2, 3) cho đa số trường hợp, hoặc mẫu như “Trang 3 của 12” cho hợp đồng và báo cáo nơi tổng số có ý nghĩa. Tổng được tính từ số trang thật tại thời điểm đánh số, nên luôn khớp với tài liệu bạn tạo ra.",
        ],
      },
      {
        heading: "Quyết định vị trí: lề, trang đầu và va chạm",
        paragraphs: [
          "Vị trí kinh điển là giữa-dưới hoặc phải-dưới, nằm trong lề dưới — nơi người đọc mong đợi và máy in không cắt mất. Máy in thường không in được sát mép giấy tuyệt đối, nên số đặt quá gần mép vật lý có thể bị cắt trên một số máy dù nhìn trên màn hình vẫn ổn. Giữ số cách mép trang khoảng nửa inch (khoảng 36 pt) là vùng an toàn.",
          "Trang bìa và trang tiêu đề thường không nên mang số — một chữ “1” đóng trên bìa trông như sơ suất. Các công cụ đánh số thường có tùy chọn bắt đầu lệch cho đúng việc này: bắt đầu đếm từ trang 2 (hoặc sau mục lục), để số hiển thị khớp với phần thân trong khi bìa giữ sạch. Lưu ý phần lệch ảnh hưởng đến trang nào được tính là số 1, nên “Trang 1” sẽ rơi đúng nơi bạn chỉ.",
          "Va chạm là bẫy còn lại: nếu các trang nguồn đã có số in sẵn (ví dụ bạn gộp các chương được đánh số riêng), việc phủ số mới tạo ra hai số cạnh tranh trên mỗi trang. Lớp phủ không thể xóa mực cũ — điều đó đòi hỏi raster hóa hoặc phẫu thuật nội dung. Khi đó, hãy gộp các nguồn chưa đánh số, hoặc chấp nhận một cách đánh số và bỏ qua lớp phủ.",
        ],
      },
      {
        heading: "Một chỉnh sửa cục bộ cho những tài liệu sắp lưu hành",
        paragraphs: [
          "Đánh số thường là nét chấm phá cuối cùng trước khi tài liệu đi ra ngoài: hợp đồng chờ đối tác ký, báo cáo trình hội đồng, bản thảo nộp đi. Đây chính là những file mà “tải lên trang đánh số trực tuyến” là sự đánh đổi sai — một hợp đồng đã đánh số được tải lên máy chủ của bên thứ ba là văn bản pháp lý gần hoàn chỉnh của bạn nằm trong nhật ký của ai đó chỉ để thêm hai chữ số mỗi trang.",
          "Công cụ này thực hiện lớp phủ hoàn toàn trong trình duyệt: các trang được xử lý cục bộ, số được vẽ vào nội dung trang trong bộ nhớ, và đầu ra được ghi bởi thiết bị của bạn. Tài liệu không rời khỏi máy của bạn dưới bất kỳ hình thức nào, và thao tác diễn ra tức thì — thậm chí không có giai đoạn tải lên để chờ.",
          "Một thói quen chất lượng nhỏ: sau khi đánh số, mở kết quả và lật vài trang kiểm tra số không đè lên chú thích chân trang, ghi chú hay nội dung ở lề dưới — những bố cục học thuật dày đặc đôi khi đẩy nội dung vào vùng bạn nghĩ là lề. Nếu thấy va chạm, dịch vị trí lên trên hoặc sang phía kia là giải quyết được, không đụng gì khác.",
        ],
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
    deepDive: [
      {
        heading: "Vì sao PDF-to-Excel là chuyển đổi khó nhất, nói thật lòng",
        paragraphs: [
          "Tài liệu Word có đoạn văn; bảng tính có lưới; PDF không có cả hai — nó chỉ có các glyph được đặt tại tọa độ. Khi một PDF trông như một bảng, vẻ ngoài đó là ảo ảnh lắp ráp từ từng ký tự được định vị khớp nhau. Chuyển sang Excel nghĩa là kiến thiết ngược cái lưới: những ký tự nào tạo thành một ô, cột bắt đầu và kết thúc ở đâu, và những hàng nào thuộc về nhau. Không có metadata nào trong PDF trả lời đáng tin những câu hỏi ấy.",
          "Vì vậy chất lượng các công cụ PDF-to-Excel chênh lệch rất lớn, và mọi công cụ trung thực đều cảnh báo điều đó. Các PDF sinh ra từ máy tính với bảng đều đặn trích xuất tốt; bảng scan, ô gộp, tiêu đề lồng nhau và bảng nhiều trang có tiêu đề lặp lại là những chỗ kết quả lệch. Số có thể rơi vào cột sai, và một hàng lệch trong bảng tài chính còn tệ hơn cả chuyển đổi thất bại — vì nó thất bại trong im lặng.",
          "Kỳ vọng thực dụng: coi đầu ra là bản dựng phác thảo đầu tiên, không phải xuất chuẩn hóa. Soát lại tổng số và vài hàng mẫu so với nguồn. Nếu PDF vốn được tạo từ Excel (không có dấu vết scan, chữ sắc nét), trích xuất ngược thường gần đúng. Nếu là bản scan, hãy chạy OCR trước và chuẩn bị sửa tay.",
        ],
      },
      {
        heading: "Đọc kết quả: kiểm tra gì trước khi tin",
        paragraphs: [
          "Ba phép kiểm tra bắt được đa số lỗi trích xuất. Thứ nhất, số hàng và số cột: sheet phải có cùng số hàng thân bảng và cột như bảng nguồn — lỗi lệch một thường nghĩa là tiêu đề bị nuốt hoặc một ô xuống dòng thành hai hàng. Thứ hai, toàn vẹn số liệu: kiểm tra các con số kiểu 1.234,56 giữ nguyên dấu thập phân và không biến thành văn bản (các “số” căn trái trong Excel thường là chuỗi ký tự).",
          "Thứ ba, khớp tổng: nếu bảng nguồn cộng một cột, hãy xác minh cột trích xuất vẫn cộng ra cùng con số. Một ô đặt sai chỗ làm gãy chuỗi kiểm toán theo kiểu mắt thường dễ bỏ sót nhưng tử sức khi sử dụng. Với bảng nhiều trang, kiểm tra xem tiêu đề lặp lại ở mỗi trang có thành các hàng trùng trong sheet không — đa số công cụ xuất nguyên xi.",
          "Ô gộp là kẻ rắc rối vĩnh cửu: gộp dọc (một nhãn trải qua vài hàng) thường thành giá trị ở hàng đầu và ô trống bên dưới. Nếu công thức phía sau cần nhãn lặp lại, fill-down trong Excel mất một giây và tiết kiệm một giờ bối rối.",
        ],
      },
      {
        heading: "Bảng tài chính xứng đáng được xử lý cục bộ",
        paragraphs: [
          "Các bảng người ta chuyển sang Excel thường lệch về phía tài chính: sao kê ngân hàng, hóa đơn, bảng lương, tờ khai thuế. Đó chính là loại dữ liệu không nên tải lên — một sao kê được trích xuất là lịch sử giao dịch đầy đủ ở dạng máy đọc được, và tải nó lên một dịch vụ chuyển đổi là trao lịch sử ấy cho một bên thứ ba xa lạ với bản sao trong nhật ký của họ.",
          "Công cụ này phân tích và dựng lại các bảng hoàn toàn trong trình duyệt của bạn: PDF được đọc cục bộ, ranh giới ô được suy diễn trên thiết bị, và bảng tính được tạo ra và lưu tại máy. Không trang nào của sao kê được truyền đi đâu cả, không con số trích xuất nào rời khỏi máy — chuyển đổi vẫn y hệt khi offline.",
          "Với bước soát tay đã khuyến nghị ở trên, xử lý cục bộ còn giúp việc lặp lại miễn phí: chuyển, xem, chỉnh rồi chuyển lại bao nhiêu lần tùy thích mà không phải tải lên lại gì. Quy trình tạo ra bảng tính đáng tin — chuyển, xác minh, sửa — chỉ dễ chịu khi mỗi vòng lặp tốn vài giây thay vì một chuyến đi qua mạng.",
        ],
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
    deepDive: [
      {
        heading: "Raster hóa: biến một trang thành JPG nghĩa là gì",
        paragraphs: [
          "Một trang PDF là một bản mô tả — glyph chữ, hình vector, ảnh nhúng do bộ dựng lắp ráp lại. Một JPG là một lưới điểm ảnh phẳng. Chuyển trang thành ảnh nghĩa là đưa bản mô tả ấy qua bộ dựng ở độ phân giải đã chọn và lưu kết quả thành điểm ảnh. Mọi thứ từng làm nên sự đặc biệt của PDF bị bỏ lại: chữ không còn chọn được, đường vector không còn sắc vô hạn, và trang trở nên sắc đúng bằng mật độ điểm ảnh cho phép.",
          "Sự đánh đổi ấy thường là đúng cho các mục đích dự kiến: nhúng ảnh trang vào bài thuyết trình, đăng ảnh chụp tài liệu lên nhóm chat, đính kèm bản xem trước vào email mà người nhận không nên chỉnh sửa. Một trang đã raster hóa cũng là định dạng “chỉ đọc” tự nhiên — bạn gửi gì họ thấy nấy, không có font nào bị thay thế và không có bố cục nào bị chảy.",
          "Độ phân giải là núm vặn duy nhất thật sự quan trọng. Ở 150 DPI, trang khổ letter có khoảng 1275×1650 điểm ảnh — sắc nét trên màn hình và đủ cho in thường ngày. Ở 72 DPI nhẹ và ổn cho thumbnail; ở 300 DPI đạt cấp in ấn nhưng nặng. Chọn theo đích đến (màn hình hay in giấy) hơn là đoán mò.",
        ],
      },
      {
        heading: "Một trang hay nhiều trang: cấu trúc đầu ra và chất lượng",
        paragraphs: [
          "Một PDF nhiều trang không thể là một JPG, nên bộ chuyển hoặc cho ra chuỗi file đánh số (trang-1.jpg, trang-2.jpg, …) hoặc một kho ZIP. Chuỗi đánh số thân thiện hơn khi muốn lấy từng trang cho công cụ khác; kho ảnh thuận tiện hơn khi tải hàng chục file một lúc. Dù cách nào, đánh số theo thứ tự trang nội bộ của PDF — và như mọi công cụ trang, thứ tự này có thể không khớp nhãn trang in sẵn nếu tài liệu đánh số khác thường.",
          "Nén JPEG hợp với trang có ảnh và dải màu chuyển tiếp, nơi các lỗi nén không nhìn thấy. Với trang chủ yếu là chữ sắc nét hoặc line art, các khối lỗi của JPEG có thể tạo “nhiễu muỗi” mờ quanh chữ ở mức chất lượng thấp; nếu đầu ra hơi nhòe quanh chữ, hãy tăng chất lượng hoặc DPI thay vì chấp nhận.",
          "Nền trắng quan trọng hơn người ta tưởng: JPEG không có trong suốt, nên các vùng trong suốt của trang được vẽ lên nền trắng theo mặc định. Đó thường là điều mong muốn với tài liệu, nhưng nếu nguồn dùng chế độ tối hay nền màu, hãy xem ảnh đầu ra đầu tiên trước khi chạy cả lô.",
        ],
      },
      {
        heading: "Vẽ tài liệu của bạn ngay trên thiết bị của mình",
        paragraphs: [
          "Một PDF thường gom cả dòng giấy tờ của một con người: sao kê, thư từ, báo cáo y tế, thỏa thuận. Vẽ các trang thành ảnh rồi tải lên dịch vụ chuyển đổi nghĩa là toàn bộ hồ sơ hình ảnh rời khỏi thiết bị của bạn trước cả khi bạn chọn ra đúng trang mình cần. Đáng chú ý là những ảnh trích xuất cũng dễ phát tán — một file ảnh đi được xa hơn một PDF với metadata còn nguyên.",
          "Công cụ này vẽ từng trang cục bộ trong trình duyệt của bạn: PDF được phân tích và vẽ lên canvas của thiết bị ở DPI đã chọn, mã hóa thành JPEG trong bộ nhớ, và lưu trực tiếp bởi trình duyệt. Không ảnh trang nào được tải lên, không máy chủ nào dựng tài liệu của bạn, và toàn bộ chuyển đổi chạy được cả khi ngắt mạng.",
          "Vẽ cục bộ còn cho phép chọn lọc mà không tốn thêm gì: vẽ tất cả các trang, rồi chỉ giữ lại hai trang bạn cần, xóa phần còn lại trước khi chúng từng tồn tại ngoài máy của bạn. Với một hình vẽ đơn nằm trong báo cáo 100 trang, tính chọn lọc ấy chính là tất cả — bạn có được ảnh mình muốn và không hơn.",
        ],
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
    deepDive: [
      {
        heading: "PNG hay JPG cho ảnh chụp trang: khi nào bên nào thắng",
        paragraphs: [
          "PNG và JPG cùng biến trang PDF thành điểm ảnh, nhưng mã hóa theo hai triết lý ngược nhau. JPG dùng nén mất dữ liệu tinh chỉnh cho ảnh chụp: file nhỏ, lỗi không thấy trên dải màu, hơi nhòe trên mép cứng. PNG dùng nén không mất dữ liệu tinh chỉnh cho hình phẳng: chữ, biểu đồ, ảnh chụp màn hình và bất cứ thứ gì có mép sắc hay vùng màu đặc đều giữ nguyên từng điểm ảnh, với cái giá là file to hơn với nội dung ảnh chụp.",
          "Vậy nguyên tắc cầm tay: trang chứa chữ, bảng, biểu đồ và hình vẽ đường nét thuộc về PNG — chữ giữ sắc ở mọi mức thu phóng và nén không bao giờ làm nhòe một đường biểu đồ. Trang chứa ảnh scan, hay bất kỳ trang nào chi phối bởi ảnh liên tục tông, thuộc về JPG — PNG sẽ phình to dung lượng mà không được gì nhìn thấy được.",
          "PNG còn giữ màu chính xác trong khi nén sắc độ của JPG có thể dịch nhẹ các màu thương hiệu bão hòa, và file PNG lưu lại không mất thế hệ: chỉnh sửa rồi lưu lại PNG không bao giờ suy giảm, còn mã hóa lại JPG nhiều lần thì lỗi cộng dồn. Với các trang sẽ được chỉnh tiếp, PNG là lựa chọn lưu trữ.",
        ],
      },
      {
        heading: "Độ sắc, tỉ lệ và những lưu ý về trong suốt",
        paragraphs: [
          "Vì PNG không mất dữ liệu, núm chất lượng duy nhất là độ phân giải — vẽ ở 150 DPI cho công việc màn hình, 300 DPI cho ảnh chụp cấp in. Không có thanh trượt nén nào để vặn sai, loại bỏ cả một lớp lỗi: một PNG hoặc được vẽ với đủ điểm ảnh hoặc không, và vẽ lại ở DPI cao hơn là cách trị triệt để độ mềm.",
          "Một lợi thế thật sự so với JPG: PNG hỗ trợ trong suốt. Trang vẽ ra PNG với nền được giữ nguyên có thể ghép lên bất kỳ nền nào khác; JPG luôn dẹt về một màu đặc, thường là trắng. Với các trang biểu đồ dùng cho slide hay file thiết kế, điều này tiết kiệm được bước xóa nền thủ công.",
          "Chú ý dung lượng với các trang dày đặc: một PNG 300 DPI của trang nhiều ảnh có thể nặng hàng chục megabyte. Nếu đích đến là trang web hay tin nhắn, kích thước đó gây hại nhiều hơn độ trung thực mang lại — hạ DPI hoặc chuyển sang JPG cho đúng những trang ấy.",
        ],
      },
      {
        heading: "Chụp trang mà không gửi chúng đi đâu cả",
        paragraphs: [
          "Người ta thường chụp trang PDF thành ảnh để tái sử dụng: một biểu đồ cho báo cáo, trang chữ ký làm bằng chứng, một sơ đồ cho tài liệu đào tạo. Mỗi ảnh chụp là một bản sao tự chứa, có thể đi xa hơn nhiều so với tài liệu gốc — và đó chính là lý do phải quan tâm ai xử lý phép chuyển đổi. Tải một trang mật lên dịch vụ chuyển đổi là đặt bản sao chuẩn từng điểm ảnh lên hạ tầng của người khác trước cả khi bạn làm gì đó với nó.",
          "Công cụ này vẽ và mã hóa hoàn toàn trong trình duyệt của bạn: PDF được vẽ lên canvas của thiết bị ở DPI đã chọn, mã hóa thành PNG không mất dữ liệu trong bộ nhớ, và lưu bởi trình duyệt. Không trang nào được tải lên, không bản sao nào tồn tại ngoài thiết bị của bạn ở bất kỳ thời điểm nào, và chuyển đổi hoàn tất cả khi rút mạng.",
          "Lợi thế thực dụng cộng dồn với các lô việc: chuyển một tài liệu hướng dẫn 200 trang thành PNG tạo ra hàng trăm file, và làm việc đó cục bộ nghĩa là không chờ tải lên, không trần dung lượng từng file, không hàng đợi lô — chỉ tốc độ vẽ của thiết bị bạn, mà với máy hiện đại thường nhanh hơn cả việc tải lên cùng nội dung ấy.",
        ],
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
    deepDive: [
      {
        heading: "PDF-to-PPT thật sự mang lại được gì",
        paragraphs: [
          "Một bộ slide xuất ra PDF đã bị dẹt hóa: các khối văn bản, hình khối và placeholder có thể chỉnh sửa của bản trình bày gốc thành những glyph và hình chữ nhật được đặt vị trí trong PDF. Chuyển ngược lại là dựng lại — bộ chuyển phải đoán những glyph nào tạo thành một khối văn bản, cái gì là hình khối hay ảnh, và mọi thứ nằm ở đâu trên khung slide. Không có dấu vết metadata nào dẫn về cấu trúc gốc.",
          "Vậy kỳ vọng trung thực là: bạn nhận được các slide trông giống bản gốc, với văn bản chọn và sửa được, ở vị trí xấp xỉ đúng. Bạn không lấy lại được cấu trúc lồng nhau chính xác của bản gốc, hiệu ứng hoạt hình (từ trước tới nay chưa từng tồn tại trong PDF), cấu trúc slide mẫu hay các token chủ đề chính xác. Font có thể bị thay thế nếu bản gốc không nhúng font.",
          "Chỗ chuyển đổi này tỏa sáng: khôi phục bộ slide có thể chỉnh sửa khi file .pptx đã mất và chỉ còn PDF; kéo hai slide từ bộ slide của đồng nghiệp để dùng vào của bạn; chỉnh nội dung nhỏ trên một bộ slide nhận được mà không cần xin nguồn. Chỗ nó gây thất vọng: bộ slide thiết kế kỹ xây trên các phần tử chồng nhau, sẽ được dựng lại thành các lớp chồng trông đúng nhưng hơi khó chịu khi chỉnh sửa.",
        ],
      },
      {
        heading: "Kỳ vọng khi chỉnh sửa và cách làm việc với kết quả",
        paragraphs: [
          "Hãy định sẵn sẽ tinh chỉnh, đừng kỳ vọng giống hệt. Những việc dọn dẹp thường gặp sau chuyển đổi: khối văn bản có biên lớn hơn chữ nhìn thấy (bấm vào chọn nhiều hơn mong đợi), ảnh ở vị trí gần mà không chính xác, và cỡ font bị làm tròn về cỡ gần nhất. Không điều nào trong số đó ảnh hưởng vẻ ngoài slide ở chế độ trình chiếu; chúng ảnh hưởng độ gọn gàng khi chỉnh file.",
          "Một quy trình thực dụng: chuyển PDF sang PPT, rồi kiểm tra ngay các slide quan trọng nhất với bạn — thường là slide tiêu đề và một slide nội dung. Sửa font và một bố cục; nếu cấu trúc giữ vững, sửa hàng loạt phần còn lại qua slide mẫu. Nếu cấu trúc không giữ nổi — các khối chồng chéo loạn xạ — thiết kế bản gốc có quá nhiều lớp để dựng ngược sạch sẽ, và vẽ tay lại đúng những slide ấy sẽ nhanh hơn là cãi nhau với kết quả chuyển đổi.",
          "Biểu đồ cần nhắc riêng: một biểu đồ từng là ảnh nhúng trong PDF sẽ vẫn là ảnh trong PPT (không sửa được dữ liệu biểu đồ); một biểu đồ vẽ bằng hình khối vector sẽ dựng lại thành nhóm hình khối, tô lại màu được nhưng không vẽ lại với số liệu mới. Dù cách nào, dữ liệu đằng sau biểu đồ không thể khôi phục từ PDF — nó chưa từng có ở trong đó.",
        ],
      },
      {
        heading: "Bộ slide hay đi xa; hãy giữ chúng ở nhà đến khi chuyển xong",
        paragraphs: [
          "Bản trình bày mặc định là mật của doanh nghiệp: slide chiến lược, đánh giá tài chính, tài liệu M&A, kế hoạch sản phẩm chưa phát hành. Một PDF của bộ slide ấy chứa tất cả trừ phần ghi chú của người nói — và tải nó lên dịch vụ chuyển đổi nghĩa là toàn bộ nội dung hình ảnh của một bản trình bày nội bộ đọc được trên máy chủ của người khác, thường chỉ vài phút sau cuộc họp nơi nó được trình bày.",
          "Công cụ này dựng lại các slide hoàn toàn trong trình duyệt của bạn: PDF được phân tích và vẽ trên thiết bị, các phần tử slide dựng lại cục bộ, và file PPT được lưu trực tiếp bởi trình duyệt. Không gì được tải lên, không có hàng đợi xử lý, và chuyển đổi vẫn y hệt khi offline — bộ slide không tồn tại ngoài máy của bạn dưới bất kỳ hình thức nào.",
          "Với những bộ slide chuyển đổi vốn để chỉnh sửa, xử lý cục bộ còn khớp quy trình: chuyển, mở trong phần mềm trình chiếu, tinh chỉnh bao nhiêu tùy ý mà không phải tải lại giữa các lần. Mỗi lần thử chỉ tốn vài giây và không gì khác — bạn có thể thử, xem và điều chỉnh tự do đến khi bộ slide ứng xử như bạn cần.",
        ],
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
    deepDive: [
      {
        heading: "Lớp văn bản: PDF thật sự lưu gì về chữ của nó",
        paragraphs: [
          "Một PDF sinh ra từ máy tính lưu văn bản như một chuỗi lệnh vẽ: hiện glyph này, ở vị trí này, bằng font này. Các từ thật sự nằm trong đó — đó là lý do Ctrl+F hoạt động trên những tài liệu như vậy. Trích xuất văn bản vì thế không phải là nhận dạng mà là giải mã: đọc lớp văn bản theo thứ tự đọc. Không có xử lý ảnh nào liên quan, và độ trung thực chỉ bị giới hạn bởi cách tài liệu được dựng nên.",
          "Rắc rối kinh điển là thứ tự và gạch nối. PDF mô tả glyph theo vị trí chứ không theo luồng logic, nên bố cục nhiều cột, cột bên và bảng có thể trích xuất theo thứ tự thị giác thay vì thứ tự đọc — các cột đan xen từng dòng. Bộ trích xuất decent dùng heuristics bố cục để nhận cột và dựng lại luồng đọc, nhưng tài liệu thiết kế đậm vẫn có thể ra xáo trộn.",
          "Khoảng trống kia là bản scan: một trang scan không có lớp văn bản nào cả, chỉ có điểm ảnh, nên trích xuất thuần trả về không có gì. Scan cần OCR trước (đó là một công cụ riêng), và file đã OCR sẽ có lớp văn bản mà trích xuất đọc được.",
        ],
      },
      {
        heading: "Thứ tự đọc, các trường hợp mã hóa đặc biệt và kiểm tra thực dụng",
        paragraphs: [
          "Khi kết quả trích xuất trông xáo trộn, gần như luôn là bố cục: bài báo hai cột trích xuất thành các mảnh đan xen, hoặc chú thích rơi vào giữa câu. Cách xử lý nhanh: thử cùng tài liệu với một công cụ khác để so thứ tự, hoặc chấp nhận rằng với bố cục thiết kế đậm bạn có thể muốn trích xuất từng trang rồi ghép tay. Các dấu xuống dòng trong văn bản trích xuất phản chiếu cấu trúc dòng của PDF, nên nối lại đoạn văn thường là bước dọn dẹp trong trình soạn thảo của bạn.",
          "Trường hợp mã hóa đặc biệt hiện lên thành ký tự bí ẩn: các ligature (fi, fl) đến như một glyph duy nhất, dấu bị lỗi nếu PDF dùng mã hóa font không chuẩn, và các ký hiệu toán ánh xạ kém sang văn bản thuần. Đầu ra văn bản thuần không có đậm, nghiêng, bảng hay ảnh — mọi thứ thành ký tự, nên cấu trúc đáng giữ phải ghi lại thủ công.",
          "Một phép kiểm tra hợp lý trước khi tin văn bản trích xuất: tìm trong kết quả một cụm từ bạn nhìn thấy ở trang đầu, và so số ký tự với kỳ vọng. Một báo cáo 10 trang mà chỉ trích xuất ra 300 ký tự thì lớp văn bản hỏng hoặc chỉ toàn ảnh — kết quả trống trung thực của công cụ trên một bản scan tốt hơn nhiều so với âm thầm làm mất nội dung.",
        ],
      },
      {
        heading: "Trích xuất tài liệu cục bộ, đặc biệt là những tài liệu nhạy cảm",
        paragraphs: [
          "Trích xuất văn bản thường là bước đầu tiên khi xử lý những tài liệu bạn không phải tác giả: thỏa thuận pháp lý, báo cáo tài chính, bài nghiên cứu, bản ghi nhớ nội bộ. Tải chúng lên một trang trích xuất nghĩa là toàn bộ nội dung đọc được — dạng dễ mang đi, dễ sao chép nhất của tài liệu của bạn — đi qua máy chủ của người khác. Văn bản trích xuất còn dễ phát tán hơn cả file gốc: nó không mang theo vết metadata nào cả.",
          "Công cụ này giải mã lớp văn bản hoàn toàn trong trình duyệt của bạn: PDF được phân tích cục bộ, glyph được ánh xạ ngược thành ký tự trên thiết bị, và file văn bản thuần được lưu bởi trình duyệt. Không gì được tải lên, không gì được ghi nhật ký ở đâu cả — khi ngắt mạng, trích xuất vẫn hoạt động y hệt.",
          "Vì trích xuất nhanh và không có vòng đi qua mạng, nó khớp với quy trình “trích xuất nhiều rồi tìm kiếm”: bóc văn bản từ cả thư mục PDF, dán hết vào một tài liệu tìm kiếm được hoặc dùng làm corpus, và không một nguồn nào trong số đó rời khỏi máy của bạn. Với việc rà soát tài liệu và so sánh hợp đồng, cặp đôi riêng tư cộng tốc độ ấy chính là điều khiến trích xuất hàng loạt trở nên khả thi.",
        ],
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
    deepDive: [
      {
        heading: "Ranh giới trung thực: gì sống sót qua chuyến đi về Word",
        paragraphs: [
          "PDF mô tả diện mạo cuối cùng; tài liệu Word mô tả cấu trúc — đoạn văn, kiểu dáng, danh sách, tiêu đề. Chuyển đổi giữa hai định dạng là dịch thuật, không phải giải mã, và mỗi phép chuyển phải quyết định dựng lại bao nhiêu cấu trúc chỉ từ diện mạo. Bộ chuyển tốt dựng lại ranh giới đoạn văn, cấp tiêu đề từ cỡ font, và bảng từ văn bản căn đều; bộ chuyển đơn giản đổ các dòng chữ vào một luồng duy nhất.",
          "Những gì sống sót tốt trong một chuyển đổi tốt: văn bản thân với ngắt đoạn, bảng đơn giản, nhấn đậm/nghiêng cơ bản, và thứ tự đọc trong tài liệu điển hình. Những gì hiếm khi sống sót hoàn hảo: font chính xác (Word thay bằng font gần nhất), bố cục nhiều cột (thường bị dẹt thành một cột), đầu trang chân trang (có thể trộn vào thân văn bản hoặc bị bỏ), và bất cứ thứ gì tương tác như trường biểu mẫu hay chú thích.",
          "Cách nói trung thực nhất: PDF-to-Word xuất sắc trong việc khôi phục văn xuôi có thể chỉnh, đủ tốt cho tài liệu văn phòng điển hình, và sai lệch về cấu trúc với các trang thiết kế đậm — poster, bố cục tạp chí phức tạp, biểu mẫu. Với nhóm cuối ấy, chuyển đổi cho bạn một đống hỗn độn có thể chỉnh; dựng lại bố cục trực tiếp trong Word thường nhanh hơn là sửa kết quả chuyển đổi.",
        ],
      },
      {
        heading: "Scan, OCR và quy trình quanh phép chuyển đổi",
        paragraphs: [
          "Nhánh rẽ lớn nhất trong chất lượng PDF-to-Word là nguồn tài liệu là máy sinh hay là scan. PDF máy sinh mang theo văn bản và chuyển trực tiếp. PDF scan chỉ có điểm ảnh, nên chuỗi chuyển đổi dài hơn: OCR tạo lớp văn bản, rồi dựng lại thành các đoạn Word — và giới hạn chính xác của OCR nay đè thêm lên giới hạn của chính chuyển đổi. Chữ viết tay, con dấu và ghi chú lề làm kết quả xấu thêm.",
          "Kỳ vọng thực dụng theo loại nguồn: hợp đồng sinh từ máy chuyển thành thứ bạn chỉnh và hoàn thiện với một ít dọn dẹp. Bản scan sạch 300 DPI chữ in chuyển thành thứ bạn chỉnh được nhưng phải soát từng dòng — lỗi OCR trong hợp đồng và tên riêng chính là những lỗi không thể chấp nhận. Ảnh chụp trang trong ánh sáng kém thì chuyển xấu dù dùng công cụ nào; hãy scan lại cho đàng hoàng.",
          "Sau khi chuyển bất kỳ tài liệu quan trọng nào, hãy đọc một lượt cấu trúc trong Word, không chỉ đọc bằng mắt: kiểm tra ngắt đoạn, đánh số danh sách và ô bảng, vì đó là những chỗ chuyển đổi sai lặng lẽ trong khi trang vẫn trông ổn.",
        ],
      },
      {
        heading: "Hợp đồng và báo cáo nên được chuyển đổi cục bộ",
        paragraphs: [
          "Những tài liệu người ta muốn ở dạng Word có thể chỉnh thường là những tài liệu ràng buộc nhất: hợp đồng để đàm phán lại, chính sách để cập nhật, báo cáo để tái sử dụng, bảng điểm để chú thích. Tải PDF hợp đồng lên một dịch vụ chuyển đổi nghĩa là văn bản pháp lý của bạn đi qua máy chủ của bên thứ ba — và bản Word trích xuất, vốn còn dễ chỉnh và dễ phát tán hơn bản gốc, chính là hiện vật bạn ít muốn nhất nằm trong kho của người khác.",
          "Công cụ này thực hiện toàn bộ chuyển đổi trong trình duyệt của bạn: PDF được phân tích cục bộ, cấu trúc văn bản dựng lại trên thiết bị, và file Word được tạo ra và lưu tại máy. Không gì được truyền đi theo bất kỳ hướng nào, và chuyển đổi chạy hoàn toàn offline — một hợp đồng nằm trong cam kết bảo mật có thể chuyển đổi với sự an tâm như một thực đơn.",
          "Chuyển đổi cục bộ còn giữ vòng soát sát sườn: chuyển, mở trong Word, ghi các chỗ cần sửa, điều chỉnh rồi chuyển lại nếu cần — mỗi vòng chỉ vài giây và không bao giờ phải tải lên lại. Vòng lặp sát ấy là điều khiến việc soát kỹ khả thi, và chính việc soát kỹ, chứ không phải phép chuyển đổi, mới bảo vệ toàn vẹn của tài liệu.",
        ],
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
    deepDive: [
      {
        heading: "Vì sao PNG đầu vào cần cách xử lý khác với JPEG",
        paragraphs: [
          "PNG và JPEG nhìn qua mắt thường giống nhau nhưng mã hóa điểm ảnh theo hai sự đánh đổi ngược nhau. PNG không mất dữ liệu: mọi điểm ảnh được giữ chính xác, khiến nó là định dạng của ảnh chụp màn hình, biểu đồ, chữ scan và bất cứ thứ gì có mép sắc. JPEG mất dữ liệu và được tinh chỉnh cho ảnh chụp. Bọc PNG vào PDF vì thế thường là xử lý nội dung được lợi từ việc giữ không mất dữ liệu — và một bộ chuyển âm thầm mã hóa lại PNG thành JPEG đã vứt bỏ đúng thuộc tính mà bạn chọn PNG vì nó.",
          "Công cụ này nhúng dữ liệu ảnh mà không nén lại phá hủy, nên ảnh chụp màn hình giữ sắc từng điểm ảnh bên trong PDF: chữ trong ảnh chụp vẫn đọc được ở mọi mức thu phóng, và các đường biểu đồ giữ sạch. PDF là cái vỏ; các điểm ảnh không mất dữ liệu của PNG nằm bên trong nguyên vẹn.",
          "Một chi tiết tinh tế đáng biết: PNG hỗ trợ trong suốt, trang PDF thì không. Một PNG trong suốt đặt lên trang PDF sẽ được ghép lên một nền — theo quy ước là trắng. Nếu ảnh chụp màn hình của bạn có vùng trong suốt có ý nghĩa (một logo, một lớp phủ), hãy xem trang đầu của kết quả thay vì giả định.",
        ],
      },
      {
        heading: "Ảnh chụp màn hình, bản scan và ghép chúng theo thứ tự",
        paragraphs: [
          "Công việc PNG-to-PDF phổ biến nhất mang hình dạng tài liệu hóa: một chuỗi ảnh chụp màn hình tạo thành hướng dẫn, báo cáo lỗi kèm ảnh bằng chứng, chứng chỉ hay biểu mẫu đã scan lưu thành PNG. Với tất cả những việc ấy, thứ tự trang là cả trò chơi — một hướng dẫn mà các ảnh chụp đến sai trình tự thì vô dụng. Đặt tên file 01-…, 02-… trước khi thêm khiến thứ tự mong muốn hiện rõ và sống sót qua mọi kiểu sắp xếp của hộp chọn file.",
          "Ảnh chụp màn hình có kích thước đúng từng điểm ảnh, hiếm khi khớp khổ giấy, nên các trang đầu ra thường có kích thước theo từng ảnh. Điều đó lý tưởng cho đọc trên màn hình và lưu trữ. Nếu đích đến là bản in, sự lệch khổ quan trọng hơn: hãy cân nhắc chữ trong ảnh chụp có đủ to ở cỡ in không, vì thu một ảnh chụp 1080p xuống A4 khiến chữ giao diện nhỏ khó đọc.",
          "Với tài liệu nhiều ảnh, đồng nhất hơn là đa dạng: các ảnh chụp từ cùng phiên ứng dụng dùng chung kích thước và phong cách, và PDF kết quả đọc như một tài liệu mạch lạc. Nguồn lẫn lộn — ảnh chụp màn hình cộng ảnh chụp cộng bản scan — cho ra các trang chênh nhau cực lớn; chuẩn hóa (đổi kích thước hay cắt nguồn trước) cho kết quả chuyên nghiệp hơn hẳn.",
        ],
      },
      {
        heading: "Đóng gói bằng chứng ngay tại máy, không qua tay môi giới",
        paragraphs: [
          "Nội dung người ta đóng gói từ PNG sang PDF thường mang tính bằng chứng hay riêng tư: ảnh chụp giao dịch gian lận, nhật ký chat cho một tranh chấp, scan giấy tờ để xác minh, kết quả xét nghiệm y tế. Mỗi thứ đó là loại điều bạn không bao giờ trao cho người lạ — nhưng tải lên dịch vụ chuyển đổi thì đúng là làm điều ấy, trước cả khi PDF tồn tại.",
          "Công cụ này đóng gói hoàn toàn trong trình duyệt của bạn: PNG được đọc cục bộ, nhúng không mất dữ liệu vào các đối tượng trang PDF, và tài liệu hoàn chỉnh được lưu bởi thiết bị của bạn. Không gì được tải lên ở bất kỳ thời điểm nào, nên ảnh chụp ứng dụng ngân hàng của bạn không bao giờ tồn tại trên máy chủ nào, và thao tác vẫn vậy khi không có mạng.",
          "Còn một khoản lợi về chất lượng: vì dữ liệu PNG được nhúng nguyên xi, PDF giữ đúng những điểm ảnh bạn chụp — điều quan trọng khi nội dung là bằng chứng, nơi một lỗi nén trên dấu thời gian hay số tài khoản có thể gây hoài nghi tính xác thực. Bạn chụp cái gì, người đọc thấy chính xác cái đó.",
        ],
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
    deepDive: [
      {
        heading: "Sắp lại trang là thao tác thuần túy trên cây trang",
        paragraphs: [
          "Sắp lại thứ tự trang trong PDF chỉ thay đổi đúng một thứ: thứ tự các mục trong cây trang của tài liệu. Luồng nội dung trang, font, ảnh, chú thích — tất cả giữ nguyên từng byte. Không gì được vẽ lại, không gì được nén lại, và thao tác không mất dữ liệu theo nghĩa chặt nhất: sắp lại trang rồi sắp về chỗ cũ cho ra tài liệu tương đương bản gốc.",
          "Điều đó khiến việc sắp lại diễn ra tức thì kể cả với file khổng lồ, vì không một dữ liệu trang nào bị đụng tới — chỉ có mục lục nhỏ xíu ghi “trang này trước, trang kia sau” bị đổi. Dung lượng gần như không đổi, và chất lượng giống hệt theo đúng định nghĩa.",
          "Sắp lại không đụng những gì: liên kết nội bộ và dấu trang có thể trỏ tới đối tượng trang thay vì vị trí, nên chúng thường theo đúng trang mục tiêu của mình — một liên kết tới “trang chứa chương 3” vẫn đúng sau khi sắp lại. Nhưng bất cứ thứ gì tham chiếu theo vị trí (một ghi chú in “xem trang 12”) không tự cập nhật. Danh mục kiểm tra tham chiếu chéo áp dụng ở đây y như khi xóa trang.",
        ],
      },
      {
        heading: "Quy trình thumbnail-first và những lỗi đáng tránh",
        paragraphs: [
          "Làm việc qua thumbnail thay vì số trang là cải thiện khả năng dùng lớn nhất trong việc sắp trang. Nhãn trang trong trình xem thường bất đồng với trình tự thật (tài liệu có phần mở số la mã, đánh số đếm lại mỗi chương), nhưng thumbnail hiển thị thẳng nội dung. Kéo trang bạn nhìn thấy, không phải con số bạn tính ra.",
          "Những lỗi kinh điển: để lại một cặp trang trùng sau khi kéo (phụ lục được chèn hai lần), và quên rằng các trang trắng phân cách có thể là chủ ý. Lật lướt nhanh thứ tự cuối cùng bắt được cả hai trong vài giây. Với tài liệu ghép từ nhiều nguồn, cũng hãy kiểm tra độ nhất quán khổ trang trong lúc đó — sắp trang là khoảnh khắc tự nhiên để để ý một trang khổ letter lạc vào giữa các trang A4.",
          "Một mẹo quy trình: khi sửa bản scan sai thứ tự (trang được nạp vào khay giấy lệch trật tự), phép sửa thường là vài cặp hoán đổi kề nhau chứ không phải xáo toàn bộ. Sửa các cặp kề nhau nhanh và ít rủi ro; còn việc sắp lại toàn bộ một bản scan nên gợi câu hỏi liệu có đáng chỉnh thiết lập khay nạp của máy scan cho lần sau.",
        ],
      },
      {
        heading: "Sửa thứ tự mà không gửi file đi đâu cả",
        paragraphs: [
          "Những tài liệu cần sắp lại trang thường là tài liệu hoàn chỉnh và nhạy cảm: hợp đồng nguyên vẹn, trọn bộ hồ sơ ứng tuyển, bó bằng chứng đã ghép. Đây chính là những file không nên tải lên chỉ để sửa cosmetics — gửi cả hợp đồng đến một trang sắp trang trao cho họ toàn bộ tài liệu, từng trang một, để đổi lấy một thao tác kéo và bấm.",
          "Công cụ này sắp lại hoàn toàn trong trình duyệt của bạn: PDF được phân tích cục bộ, chỉ mục cây trang được viết lại trong bộ nhớ, và file đã sắp được lưu bởi thiết bị. Không một byte nội dung trang nào được truyền đi, và thao tác hoàn tất tức thì bất kể trạng thái mạng — bạn làm được cả ở chế độ máy bay.",
          "Vì không gì được mã hóa lại, đầu ra giữ mọi thuộc tính của nguồn: văn bản tìm kiếm được, font nhúng, chú thích, trường biểu mẫu, metadata. Sắp trang ở đây thuần cấu trúc, nghĩa là bạn có thể sắp lại bao nhiêu lần tùy thích mà không lo chất lượng — lần sắp thứ mười vẫn không mất dữ liệu như lần đầu.",
        ],
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
    deepDive: [
      {
        heading: "Xoay là metadata, không phải điểm ảnh",
        paragraphs: [
          "Mỗi trang trong PDF mang một cờ xoay — một giá trị đơn giản (bước 90 độ) báo cho trình xem hiển thị trang theo hướng đã xoay. Xoay trang bằng công cụ này thay đổi cờ đó, không phải nội dung trang: chữ, ảnh và vector đứng đúng vị trí cũ trong file. Đó là lý do xoay diễn ra tức thì và không mất dữ liệu hoàn hảo, kể cả với file hàng trăm megabyte.",
          "Cơ chế cờ giải thích một hiện tượng quen thuộc: một trang có thể chứa nội dung dựng đứng nhưng hiển thị nằm ngang (hoặc ngược lại) tùy cờ xoay. Một số máy scan và một số bộ tạo PDF đặt cờ thay vì xoay thật nội dung. Xoay trang như vậy là lật cờ; nội dung bên dưới không bị đụng tới theo cách nào cả.",
          "Một hệ quả đáng biết: vì xoay nằm trong cờ, những công cụ bỏ qua nó — một số parser sơ khai, một số bộ tạo thumbnail — có thể hiển thị hướng “thô”. Và nếu sau đó bạn raster hóa trang (ví dụ nén), việc vẽ diễn ra theo hướng đã xoay và công việc của cờ trở nên vĩnh viễn. Xoay trước khi raster hóa vì thế là đúng trình tự.",
        ],
      },
      {
        heading: "Bản scan, hướng lẫn lộn và các cách sửa thực dụng",
        paragraphs: [
          "Công việc xoay phổ biến nhất là sửa scan: máy scan hai mặt lật các mặt sau, máy ảnh điện thoại cho ra biên lai nằm ngang, một lô ra với hướng xen kẽ. Sửa từng trang đúng là việc của công cụ này — chọn những trang lệch và xoay chúng. Xoay tất cả là nước đi sai ở đây; nó “sửa” những trang đúng bằng cách làm hỏng chúng.",
          "Với tài liệu sẽ in hoặc đóng gáy, hãy nghĩ xem mép nào là mép đóng gáy sau khi xoay. Một trang xoay 90 độ đọc tự nhiên trên màn hình nhưng có thể in với “đỉnh” dọc theo cạnh ngắn tờ giấy, thay đổi cách lề rơi xuống. In thử một trang trước khi chạy cả lô tiết kiệm giấy và sự bực bội.",
          "Một lưu ý về việc vì sao có trang hình như “tự xoay lại”: nếu một trình xem ghi nhớ cờ và một công cụ khác lưu lại file mà không mang theo cờ, hướng bị đặt lại. Giữ chuỗi chỉnh sửa trong các công cụ bảo toàn cờ (như công cụ này) tránh việc đặt lại; nếu một trang cứ trở lại nằm ngang sau mỗi lần sửa, một bước nào đó trong quy trình của bạn đang đánh rơi cờ.",
        ],
      },
      {
        heading: "Xoay trang ngay tại máy, miễn phí hoàn toàn",
        paragraphs: [
          "Xoay thường là phép sửa áp lên những tài liệu bạn vốn đã có và tin tưởng: bản scan của chính mình, file đồng nghiệp gửi. Lý do vẫn nên đòi xử lý cục bộ là nhất quán về nguyên tắc — một tài liệu không bao giờ đến tay bên thứ ba cho bất kỳ thao tác nào là một tài liệu có bề mặt lộ thông tin do bạn toàn quyền kiểm soát. Không có thao tác nào quá vặt vãnh để đáng hình thành thói quen tải lên với các file mật.",
          "Công cụ này xoay ngay trong trình duyệt của bạn: PDF được đọc cục bộ, cờ các trang được cập nhật trong bộ nhớ, và đầu ra được lưu bởi thiết bị. Không có gì tải lên, và vì chỉ có cờ thay đổi, thao tác hiệu quả là tức thì kể cả với file rất lớn — không có chờ mã hóa lại dưới bất kỳ hình thức nào.",
          "Bản chất mức cờ còn khiến xoay ở đây đảo ngược an toàn: xoay 90 độ bốn lần là bạn trở về đúng bản gốc, từng bit một. Bạn có thể thử nghiệm tự do — lật một trang, xem nó, lật về — mà không có rủi ro gì cho file, và đó chính là loại thao tác nhàn hạ mà công cụ cục bộ tỏa sáng.",
        ],
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
    deepDive: [
      {
        heading: "Chữ ký này thật sự là gì — và không phải là gì",
        paragraphs: [
          "Công cụ này thêm một hình chữ ký vẽ tay hoặc gõ chữ lên trang — giống cách bạn ký lên bản in bằng tay. Đó là chữ ký điện tử theo nghĩa rộng thường ngày: mực nhìn thấy được trên tài liệu, do bạn đặt, từ thiết bị của chính mình. Nó không phải chữ ký số bằng chứng thư số: không có cặp khóa mật mã, không có nhà cấp chứng nhận, và không có cơ chế phát hiện can thiệp mà trình xem có thể xác minh.",
          "Sự phân biệt này quan trọng về mặt pháp lý. Nhiều nơi tài phán chấp nhận chữ ký điện tử đơn giản cho phần lớn thỏa thuận thường ngày (giấy tờ nhân sự, biểu mẫu nhà cung cấp, phê duyệt nội bộ), trong khi một số nhóm tài liệu cụ thể có thể yêu cầu chữ ký số đủ tiêu chuẩn có chứng thư. Nếu đối tác hay pháp luật yêu cầu chữ ký dựa trên chứng thư, công cụ này không phải thứ đó — hãy dùng dịch vụ ký số đủ tiêu chuẩn.",
          "Nó mang lại cho bạn: cách ký tài liệu nhanh, miễn phí mà không cần in, scan, gửi giấy tờ qua lại, đồng thời giữ tài liệu hoàn toàn trên máy của bạn. Với lượng khổng lồ các phê duyệt thường ngày mà chữ ký nhìn thấy được là đủ, điều đó phủ đúng nhu cầu thật.",
        ],
      },
      {
        heading: "Để có chữ ký trông giống bạn",
        paragraphs: [
          "Chữ ký vẽ bằng chuột thường xấu hơn chữ ký tay thật của bạn. Nếu diện mạo có ý nghĩa, hai lựa chọn thực dụng: vẽ trên màn hình cảm ứng nếu có, hoặc ký lên một tờ giấy trắng, chụp ảnh, cắt sát nét rồi dùng file ảnh đó. Chữ ký chụp trên giấy trắng tinh nhập vào sạch sẽ và trông đúng như tay bạn.",
          "Vị trí là một nửa nghệ thuật: chữ ký nên nằm nơi chữ ký thuộc về — phía trên hoặc cạnh dòng chữ ký, không trôi nổi trong khoảng trắng. Thu phóng tới vùng chữ ký, đặt chính xác, và chỉnh cỡ để tỉ lệ khớp với văn bản tài liệu; chữ ký to bằng cả đoạn văn trông như dán vào. Cũng kiểm tra trang tiếp theo nếu biểu mẫu còn tiếp tục ở đó.",
          "Hãy hiểu mình đang ký gì: vì đây là lớp phủ ảnh, nó không khóa tài liệu. Bất kỳ ai có file đều có thể gỡ ảnh hay sửa văn bản quanh nó. Hãy ký phiên bản cuối — làm phẳng và chốt trước — rồi gửi ở dạng bạn kiểm soát (PDF, không phải bản thảo có thể chỉnh), để cái được ký cũng là cái được lưu hành.",
        ],
      },
      {
        heading: "Ký là hành động riêng tư nhất; hãy giữ nó cục bộ",
        paragraphs: [
          "Chữ ký là hành động chứa nhiều bản sắc nhất được thực hiện trên một tài liệu — cá nhân hơn cả nội dung. Tra hình chữ ký của bạn cho một trang web ký số nghĩa là bản sao chữ ký tay của bạn nằm trên máy chủ của người khác: một hiện vật tái sử dụng được của bản sắc bạn, có thể bị bóc ra dán vào tài liệu khác. Rất ít người trao cho người lạ một tờ đầy chữ ký của mình; tải một chữ ký lên cũng chính là hành động đó với vẻ ngoài đẹp hơn.",
          "Công cụ này ký hoàn toàn trong trình duyệt của bạn: tài liệu được xử lý trên thiết bị, chữ ký được vẽ vào trang cục bộ, và file đã ký được lưu bởi máy bạn. Hình chữ ký được dùng trong bộ nhớ và không bao giờ được truyền đi, và toàn bộ thao tác chạy offline.",
          "Một thói quen đáng áp dụng khi ký cục bộ: giữ nguồn chữ ký (ảnh hay nét vẽ) trong thư mục riêng tư thay vì thư mục tải xuống chung, và tạo PDF đã ký riêng cho từng tài liệu. Như vậy hiện vật chữ ký tái sử dụng chỉ tồn tại đúng một nơi bạn kiểm soát, và mỗi tài liệu đã ký là một file cuối riêng biệt — không có bản trung gian chung nào trôi nổi.",
        ],
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
    deepDive: [
      {
        heading: "Tách file là hình ảnh đối xứng của gộp file — và cũng không mất dữ liệu",
        paragraphs: [
          "Tách một PDF tạo ra các tài liệu mới, mỗi tài liệu chứa một tập con các trang gốc. Như khi gộp, thao tác làm việc trên cây trang: mỗi tài liệu đầu ra nhận một danh sách tham chiếu trỏ tới các đối tượng trang gốc, được sao chép nguyên xi. Nội dung trang không bao giờ bị vẽ lại hay nén lại, nên mỗi đầu ra giữ chất lượng của nguồn một cách chính xác — văn bản chọn được, font nhúng, độ phân giải ảnh, chú thích.",
          "Có hai chế độ tách phổ biến với trực giác khác nhau. Tách theo khoảng (“trang 1-5, 6-12”) tạo ra các khối có tên để phân phối — một chương cho mỗi người nhận, một phần cho mỗi phòng ban. Tách mỗi N trang (“mỗi 10 trang”) là công cụ hàng loạt để phá một bản scan hay xuất liệu dài thành các đơn vị xử lý được, ví dụ để đáp ứng giới hạn dung lượng tải lên ở đâu đó.",
          "Tách không làm gì: trích xuất nội dung bên trong một trang. Một trang chứa nửa thông tin mật và nửa công khai vẫn nguyên vẹn ở đầu ra nào nó rơi vào. Nội dung nhạy cảm dùng chung trang với nội dung chia sẻ được cần tổ chức lại theo trang (hoặc tẩy xóa, một thao tác khác khó hơn nhiều) trước khi tách.",
        ],
      },
      {
        heading: "Kế hoạch đường cắt: khoảng, ranh giới và đặt tên file",
        paragraphs: [
          "Chất lượng của phép tách được quyết định trước khi bạn bấm: bằng nơi bạn vẽ ranh giới. Cắt tại các đường nối cấu trúc — đầu chương, ngắt phần, trang trắng phân cách — chứ không phải theo số trang tùy hứng. Một chương bắt đầu nửa chừng trong một khối còn khó chịu hơn cả một phân bổ hơi lệch. Lướt mục lục hay danh sách dấu trang của tài liệu trước là cách nhanh nhất tìm điểm cắt tự nhiên.",
          "Đặt tên quan trọng hơn tưởng tượng. Đầu ra của phép tách có xu hướng sinh sôi — và sáu file tên “output_1.pdf” đến “output_6.pdf” đảm bảo sự rối loạn một tuần sau đó. Hãy đặt tên khối theo nội dung (“hop-dong-chu-ky.pdf”, “phu-luc-A.pdf”) ngay khi tạo ra chúng; lúc tách chính là thời điểm hợp lý, vì đó là khi bạn biết chính xác từng khối chứa gì.",
          "Một thói quen cho việc tách lặp lại: nếu bạn tách cùng một tài liệu dài cùng một cách nhiều lần (sao kê hàng tháng tách theo khách hàng, tài liệu hướng dẫn tách theo chương), hãy giữ danh sách khoảng trong một ghi chú và dùng lại. Các khoảng ổn định miễn là số trang nguồn không đổi — và ghi chú ấy kiêm luôn tài liệu mô tả bộ sưu tập được tổ chức thế nào.",
        ],
      },
      {
        heading: "Phân phối tài liệu mà không có bản sao của môi giới",
        paragraphs: [
          "Tách file thường đi trước phân phối: gửi chương một cho người phản biện, các trang hóa đơn cho kế toán, bản tóm tắt công khai cho khách hàng. Tài liệu bị tách thường là bản gốc đầy đủ và nhạy cảm — điều đó khiến việc tải nó lên dịch vụ tách đặc biệt ngược đời: bạn trao cả tài liệu để tạo ra những mảnh mà bạn định chọn lọc trao đi.",
          "Công cụ này tách hoàn toàn trong trình duyệt của bạn: PDF nguồn được phân tích cục bộ, các tài liệu đầu ra được lắp trong bộ nhớ từ những tham chiếu trang bạn chọn, và từng file được lưu trực tiếp bởi thiết bị. Bản gốc không bao giờ rời khỏi máy của bạn, nên các phần bạn giữ kín và các phần bạn phát hành được tạo ra dưới cùng điều kiện riêng tư.",
          "Một hệ quả hữu ích: vì đầu ra là bản sao từng byte của trang gốc, bạn có thể xác minh phép tách bằng cách mở bất kỳ đầu ra nào và kiểm tra các trang của nó giống hệt từng điểm ảnh với trang nguồn tương ứng. Không cần kiểm toán chất lượng — phép tách là cấu trúc chứ không phải sáng tạo, nên chẳng có gì có thể suy giảm từ đầu.",
        ],
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
    deepDive: [
      {
        heading: "Hình mờ được thêm vào thế nào — và nó không làm được gì",
        paragraphs: [
          "Hình mờ là một lớp phủ: công cụ vẽ chữ hay ảnh của bạn lên trên (hoặc dưới) nội dung của mọi trang, ở vị trí, kích thước và độ trong suốt đã chọn. Nội dung trang gốc nguyên vẹn — cùng cơ chế với số trang, chỉ là to hơn. Đó là lý do đóng mờ diễn ra tức thì và không mất dữ liệu đối với tài liệu nguồn, và file gốc trên đĩa của bạn vẫn không bị đụng tới.",
          "Lựa chọn kinh điển là chữ bán trong suốt chéo qua trang — “NHÁP”, “MẬT”, tên công ty. Vị trí chéo chống được việc cắt gọn qua loa, và độ trong suốt giữ văn bản thân vẫn đọc được bên dưới. Hình mờ nằm dưới nội dung (vẽ sau lớp chữ) trông sạch hơn nhưng có thể bị các trang vẽ một ảnh nền toàn trang đè lên che khuất.",
          "Hãy rõ ràng về bản chất hình mờ: một răn đe và dấu đánh dấu, không phải ổ khóa. Bất kỳ ai có công cụ cơ bản đều có thể che hình mờ hay bóc nội dung chưa đóng mờ nếu lớp văn bản còn nguyên. Hình mờ báo hiệu quyền sở hữu và trạng thái (“đây là bản nháp, không phải bản cuối”) cho người đọc trung thực và gây khó khăn cho việc lạm dụng vô tâm — nhưng không chặn được người có chủ đích.",
        ],
      },
      {
        heading: "Quyết định thiết kế: độ đậm, vị trí và hành vi theo từng trang",
        paragraphs: [
          "Độ đậm là núm quyết định hình mờ sống hay chết. Khoảng 10–20% trong suốt, chữ vẫn đọc hoàn toàn và dấu hiện diện mà không hét lên; trên khoảng 30% nó bắt đầu đánh nhau với nội dung và người đọc phải nheo mắt. Hãy thử trên trang chữ dày nhất — hình mờ ổn trên bìa thưa có thể giẫm đạp lên một trang bảng biểu dày đặc.",
          "Vị trí nên khớp ý định. Một dấu chéo giữa trang nói “nhãn trạng thái” (nháp, mật). Dấu ở góc hay chân trang đọc như con dấu và hợp với ghi nguồn — tên công ty, nguồn gốc tài liệu. Với tài liệu sẽ bị cắt gọn hay nơi lề có thể bị xén, đặt giữa sống sót; dấu góc sát mép có thể bị mất khi in.",
          "Một tinh tế đáng kiểm tra: hình mờ áp lên mọi trang theo mặc định, gồm cả bìa và trang trắng phân cách, đôi khi trông kỳ. Nếu trang bìa của đầu ra trông bị đóng dấu quá tay, đó là lớp phủ đồng nhất đang làm việc đồng nhất — một số quy trình thay vào đó đóng mờ sau khi ghép và xóa mờ trên bìa bằng cách thêm lại một trang bìa sạch lên trên.",
        ],
      },
      {
        heading: "Đóng dấu bản nháp ngay tại máy, trước khi chúng lưu hành",
        paragraphs: [
          "Hình mờ thường được áp lên chính những tài liệu đang chuyển động: bản nháp gửi đi phản biện, đoạn trích mật chia sẻ để góp ý, hóa đơn và sao kê mang tên đơn vị phát hành. Đây là các tài liệu làm việc mà khán giả của nó bán tín bán yếu theo định nghĩa — và tải chúng lên dịch vụ đóng mờ là trao bản gốc chưa đóng mờ cho bên thứ ba đúng vào khoảnh khắc nó sắp lưu hành.",
          "Công cụ này đóng mờ ngay trong trình duyệt của bạn: các trang được xử lý cục bộ, dấu được vẽ vào nội dung trang trong bộ nhớ, và đầu ra được lưu bởi thiết bị. Bản gốc chưa đóng mờ không bao giờ rời khỏi máy của bạn; thứ lưu hành chỉ là bản đã đánh dấu mà bạn chủ động tạo ra.",
          "Còn một khoản lợi quy trình: vì đóng mờ tức thì và cục bộ, việc tạo các biến thể theo từng khán giả rất rẻ — “NHÁP — để phản biện nội bộ” cho nhóm này, một bản có tên người nhận cho nhóm khác. Đánh dấu theo từng người nhận là kỹ thuật truy vết rò rỉ kinh điển, và nó chỉ khả thi khi tạo mỗi biến thể tốn vài giây và không lần tải lên nào.",
        ],
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
    deepDive: [
      {
        heading: "Vì sao Word-to-PDF thường là chiều đáng tin",
        paragraphs: [
          "Chuyển đổi giữa Word và PDF là bất đối xứng, và Word-to-PDF là chiều dễ. Một tài liệu Word có mọi cấu trúc mà bộ dựng cần — chữ, kiểu dáng, bảng, ảnh, bố cục trang — và tạo PDF đơn giản là dựng cấu trúc ấy thành định dạng mô tả trang. Không có gì phải đoán: bạn thấy gì trong Word thì thứ đó được vẽ ra.",
          "Vì vậy đầu ra của một chuyển đổi Word-to-PDF tốt là trung thực theo đúng cấu trúc: font, khoảng cách, bảng và ngắt trang rơi đúng ý, và PDF đóng băng chúng để mọi trình xem trên mọi thiết bị hiển thị cùng một thứ. Sự đóng băng ấy chính là toàn bộ điểm của định dạng — một hợp đồng nhìn giống hệt trên laptop của bạn, điện thoại của người nhận và máy RIP của nhà in.",
          "Sự bất đối xứng về độ tin cậy quan trọng khi kế hoạch công việc: chuyển Word-to-PDF vào khoảnh khắc cuối, khi tài liệu đã hoàn chỉnh, và đừng bao giờ định chuyển ngược về Word để chỉnh tiếp. PDF-to-Word là dựng lại (và mất cấu trúc); file .docx chính là bản gốc cần giữ.",
        ],
      },
      {
        heading: "Font, trường động và danh mục kiểm tra trước khi chuyển",
        paragraphs: [
          "Font là cái bẫy kinh điển của Word-to-PDF. Nếu tài liệu dùng font không có trên máy chuyển đổi, bộ dựng thay bằng font giống tương tự và khoảng cách dịch chuyển tinh vi — một dòng chữ ký có thể trôi, một bảng có thể xuống dòng khác. Chuyển đổi tốt nhúng các font nó dựng, nên đầu ra tự chứa; nhưng font đúng phải hiện diện tại thời điểm chuyển. Chuyển trên máy đã soạn tài liệu là mặc định an toàn.",
          "Kiểm tra các phần động trước khi chuyển: trường mục lục, tham chiếu số trang và tham chiếu chéo nên được cập nhật (Ctrl+A rồi F9 trong Word) để PDF mang con số cuối cùng chứ không phải con số cũ. Cũng kiểm tra tài liệu có chú thích hay thay đổi được theo dõi không — chúng có hiện trong PDF hay không tùy bộ dựng, và gửi một PDF còn hiện markup cho đối tác là tai nạn tiết lộ kinh điển.",
          "Một thói quen nữa: sau khi chuyển, so số trang và liếc trang đầu với trang cuối. Nếu PDF nhiều hoặc ít hơn Word một trang, có thứ gì bị chảy — thường là do thay thế font — và đáng tìm hiểu trước khi gửi hơn là sau.",
        ],
      },
      {
        heading: "Tài liệu cuối cùng nên được chốt ngay tại máy",
        paragraphs: [
          "Word-to-PDF là bước tạo ra hình thức chính thức của một tài liệu: hồ sơ xin việc để nộp, hóa đơn để gửi, luận văn để nộp kho, hợp đồng để ký. Những hiện vật cuối cùng ấy là đáng bảo vệ nhất, và cũng là những thứ bị tải lên các trang chuyển đổi nhiều nhất — nghĩa là phiên bản gần cuối của hồ sơ hay hợp đồng của bạn nằm trên máy chủ của người xa lạ trước khi bạn kịp gửi cho người nhận thật.",
          "Công cụ này dựng phép chuyển đổi hoàn toàn trong trình duyệt của bạn: cấu trúc tài liệu được xử lý trên thiết bị, PDF được tạo trong bộ nhớ, và đầu ra được lưu cục bộ. Không gì được tải lên ở bất kỳ giai đoạn nào — phiên bản cuối của tài liệu của bạn tồn tại đúng hai nơi: file .docx gốc và PDF bạn tạo ra, cả hai trên máy bạn.",
          "Chuyển đổi cục bộ còn khiến kỷ luật phiên bản trở nên thực tế: vì mỗi lần chuyển chỉ tốn vài giây, bạn có thể tạo lại PDF sau mỗi lần chỉnh thay vì giữ một bản cũ — PDF luôn khớp .docx mới nhất. Thói quen ấy xóa sổ hoàn toàn vấn đề kinh điển “mình đã gửi phiên bản nào nhỉ”, và nó chỉ hoạt động khi chuyển đổi không có ma sát tải lên.",
        ],
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
    deepDive: [
      {
        heading: "EXIF giấu gì bên trong ảnh của bạn",
        paragraphs: [
          "Mỗi ảnh từ máy ảnh hay điện thoại hiện đại mang theo nhiều hơn những điểm ảnh. Khối EXIF lưu model máy ảnh, ống kính, thông số phơi sáng, dấu thời gian — và nặng hệ quả nhất là tọa độ GPS trong nhiều trường hợp. Một tấm ảnh đời thường đăng lên mạng có thể tiết lộ chính xác căn phòng hay góc phố nơi nó được chụp.",
          "Khối này thường còn chứa một ảnh xem trước nhỏ nhúng sẵn và, trên một số thiết bị, lịch sử phần mềm và chỉnh sửa. Ảnh chụp màn hình và ảnh tải từ nơi khác thường có rất ít hoặc không có EXIF, nên trình xem metadata đôi khi hiện “không tìm thấy gì” — sự vắng mặt ấy là bình thường, không phải lỗi.",
          "Gỡ EXIF không phải để che giấu việc làm xấu; đó là vệ sinh thường quy trước khi công bố. Nhà báo, nhà hoạt động, nhân viên y tế và người dùng thường đều có lý do chính đáng để tách nội dung bức ảnh khỏi metadata ghi chép của nó.",
        ],
      },
      {
        heading: "Gỡ đi thì thay đổi gì — và không thay đổi gì",
        paragraphs: [
          "Gỡ EXIF để ảnh nhìn thấy nguyên vẹn: kích thước, màu sắc và chất lượng giữ y nguyên. Cái biến mất là khối metadata, nên file trở nên vô danh — không máy ảnh, không vị trí, không dấu thời gian đính kèm.",
          "Gỡ không đổi nội dung điểm ảnh, nghĩa là thông tin nhìn thấy được vẫn nhìn thấy. Nếu ảnh chụp một biển báo, một thẻ tên hay một màn hình có chữ, gỡ EXIF không giúp gì; bạn cần cắt hay che những vùng đó riêng.",
          "Gắn vị trí địa lý là lý do đa số người quan tâm, nhưng dấu thời gian cũng đáng lo: kết hợp với các bài đăng công khai khác, ngày tạo có thể giúp dựng nên lộ trình di chuyển hay thói quen của ai đó. Gỡ metadata toàn phần đóng cả hai kênh cùng lúc.",
        ],
      },
      {
        heading: "Xử lý cục bộ chính là toàn bộ ý nghĩa",
        paragraphs: [
          "Có một sự trớ trêu khi tải ảnh lên một công cụ “riêng tư”: file nhạy cảm về riêng tư khi ấy đi qua máy chủ của người khác, thứ nhìn thấy chính xác metadata mà bạn đang định gỡ — gồm cả thẻ GPS. Một công cụ gỡ dựa trên tải lên tự phản bội phần lớn mục đích của chính nó.",
          "Công cụ này đọc và viết lại file hoàn toàn trong trình duyệt của bạn. Ảnh được giải mã cục bộ, metadata bị gỡ bỏ, và file sạch được tạo ra trên thiết bị của bạn; không gì được truyền đi đâu cả, nên chính dữ liệu bạn muốn biến mất chưa từng rời khỏi tay bạn.",
          "Một thói quen thực dụng: gỡ metadata ở bước cuối trước khi chia sẻ, từ file xuất ra mà bạn thực định đăng. Giữ bản gốc có EXIF làm bản chủ — nó còn giữ thông tin hữu ích như thông số phơi sáng cho việc chỉnh sửa sau này.",
        ],
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
    deepDive: [
      {
        heading: "Vì sao favicon cần nhiều kích thước",
        paragraphs: [
          "Favicon không phải là một file duy nhất: cùng một dấu hiệu được hiển thị ở 16 px trong tab trình duyệt, 32 px trong một số tab retina và thanh tác vụ, khoảng 180 px làm Apple touch icon trên màn hình chính iOS, và 512 px cho màn hình cài đặt Android và PWA. Phục vụ một file 16 px duy nhất cho mọi bối cảnh khiến icon màn hình chính trông như vệt điểm ảnh nhòe.",
          "Trình duyệt chọn icon khai báo lớn nhất khớp với bối cảnh và thu nhỏ một cách mượt mà, nhưng chúng không thể phóng to — nguồn 16 px kéo lên 512 px là mờ không thể cứu. Đó là lý do bộ tạo bắt đầu từ ảnh nguồn độ phân giải cao và tạo cả thang kích thước một lần.",
          "Bộ khai báo thực dụng phủ vùng chung: 16 và 32 px cho tab, 180 px cho iOS, 192 và 512 px cho manifest Android/PWA. Khai báo đủ tất cả trong HTML với các thẻ link đúng để mỗi nền tảng chọn cỡ phù hợp nhất của nó.",
        ],
      },
      {
        heading: "Thiết kế dấu hiệu sống sót qua 16 điểm ảnh",
        paragraphs: [
          "Phần lớn logo chết ở 16 px: đường mảnh nhập vào nhau thành nhiễu, chữ cái thành cục mờ, chi tiết hai màu biến mất. Cách an toàn cho favicon là rút dấu hiệu về một phần tử nhận ra được duy nhất — một chữ, một biểu tượng, một hình — thay vì thu nhỏ cả logo đầy đủ.",
          "Thử ở đúng kích thước đích, không phải ở độ phân giải đầy đủ: cái đọc rõ ở 512 px có thể vô hình ở 16 px. Tương phản cao, nét đậm và hình dáng đơn giản sống sót qua thu nhỏ; gradient và viền mảnh thì không.",
          "Cũng cân nhắc mặt tối: tab và hệ điều hành vẽ icon trên cả nền sáng lẫn nền tối. Dấu hiệu đen tinh trên nền trong suốt biến mất ở dark mode, trắng tinh biến mất ở light mode. Thêm một viền tương phản nhẹ hay một hình nền đặc khiến icon hoạt động ở cả hai.",
        ],
      },
      {
        heading: "Tạo cục bộ và riêng tư thương hiệu",
        paragraphs: [
          "Favicon là hạt giống của nhận diện hình ảnh thương hiệu, và logo đang trong quá trình phát triển thường là bảo mật — dấu hiệu sản phẩm chưa phát hành, các phương án đổi mới. Tạo bộ favicon cục bộ trong trình duyệt nghĩa là một thiết kế chưa từng công khai không bao giờ chạm vào hàng đợi tải lên.",
          "Công cụ vẽ ảnh nguồn của bạn xuống từng kích thước đích ngay trong trình duyệt thiết bị, cho ra các bản thu nhỏ sạch từ bản gốc đầy đủ độ phân giải. Không máy chủ nào thấy tác phẩm, và các file được tạo tải thẳng về đĩa của bạn.",
          "Mẹo quy trình: tạo lại bộ khi dấu hiệu nguồn thay đổi, và giữ việc tạo ra là tái lập được — cùng ảnh nguồn phải luôn cho ra cùng bộ favicon, để một kích thước thiếu có thể được tạo lại bất cứ lúc nào.",
        ],
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
    deepDive: [
      {
        heading: "Vì sao grayscale hơn hẳn “xóa màu đi”",
        paragraphs: [
          "Cách ngây thơ để làm ảnh xám là lấy trung bình ba kênh đỏ, lục, lam bằng nhau. Cách đó bỏ qua cách thị giác con người hoạt động: ta nhạy với ánh sáng lục nhiều hơn đỏ, và gần như không nhạy với lam. Lấy trung bình bằng nhau khiến cỏ lục và gạch đỏ — vốn sáng ngang nhau trong mắt — ra sai độ sáng tương đối.",
          "Chuyển đổi đúng chuẩn dùng các trọng số độ sáng rút ra từ cách mắt cảm nhận mỗi màu gốc, xấp xỉ 0,299 đỏ + 0,587 lục + 0,114 lam (các hệ số ITU-R BT.601 mà chuẩn truyền hình chuẩn hóa từ nhiều thập kỷ trước). Công cụ này chuyển đổi với trọng số thị giác như vậy, nên kết quả xám khớp với điều mắt bạn thực thấy trong bản màu gốc.",
          "Kết quả còn là một công cụ dựng nguyên thủy hữu ích cho việc chỉnh sửa: nhiều nhiếp ảnh gia chuyển sang xám trước để đánh giá cấu trúc tông của ảnh — có đen thật, trắng thật và các tông giữa mượt hay không — trước khi bận tâm đến màu sắc.",
        ],
      },
      {
        heading: "Định dạng đầu ra và cái gì được giữ nguyên",
        paragraphs: [
          "Chuyển đổi grayscale chỉ đổi dữ liệu màu — hình học điểm ảnh nguyên vẹn, nên kích thước, độ sắc và bố cục sống sót chính xác. Nhờ đó an toàn khi áp ở bất kỳ giai đoạn nào của quy trình mà không có tác dụng phụ dây chuyền như khi lấy mẫu lại.",
          "Chọn định dạng vẫn quan trọng: lưu PNG khi ảnh chứa chữ, đồ họa phẳng hay khi bạn muốn trung thực tối đa và không mất gì thêm; lưu JPG cho nội dung ảnh chụp nơi dung lượng có ý nghĩa. Một JPEG grayscale thường nhỏ hơn bản màu vì các kênh màu mang phần lớn dữ liệu bị nén đi.",
          "Một khác biệt tinh tế đáng biết: một ảnh grayscale thật và một ảnh màu mà ba kênh tình cờ bằng nhau đều có thể “nhìn xám”, nhưng chúng được lưu khác nhau. Các công cụ và máy in có thể xử lý chúng khác nhau; nếu hành vi chính xác quan trọng với quy trình in, hãy giữ PNG.",
        ],
      },
      {
        heading: "Grayscale có ích ở đâu — và riêng tư",
        paragraphs: [
          "Các cách dùng kinh điển vượt ngoài thẩm mỹ: bản scan tài liệu đọc sạch hơn khi không có sắc màu từ đèn máy scan; kiểm tra khả năng tiếp cận dùng grayscale để xác minh thiết kế vẫn hoạt động mà không dựa vào màu; và bản in định cất thành đen trắng nên luôn được xem trước bằng xám.",
          "Nó cũng là công cụ gỡ lỗi cho ảnh: nếu một chân dung có sắc màu lạ hay tông da không đều, chuyển sang xám tách vấn đề tông khỏi vấn đề màu, cho biết bạn nên sửa phơi sáng hay cân bằng trắng.",
          "Như mọi công cụ ở đây, chuyển đổi chạy hoàn toàn trong trình duyệt của bạn — ảnh không bao giờ rời khỏi thiết bị. Grayscale một lô bản scan cá nhân, bản nháp của khách hay tài liệu riêng mà chẳng cái nào chạm vào máy chủ.",
        ],
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
    deepDive: [
      {
        heading: "HEIC thật sự là gì — và vì sao nó tồn tại",
        paragraphs: [
          "HEIC là định dạng container đằng sau định dạng ảnh Hiệu suất Cao của Apple, trở thành mặc định cho ảnh máy iPhone từ iOS 11. Nó dựa trên cùng họ nén video HEVC và lưu ảnh với kích thước khoảng một nửa so với JPEG tương đương — vì vậy điện thoại có thể chụp ảnh độ phân giải cao mà bộ nhớ không đầy.",
          "Sự đánh đổi là khả năng tương thích. HEIC được hỗ trợ tốt trong hệ sinh thái Apple và ở một số phiên bản Windows và Android gần đây, nhưng nhiều trang web, cổng chính phủ, máy in, phần mềm cũ và thiết bị không phải Apple vẫn mong đợi JPG. Một ảnh mở tốt trên điện thoại của bạn có thể bị từ chối ngay khi tải lên đâu đó.",
          "Chuyển sang JPG đánh đổi dung lượng lấy tính phổ quát: file kết quả lớn hơn nhưng mở được ở đâu cũng được, từ trình duyệt một thập kỷ tuổi đến nhà in. Đó là sự đánh đổi đúng mỗi khi đích đến nằm ngoài tay bạn.",
        ],
      },
      {
        heading: "Chi tiết chuyển đổi đáng biết",
        paragraphs: [
          "JPEG là định dạng mất dữ liệu, nên chuyển HEIC sang JPG là mã hóa lại, không phải đóng gói lại. Với cài đặt chất lượng cao, khác biệt không cảm nhận được trên ảnh thường; với cài thấp, bạn kế thừa các lỗi nén đè lên phần nén gốc. Hãy dùng chất lượng cao nhất trừ khi dung lượng quan trọng hơn độ trung thực.",
          "Metadata có thể không sống sót qua chuyển đổi: HEIC hỗ trợ các tính năng JPEG không có, như bản đồ chiều sâu dùng bởi chế độ Chân dung. Một JPEG thuần mang ảnh nhìn thấy, kích thước và EXIF chuẩn, nhưng không có các phần mở rộng riêng của Apple. Nếu bạn dựa vào việc chỉnh độ sâu của ảnh sau này, hãy giữ bản HEIC gốc.",
          "Chuyển hàng loạt là quy trình thực tế: thư viện iPhone chứa hàng trăm hay hàng nghìn file HEIC, và chúng thường cần chuyển ngay khi phải đi đến máy PC, một biểu mẫu web hay ổ đĩa dùng chung. Hãy chuyển đúng những gì đích đến cần, và giữ các bản HEIC gốc làm nguồn sự thật.",
        ],
      },
      {
        heading: "Riêng tư quan trọng nhất với ảnh cá nhân",
        paragraphs: [
          "Ảnh máy chụp thuộc nhóm file nhạy cảm nhất mà người ta có: khoảnh khắc gia đình, nội thất nhà cửa, thói quen du lịch. Các trang chuyển ảnh yêu cầu tải lên nhìn thấy tất cả những điều ấy — và thẻ vị trí EXIF thậm chí có thể ghi lại nơi từng bức được chụp.",
          "Bộ chuyển này chạy hoàn toàn trong trình duyệt của bạn: HEIC được giải mã và mã hóa lại thành JPG ngay trên thiết bị, không gì được truyền đi. Đó là lựa chọn hợp lý cho thư viện cá nhân chính vì không có máy chủ nào từng nhìn thấy những bức ảnh.",
          "Một mẹo liên quan: nếu bạn định chia sẻ JPG công khai thay vì chỉ mở nó ở đâu đó, hãy cân nhắc gỡ luôn EXIF vị trí — đổi định dạng tự nó không gỡ metadata vị trí trừ khi công cụ bỏ nó trong lúc mã hóa lại.",
        ],
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
    deepDive: [
      {
        heading: "Nén mất dữ liệu thật sự vứt bỏ gì",
        paragraphs: [
          "Nén kiểu JPEG hoạt động trong ba nước đi: chuyển ảnh thành dữ liệu tần suất, vứt bỏ các thành phần tần suất cao mà mắt bạn ít nhạy nhất, rồi đóng gói phần còn lại hiệu quả. Đó là lý do nén gần như vô hình trên ảnh chụp — da mịn và trời xanh mất rất ít — trong khi chữ mép cứng và nét mảnh chịu thiệt trước tiên, hiện quầng ringing quanh chữ.",
          "Thanh chất lượng ánh xạ sang lượng thông tin tần suất được giữ lại. Ở mức cao, dữ liệu bị vứt thực sự không cảm nhận được; khi xuống thấp, hiện tượng khối xuất hiện trong dải màu và nhiễu được khuếch đại quanh các mép. Không có con số “tốt nhất” phổ quát: một ảnh chi tiết rộn ràng có thể ổn ở 60 trong khi ảnh chụp màn hình cần 85 mới sạch.",
          "Nén là một chiều. Mỗi lần lưu lại vứt thêm thông tin, nên chỉnh sửa rồi lưu đi lưu lại một JPEG ở chất lượng trung bình cộng dồn lỗi qua từng thế hệ — hiện tượng gọi là mất chất theo thế hệ. Hãy luôn giữ bản gốc, và nén một lần duy nhất, ở cuối quy trình.",
        ],
      },
      {
        heading: "Chọn chất lượng, và khi nào kích thước hơn thanh trượt",
        paragraphs: [
          "Một thang khởi điểm thực dụng: 80–90 cho ảnh chính và bất cứ thứ gì có chữ; 60–80 cho ảnh thường trên web; dưới 50 chỉ khi giới hạn dung lượng cứng ép buộc. Sau đó hãy phán đoán bằng mắt ở đúng kích thước ảnh sẽ được hiển thị — lỗi nhìn thấy ở thu phóng 100% có thể biến mất hoàn toàn ở chiều rộng trang.",
          "Khi cả chất lượng thấp cũng không chạm tới dung lượng mục tiêu, số điểm ảnh mới là vấn đề thật. Giảm một nửa cả hai chiều bỏ đi khoảng ba phần tư số điểm ảnh — một bậc mà thanh chất lượng không thể sánh. Hãy đổi kích thước trước, nén sau — hai đòn bẩy hoạt động ở hai thang khác nhau.",
          "Hãy nhìn các con số byte trước/sau thay vì giả định: một số file đã nén tốt gần như không co thêm, và nén lại chúng chỉ tốn chất lượng. Nếu file vốn đã nén đẹp, tối ưu tốt nhất là để yên hoặc đổi kích thước nó.",
        ],
      },
      {
        heading: "Xử lý cục bộ và độ khớp quy trình",
        paragraphs: [
          "Nén chạy hoàn toàn trong trình duyệt của bạn: ảnh được giải mã, mã hóa lại và đo lường cục bộ, không có bước tải lên. Nhờ đó dùng được cho công việc của khách, ảnh sản phẩm chưa phát hành hay tài liệu cá nhân mà bạn không muốn trao cho một dịch vụ web xa lạ nào.",
          "Vì xử lý tức thì, quy trình tự nhiên là lặp lại: thử một giá trị chất lượng, xem bản xem trước và dung lượng, chỉnh, lặp lại. Đây chính xác là điều khiến bộ nén dựa trên tải lên trở nên đau đớn, vì mỗi lần thử tốn một chuyến đi qua mạng.",
          "Hãy đặt công cụ vào đúng vị trí: nó là bước cuối trước khi công bố. Chỉnh sửa và retouch trước trên bản gốc, xuất một lần, rồi nén chính bản xuất đó. Nén sớm nghĩa là mọi lần chỉnh sau đều nén lại một file đã tổn thương.",
        ],
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
    deepDive: [
      {
        heading: "Các tầng metadata bên trong một file ảnh",
        paragraphs: [
          "Metadata trong file ảnh nằm theo từng tầng. Tầng container luôn hiện diện: định dạng file, kích thước điểm ảnh, dung lượng và độ sâu màu. Bên trên là EXIF — hãng và model máy ảnh, ống kính, khẩu, tốc độ màn trập, ISO, tiêu cự, trạng thái flash, dấu thời gian chụp. Sâu hơn nữa là các khối riêng theo định dạng: các chunk tEXt/iTXt của PNG, marker comment của JPEG, đôi khi cả hồ sơ màu nhúng (ICC) và cả thumbnail — vốn tự nó là những ảnh nhỏ.",
          "Trình xem đọc các tầng này mà không đụng vào điểm ảnh, và đó chính là cách an toàn để soi một file: không gì được giải mã thành file mới, không gì được ghi lại, và không gì có thể hỏng trong quá trình. Bạn thấy gì chính là file thật sự mang — kể cả những phần mà tác giả gốc có thể không biết là có.",
        ],
      },
      {
        heading: "Dữ liệu GPS của EXIF: tiêu đề riêng tư",
        paragraphs: [
          "Phần lớn máy ảnh điện thoại gắn tọa độ GPS vào mỗi ảnh theo mặc định. Tọa độ chính xác đủ đặt một bức ảnh trong vòng vài mét — nghĩa là một tấm ảnh đời thường có thể lặng lẽ tiết lộ nhà của bạn, trường của con bạn hay phòng khách sạn của bạn. Trước khi chia sẻ ảnh công khai, kiểm tra thẻ GPS là thói quen metadata có giá trị nhất.",
          "Nếu có dữ liệu GPS và bạn định công bố ảnh, hãy đưa nó qua trình gỡ EXIF sau đó. Trình xem metadata và trình gỡ metadata là hai nửa của một quy trình: xem trước để biết gì sẽ rò rỉ, gỡ sau để chắc chắn nó không rò rỉ. Lưu ý là chia sẻ lại qua ứng dụng nhắn tin thường tự gỡ metadata, nhưng chia sẻ file trực tiếp — email, link đám mây, tải lên — thì không.",
        ],
      },
      {
        heading: "Soi file mà không tải lên",
        paragraphs: [
          "File được phân tích cục bộ trong trình duyệt của bạn: các byte thô được đọc từ đĩa vào bộ nhớ và các bảng metadata được giải mã tại đó. Không gì được truyền đi, nên soi những ảnh nhạy cảm là an toàn tuyệt đối — bằng chứng cho một tranh chấp, ảnh công việc có thẻ vị trí, ảnh nằm trong cam kết bảo mật — không rủi ro lộ gì.",
          "Vì không có tải lên, không có trần kích thước: bản gốc máy ảnh 50 megapixel được soi nhanh đúng bằng thumbnail. Hãy ghép trình xem với trình gỡ EXIF cho một vòng kiểm-tra- rồi-dọn hoàn chỉnh, cả hai chạy trên thiết bị của bạn.",
        ],
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
    deepDive: [
      {
        heading: "Thu phóng cho đẹp: hướng nào, preset nào",
        paragraphs: [
          "Đổi kích thước có hai hướng với bản chất khác nhau. Thu nhỏ bỏ điểm ảnh, và làm tốt thì gần như không mất gì nhìn thấy được — một ảnh thu về một nửa chiều rộng rồi xem ở cỡ trang không thể phân biệt với bản gốc. Phóng to bịa ra những điểm ảnh chưa từng được chụp, đó là lý do nó chỉ có thể làm mềm hay nhòe.",
          "Giữ tỷ lệ bị khóa trừ khi đích đến thật sự đòi hỏi méo: chỉnh rộng-cao tự do kéo hình tròn thành bầu dục và khuôn mặt thành phiên bản nhà quỷ. Các nền tảng thường tự cắt hay tự thêm viền để ép tỷ lệ của chúng, nên méo tay hiếm khi là điều ai muốn.",
          "Các preset phổ biến ánh xạ sang ràng buộc thật: rộng 1920 px khớp màn hình full-HD và đa số cột nội dung blog, 1080 px hợp bài đăng mạng xã hội, 512 px trở xuống phục vụ avatar và icon. Thu về đúng kích thước hiển thị thay vì giao một bản gốc máy ảnh 6000 px là khoản tăng tốc trang lớn nhất có thể có.",
        ],
      },
      {
        heading: "Trình tự thao tác: đổi kích thước trước khi nén",
        paragraphs: [
          "Nếu ảnh cần cả đổi kích thước lẫn nén, hãy đổi kích thước trước. Mỗi điểm ảnh bị bỏ là dữ liệu mà bộ nén không phải mã hóa, và mức giảm tỷ lệ với diện tích — giảm nửa chiều rộng và chiều cao còn một phần tư số điểm ảnh. Không cài đặt chất lượng nào sánh được bậc ấy.",
          "Đổi kích thước còn tương tác với định dạng: đổi kích thước một PNG ảnh chụp màn hình vẫn không mất dữ liệu, trong khi đổi kích thước một JPG là nén lại và thêm một vòng lỗi. Khi có thể, hãy đổi kích thước từ nguồn ít nén nhất mà bạn có và để định dạng cuối được quyết sau cùng.",
          "Một chi tiết mọi người hay bỏ sót: sau khi thu nhỏ, làm sắc nhẹ có thể khôi phục độ sắc mà nội suy làm mất — nhưng làm sắc quá tay một ảnh đã thu tạo quầng xấu hơn cả độ mềm. Sự tiết chế áp dụng với làm sắc hơn với bất kỳ cài đặt nào khác ở đây.",
        ],
      },
      {
        heading: "Đổi kích thước cục bộ và riêng tư",
        paragraphs: [
          "Các công việc đổi kích thước thường dính đến nhóm ảnh riêng tư nhất: giấy tờ tùy thân được chỉnh cỡ cho một biểu mẫu, ảnh gia đình thu nhỏ để chia sẻ, ảnh sản phẩm chưa phát hành chuẩn bị cho một listing. Gửi chúng lên một dịch vụ đổi kích thước dựa trên tải lên là trao bản gốc đầy đủ độ phân giải cho kho lưu trữ của người lạ.",
          "Công cụ này đổi kích thước hoàn toàn trong trình duyệt của bạn: giải mã, co giãn và mã hóa lại diễn ra trên thiết bị, và đầu ra tải xuống trực tiếp. Không gì được truyền đi, nên không có bản sao nào của bản gốc nằm đâu khác ngoài máy của bạn.",
          "Chế độ hàng loạt khớp với trường hợp lặp lại — một bộ ảnh cùng cần một chiều rộng web. Áp một kích thước cho cả thư mục, tải kết quả về thành ZIP, và giữ bản gốc nguyên vẹn làm nguồn sự thật cho mọi lần đổi kích thước sau này.",
        ],
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
    deepDive: [
      {
        heading: "JPG sang PNG có thể và không thể khôi phục gì",
        paragraphs: [
          "Sự thật đầu tiên cần chấp nhận: chuyển JPG sang PNG không làm ảnh tốt hơn. PNG không mất dữ liệu, nhưng nó chỉ giữ được cái đang tồn tại — mà cái tồn tại trong một JPG vốn đã là kết quả của nén mất dữ liệu. Các lỗi nén đã nướng vào file sẽ đi vào PNG nguyên xi.",
          "Điều chuyển đổi mang lại là một tương lai an toàn. PNG giữ mọi điểm ảnh chính xác, nên từ khoảnh khắc chuyển đổi trở đi, chỉnh sửa, cắt và lưu lại không tốn một chút chất lượng nào. Giữ JPG làm bản làm việc nghĩa là mỗi lần lưu đều nén lại và cộng dồn tổn thương.",
          "Vậy mô hình tư duy đúng là “ổn định hóa”: chuyển đổi đáng làm khi JPG là bản sao tốt nhất của bạn và bạn định tiếp tục chỉnh, lưu trữ hay xuất lại. Nó vô nghĩa như một tuyên bố thẩm mỹ — chẳng ai nhìn vào PNG mà thấy nó đẹp hơn.",
        ],
      },
      {
        heading: "Kỳ vọng dung lượng và hành vi định dạng",
        paragraphs: [
          "Hãy chuẩn bị file sẽ phình to. Nén thông minh của JPEG vứt dữ liệu mà PNG phải lưu trung thực, nên cùng bức ảnh dưới dạng PNG thường lớn gấp nhiều lần bản JPG — PNG trả tiền cho sự chính xác, kể cả ghi lại từng lỗi mà JPG để lại.",
          "Với nội dung ảnh chụp, mức giá ấy thường không đáng trừ khi bạn cần nó: giữ ảnh là JPG để chia sẻ, và chuyển sang PNG khi ảnh bước vào quy trình chỉnh sửa nơi việc lưu đi lưu lại nếu không sẽ làm suy giảm nó.",
          "Nơi chuyển đổi thật sự tỏa sáng là trường hợp hỗn hợp: ảnh chứa chữ hay đồ họa phẳng mà bị lưu nhầm thành JPG. Chúng đã hỏng, nhưng đóng băng chúng trong PNG chặn sự tổn thương khỏi tăng thêm theo mỗi lần chỉnh hay lưu tiếp.",
        ],
      },
      {
        heading: "Quy trình chỉnh sửa và xử lý cục bộ",
        paragraphs: [
          "Quy tắc thực dụng cho các đường ống chỉnh sửa: chuyển sang PNG ở đầu, làm toàn bộ chỉnh sửa trong vùng không mất dữ liệu, và chỉ xuất sang JPG ở bước giao cuối cùng. Như vậy bước mất dữ liệu diễn ra đúng một lần, ở cuối, thay vì một lần mỗi lần chỉnh.",
          "Kho lưu trữ và bản gốc được lợi vì lý do khác: định dạng trôi và phần mềm già đi, nhưng dữ liệu điểm ảnh không mất dữ liệu của PNG là đại diện bền nhất cho những gì file thật sự chứa. Chuyển bản sao tốt nhất của bạn sang PNG là một hợp đồng bảo hiểm nhỏ chống các sai lầm nén lại trong tương lai.",
          "Như mọi nơi trên trang này, chuyển đổi chạy cục bộ trong trình duyệt của bạn — giải mã, mã hóa và tải xuống diễn ra trên thiết bị, không tải lên. Vì vậy chuyển ảnh cá nhân hay bản gốc của khách chưa từng phơi chúng cho một máy chủ bên thứ ba.",
        ],
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
    deepDive: [
      {
        heading: "Chọn bố cục: ngang, dọc hay lưới",
        paragraphs: [
          "Gộp ảnh là một quyết định bố cục trước khi là quyết định kỹ thuật. Gộp ngang hợp với chuỗi đọc từ trái sang phải — so sánh trước/sau, bước một cạnh bước hai. Xếp dọc hợp với danh sách và nội dung kiểu chat, nơi mỗi ảnh nối tiếp xuống dưới. Bố cục lưới hợp với ghép ảnh và so sánh nhiều tấm nơi không có thứ tự đọc nào chi phối.",
          "Biến số ẩn là kích thước đầu vào khác nhau. Khi các ảnh gộp không dùng chung một chiều, công cụ phải quyết định: kéo giãn để khớp (méo mó), đệm để khớp (thêm viền nền), hay căn về một cạnh và chấp nhận bất đối xứng. Biết mình đang nhận hành vi nào chặn đứng phần lớn bất ngờ.",
          "Khoảng cách và màu nền là lớp hoàn thiện: vài điểm ảnh khoảng hở với nền trung tính biến hai ảnh áp sát nhau thành một tổng thể có chủ đích. Trên nền trong suốt, khoảng hở vẫn trong suốt trong đầu ra PNG — điều quan trọng với các lớp phủ.",
        ],
      },
      {
        heading: "Hành vi định dạng khi gộp",
        paragraphs: [
          "Gộp thường không mất dữ liệu về cấu trúc — đó là hợp thành, không phải nén — nhưng định dạng đầu ra quyết định điều gì xảy ra tiếp theo. Đầu ra PNG giữ chính xác mọi điểm ảnh đầu vào và giữ trong suốt; đó là mặc định an toàn cho ảnh chụp màn hình, đồ họa và bất cứ thứ gì có chữ.",
          "Đầu ra JPG nướng kết quả gộp thành một hình chữ nhật phẳng: các khoảng hở trong suốt thành màu nền đặc, và cả tổng thể chịu một vòng nén mất dữ liệu. Điều đó ổn với tổng thể ảnh chụp và bắt buộc về dung lượng khi nhiều ảnh lớn gộp vào một file.",
          "Chú ý kích thước tổng: gộp dọc cộng chiều cao và giữ chiều rộng lớn nhất, nên một thư mục ảnh chụp màn hình cao có thể cho ra kết quả cao hơn mức nhiều trình xem hiển thị dễ chịu. Tách hay co nguồn trước khi gộp đôi khi hơn là một đầu ra khổng lồ duy nhất.",
        ],
      },
      {
        heading: "Gộp cục bộ giữ cho tổng thể được riêng tư",
        paragraphs: [
          "Ảnh gộp thường kết hợp nội dung nhạy cảm: so sánh hai dashboard nội bộ, ảnh chụp tài liệu lộ đường dẫn file và tên người dùng, ảnh trước/sau cá nhân. Một dịch vụ gộp dựa trên tải lên thấy từng đầu vào trọn vẹn — tổng thể cùng mọi mảnh của nó.",
          "Công cụ này hợp thành hoàn toàn trong trình duyệt của bạn: mỗi ảnh được giải mã và vẽ lên một canvas dùng chung cục bộ, và file gộp xong được ghi vào đĩa của bạn. Không đầu vào nào rời khỏi thiết bị, nên các mảnh riêng tư đúng bằng kết quả cuối.",
          "Thứ tự quan trọng cho việc tái lập: ghi lại hay giữ thứ tự ảnh được thêm, vì một phép gộp đảo hay xáo trộn cho ra file nhìn giống nhưng nghĩa khác — chết người với so sánh trước/sau nơi hướng chính là toàn bộ thông điệp.",
        ],
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
    deepDive: [
      {
        heading: "OCR biến điểm ảnh thành văn bản thế nào",
        paragraphs: [
          "Nhận dạng ký tự quang học là một đường ống, không phải một bước đơn lẻ: trước hết ảnh được tiền xử lý (chỉnh tương phản, giảm nhiễu, thẳng hàng), rồi bố cục được phân tích để tìm những vùng trông như khối chữ, sau đó một mô hình nhận dạng ánh xạ từng hình dạng ký tự thành một chữ cái, và cuối cùng các mảnh được lắp lại thành dòng và đoạn.",
          "Độ chính xác phụ thuộc nhiều vào chất lượng nguồn. Bản scan sạch, độ phân giải cao của chữ in với tương phản tốt có thể tiến gần nhận dạng hoàn hảo; ảnh độ phân giải thấp, trang nghiêng, font trang trí và chữ viết tay đều làm độ chính xác tụt mạnh. Nguyên tắc cầm tay: ảnh càng giống tài liệu photocopy thì kết quả càng tốt.",
          "Cài đặt ngôn ngữ quan trọng ngang chất lượng ảnh: bộ nhận dạng cần biết mong đợi bảng chữ cái và hình dạng từ nào. OCR một hóa đơn tiếng Nhật bằng mô hình tiếng Anh cho ra vô nghĩa đầy tự tin — luôn khớp mô hình với ngôn ngữ của văn bản.",
        ],
      },
      {
        heading: "Lấy kết quả tốt hơn từ nguồn không hoàn hảo",
        paragraphs: [
          "Vài thói quen nâng độ chính xác đáng kể. Cắt bỏ vùng quanh không liên quan trước khi chạy nhận dạng, làm thẳng hay chụp lại trang bị nghiêng, và tăng tương phản nếu chữ quá mờ — ảnh chụp màn hình của chữ thường thắng ảnh chụp màn hình vật lý vì không có phối cảnh hay chói lóa.",
          "Cẩn thận với các cặp ký tự mà mô hình hay nhầm ở chất lượng thấp: 0 và O, 1 với l và I, rn và m. Số trong bảng, mã và số tiền xứng đáng một lượt soát tay — một chữ số sai trong số tài khoản hay mức giá là lỗi OCR kinh điển.",
          "Hãy coi đầu ra là bản nháp, không phải bản chép nguyên văn: soát mọi thứ bạn sẽ dán vào tài liệu, và giữ ảnh gốc. Tổ hợp nhận dạng máy nhanh cộng một lượt kiểm tra ngắn của người vượt xa độ tin cậy của riêng cái nào.",
        ],
      },
      {
        heading: "Riêng tư là lý do OCR cục bộ có ý nghĩa",
        paragraphs: [
          "Những tài liệu người ta OCR đúng là những tài liệu nhạy cảm: hợp đồng, scan giấy tờ tùy thân, phiếu lương, biên lai có số thẻ, ghi chú viết tay. Các dịch vụ OCR dựa trên tải lên nhận trọn vẹn bức ảnh — và do đó cả văn bản cùng mọi dữ liệu cá nhân trong đó — trên hạ tầng của người khác.",
          "Công cụ này thực hiện nhận dạng hoàn toàn trong trình duyệt của bạn: ảnh được xử lý trên thiết bị và văn bản trích xuất ở lại trên màn hình của bạn. Không gì được truyền đi, nên OCR tài liệu mật không mang rủi ro tải lên nào.",
          "Một hệ quả thực dụng: bạn có thể OCR tài liệu nằm trong cam kết bảo mật, giấy tờ y tế hay hồ sơ nội bộ mà không cần đọc chính sách riêng tư của ai trước, vì không có bên ngoài nào tham gia vào quá trình xử lý.",
        ],
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
    deepDive: [
      {
        heading: "Khi không mất dữ liệu chạm mặt mất dữ liệu",
        paragraphs: [
          "PNG lưu mọi điểm ảnh chính xác: nén không mất dữ liệu, nên giải mã trả về đúng ảnh cũ. JPEG vứt dữ liệu mà mắt ít khả năng để ý, đánh đổi độ trung thực lấy file nhỏ hơn nhiều. Chuyển PNG sang JPG vì thế là chọn mất thông tin để lấy kích thước.",
          "Với ảnh chụp, sự đánh đổi gần như vô hình: một ảnh lưu từ PNG sang JPG ở chất lượng cao nhìn như cũ và thường co lại nhiều lần. Tổn thương tập trung ở nơi PNG đang bảo vệ độ chính xác — mép cứng, chữ, đồ họa màu phẳng và dải màu đều — nơi JPEG tạo quầng ringing và dải màu băng.",
          "Một tổn thất cấu trúc là toàn phần: trong suốt. Kênh alpha của PNG không thể sống sót trong JPG, nên các vùng trong suốt phải được tô bằng màu nền, thường là trắng. Nếu PNG của bạn có vùng nhìn xuyên và nền đích không phải trắng, hãy chuẩn bị thấy một hộp màu trừ khi bạn tô đúng màu trước.",
        ],
      },
      {
        heading: "Khi nào chuyển đổi đáng — và khi nào thì không",
        paragraphs: [
          "Hãy chuyển khi dung lượng hay khả năng tương thích đòi hỏi: nền tảng từ chối tải lên PNG, biểu mẫu giới hạn dung lượng, thư viện ảnh hàng trăm tấm. Một PNG mang nội dung ảnh chụp gần như luôn lãng phí byte — máy ảnh không bao giờ xuất PNG, nên một PNG ảnh chụp thường đến từ đường ống chụp màn hình hay một lần xuất nhầm, và JPG giảm nó một nửa mà không chênh lệch nhìn thấy.",
          "Đừng chuyển khi độ chính xác là điều cốt lõi: logo, ảnh chụp giao diện, biểu đồ, pixel art và bất cứ thứ gì có chữ nên ở lại PNG. Chuyển chúng sang JPG mua được ít dung lượng và đánh mất các mép sắc không thể khôi phục.",
          "Câu hỏi tô nền xứng đáng một quyết định chứ không phải một mặc định: trắng hợp đa số bối cảnh in và tài liệu; một màu khớp trang đích hợp đồ họa web. Chọn màu tô có chủ đích là khác biệt giữa một chuyển đổi sạch và một chuyển đổi lộ liễu.",
        ],
      },
      {
        heading: "Chuyển đổi cục bộ giữ file được riêng tư",
        paragraphs: [
          "Chuyển đổi chạy hoàn toàn trong trình duyệt của bạn: PNG được giải mã, ghép lên nền đã chọn, mã hóa lại thành JPG và trả về — tất cả trên thiết bị của bạn. Không có bước tải lên nghĩa là ảnh chụp công cụ nội bộ, tài liệu khách hàng hay tài liệu cá nhân chưa từng chạm vào máy chủ.",
          "Xử lý tức thì, nên quy trình thực dụng cho lô hỗn hợp là xem nội dung từng ảnh trước: ảnh chụp thì qua chuyển đổi, đồ họa thì ở lại PNG. Không có một cài đặt duy nhất nào thay bạn quyết — câu trả lời đúng phụ thuộc nội dung từng file.",
          "Giữ bản PNG gốc sau khi chuyển. JPG không đi ngược lại được: một khi chi tiết tần suất cao và kênh alpha đã mất, không công cụ nào khôi phục được, và bản gốc là con đường duy nhất để đổi màu nền khác hay xuất lại không mất dữ liệu sau này.",
        ],
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
    deepDive: [
      {
        heading: "Xoay sắp xếp lại điểm ảnh — nhưng không bao giờ lấy mẫu lại chúng",
        paragraphs: [
          "Xoay 90 độ là trường hợp sạch: mọi điểm ảnh chuyển sang tọa độ mới và không cần nội suy, nên nội dung ảnh sau đó giống từng điểm ảnh với trước. Kích thước đơn giản là hoán đổi — ảnh 4000×3000 thành 3000×4000.",
          "Góc tùy ý thì khác: không hình chữ nhật xoay nào khớp lại được vào lưới điểm ảnh gốc, nên các góc phải được tô bằng màu nền và nội dung phải được nội suy để rơi đúng các điểm lưới. Đó là lý do nghiêng 10 độ hiện các tam giác ở góc và lý do xoay mạnh trên ảnh nhỏ làm mềm các mép.",
          "Hệ quả thực dụng là ưu tiên các lượt xoay tròn 90 độ khi có thể, và làm xoay góc tự do từ nguồn độ phân giải cao nhất có sẵn. Nếu cần chỉnh 5 độ, hãy làm trên bản gốc, không phải trên bản sao đã đổi kích thước.",
        ],
      },
      {
        heading: "Vì sao ảnh chụp từ điện thoại ra nằm ngang: hướng EXIF",
        paragraphs: [
          "Vấn đề kinh điển “ảnh điện thoại nằm ngang” không phải lỗi xoay — đó là metadata. Máy ảnh ghi cách cảm biến được cầm vào một cờ hướng EXIF và lưu các điểm ảnh theo một hướng cố định; trình xem đọc cờ hiển thị ảnh thẳng đứng, phần mềm bỏ qua cờ hiển thị nằm ngang.",
          "Vì vậy cùng một ảnh nhìn đúng trên điện thoại của bạn mà lại nằm ngang trong một công cụ web cũ hay một trình chỉnh ảnh: hai bên bất đồng về việc có tin cờ hay không. Trình duyệt giờ phần lớn tôn trọng cờ, có thể gây bối rối khi cùng file đó xoay bất ngờ sau khi tải xuống và mở lại ở nơi khác.",
          "Các công cụ xoay như công cụ này làm việc trên điểm ảnh thật và xuất một file có hướng đúng chuẩn, nên kết quả đúng ở mọi nơi bất kể phần mềm tiếp theo xử lý metadata ra sao. Sau một lần xoay có chủ đích, file không còn phụ thuộc vào cờ nữa.",
        ],
      },
      {
        heading: "Xử lý cục bộ và các thói quen xoay an toàn",
        paragraphs: [
          "Xoay chạy hoàn toàn trong trình duyệt của bạn: ảnh được giải mã, biến đổi và mã hóa lại trên thiết bị, không tải lên. Tài liệu, ảnh gia đình hay ảnh chưa phát hành được xoay mà chẳng cái nào đi đến máy chủ.",
          "Xoay từ bản gốc, lưu kết quả thành file mới, và giữ cả hai. Xoay góc tùy ý mã hóa lại ảnh, và chồng các thao tác như vậy — xoay, cắt, đổi kích thước, xoay tiếp — cộng dồn mất chất theo thế hệ hệt như lưu JPEG nhiều lần.",
          "Một thói quen nữa: lật và soi gương không phải là xoay. Ảnh được soi gương đảo trái và phải, điều này có ý nghĩa với chữ, logo và cảnh bất đối xứng dễ nhận ra. Nếu ảnh cần soi gương, hãy dùng công cụ nói rõ điều đó — đầu ra là một ảnh khác thật sự, không chỉ là bản đã xoay.",
        ],
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
    deepDive: [
      {
        heading: "Bo góc thật sự hoạt động thế nào",
        paragraphs: [
          "Ảnh vốn dĩ là hình chữ nhật, nên bo góc không phải thứ mà ảnh “có” — đó là độ trong suốt được khắc ra khỏi bốn góc. Việc bo dùng kênh alpha: điểm ảnh bên trong phần tư hình tròn giữ đặc, điểm ảnh bên ngoài thành trong suốt hoàn toàn, và vài điểm ảnh trên cung được trong suốt một phần để làm mượt đường cong.",
          "Đó là lý do đầu ra phải là PNG (hay WebP có alpha): JPG không thể lưu trong suốt, nên nó sẽ tô các góc đã khắc bằng một màu đặc và việc bo thành giả — một viền vuông trắng hay đen lộ rõ trên bất kỳ nền không khớp nào.",
          "Bán kính quyết định tính cách: bán kính nhỏ đọc như một nét hiện đại tinh tế, bán kính bằng nửa cạnh ngắn biến cả ảnh thành viên thuốc hay hình tròn. Khớp bán kính với các giá trị border-radius của hệ thiết kế giúp ảnh chụp màn hình đồng nhất với giao diện xung quanh.",
        ],
      },
      {
        heading: "Bo góc quan trọng ở đâu trong bố cục thật",
        paragraphs: [
          "Các hệ thiết kế bo gần như mọi thứ: thẻ, nút, avatar, ô ảnh. Một ảnh chụp màn hình vuông góc thả vào một thẻ bo tròn trông như hiện vật từ thời khác; bo ảnh chụp theo cùng bán kính khiến nó cảm giác thuộc về bố cục.",
          "Bài thuyết trình và tài liệu được lợi tương tự: ảnh chụp bo góc đọc như thiết kế có chủ đích, trong khi ảnh vuông đọc như dán thô. Vài điểm ảnh trong suốt còn cho nền trang hay slide hở qua, gắn ảnh với môi trường xung quanh.",
          "Trên mạng xã hội và nhắn tin, bo góc mượn độ uy tín từ giao diện ứng dụng — ảnh trông như đến từ một sản phẩm chỉn chu được coi trọng hơn những bản chụp thô mép cứng. Hiệu ứng nhỏ nhưng nhất quán.",
        ],
      },
      {
        heading: "Xử lý cục bộ và ghi chú quy trình",
        paragraphs: [
          "Việc bo chạy hoàn toàn trong trình duyệt của bạn: ảnh được giải mã, mặt nạ góc được áp, và PNG trong suốt được tạo ra trên thiết bị của bạn. Không gì được tải lên — điều đáng quan tâm khi các ảnh chụp màn hình được bo lộ công cụ nội bộ, dữ liệu khách hàng hay bối cảnh cá nhân.",
          "Chế độ hàng loạt xử lý trường hợp phổ biến: một bộ tài liệu nơi mọi ảnh chụp màn hình cần cùng bán kính. Áp một bán kính cho cả thư mục rồi tải kết quả về, thay vì gõ lại giá trị cho từng ảnh.",
          "Hãy giữ bản gốc vuông. Các điểm ảnh góc bị gỡ vĩnh viễn, nên nếu lựa chọn bán kính đổi sau này — một đợt cập nhật hệ thiết kế, một nền tảng khác — con đường duy nhất là bo lại từ nguồn chưa cắt, không phải từ bản đã bo.",
        ],
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
    deepDive: [
      {
        heading: "Chụp vào bộ nhớ tạm, rồi khoác áo mới",
        paragraphs: [
          "Một ảnh chụp màn hình hiếm khi là sản phẩm cuối: nó cần khung, bo góc, chỉnh màu hay kích thước trước khi khớp vào slide, báo cáo lỗi hay bài đăng mạng xã hội. Chụp thẳng vào khung chỉnh sửa gộp hai bước thành một — lấy vùng, chỉnh, tải xuống — thay vì nhảy giữa phím tắt hệ điều hành, trình chỉnh sửa và trình quản lý file.",
          "Khung viền là lớp hóa trang giá trị nhất cho ảnh chụp màn hình: một đường viền mảnh màu trung tính tách ảnh khỏi nền bất kỳ nơi nó rơi xuống, nhất là trên các trang có nền trắng trùng với nền ảnh chụp. Không viền, một ảnh nền trắng đơn giản là tan vào trang.",
          "Chú thích phai rất nhanh trong trí nhớ, nên thói quen quy trình có lời là chụp, hóa trang và lưu ngay — những ảnh chụp để nguyên dữ liệu bộ nhớ tạm thường mất bối cảnh, và chụp lại một trạng thái giao diện nhất thời (một dropdown đang mở, một tooltip đang hiện) có thể bất khả thi vài phút sau.",
        ],
      },
      {
        heading: "Vì sao ảnh chụp màn hình xứng đáng PNG không mất dữ liệu",
        paragraphs: [
          "Ảnh chụp màn hình là bức chân dung tiêu biểu cho PNG hơn JPG: chúng chứa màu phẳng, mép cứng và chữ — chính xác loại nội dung mà nén JPEG làm hỏng bằng quầng ringing quanh chữ và băng màu trong dải phẳng. Một JPG ảnh chụp trông bẩn ngấm; một PNG giống hệt từng điểm ảnh những gì trên màn hình.",
          "Nơi duy nhất JPG thắng là ảnh chụp của ảnh chụp: một bức ảnh hiển thị trên màn hình chứa chi tiết ảnh tự nhiên mà nén tốt. Với mọi thứ còn lại — cửa sổ, terminal, tài liệu, phần tử giao diện — khoản phí dung lượng của PNG mua về sự sạch nhìn thấy được.",
          "Nếu dung lượng quan trọng (một số biểu mẫu giới hạn ảnh chụp vài trăm KB), đòn bẩy trung thực là vùng chụp: cắt sát trước khi động vào cài chất lượng. Một PNG cắt sát cửa sổ liên quan vừa nhỏ hơn vừa hữu ích hơn một JPG toàn màn hình.",
        ],
      },
      {
        heading: "Những gì ở lại trên thiết bị của bạn",
        paragraphs: [
          "Ảnh chụp màn hình thường xuyên lộ bối cảnh riêng: dashboard nội bộ, tin nhắn cá nhân, tên file, tab trình duyệt, dữ liệu khách hàng. Tải một ảnh chụp lên dịch vụ chụp là gửi toàn bộ bối cảnh ấy đến máy chủ của người lạ — rủi ro được tránh hoàn toàn khi chụp và chỉnh sửa diễn ra cục bộ.",
          "Công cụ này chụp và xử lý ngay trong trình duyệt của bạn: điểm ảnh đến từ phiên màn hình của bạn, các bước hóa trang chạy trên thiết bị, và file được ghi thẳng vào đĩa. Không gì được truyền đi ở bất kỳ thời điểm nào.",
          "Một thói quen riêng tư đáng áp dụng: trước khi lưu bất kỳ ảnh chụp nào để chia sẻ, quét mép vùng chụp tìm bối cảnh vô tình — một màn hình thứ hai, một thông báo, một thanh địa chỉ. Chụp lại một khung sạch dễ hơn thu hồi một cú rò rỉ.",
        ],
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
    deepDive: [
      {
        heading: "Vì sao SVG phóng vô hạn còn định dạng raster thì không",
        paragraphs: [
          "Ảnh raster (JPG, PNG, WebP) là một lưới điểm ảnh cố định: phóng to thì lưới kéo giãn, nên mép nhòe và khối xuất hiện. SVG hoàn toàn không phải lưới — nó là một danh sách lệnh vẽ (đường thẳng, đường cong, hình, màu tô) mà bộ dựng tính lại ở bất kỳ kích thước nào được yêu cầu. Thu phóng 5000% và mọi mép vẫn sắc như dao vì các mép được vẽ lại, không phải được phóng.",
          "Đó là lý do logo, icon và biểu đồ là chất liệu SVG lý tưởng: hình khối hình học với màu phẳng sống sót hoàn hảo qua mô tả vector. Ảnh chụp là trường hợp ngược lại — một bức ảnh mô tả bằng vector hoặc là khổng lồ hoặc là bản xấp xỉ xấu, vì vậy các bộ chuyển ảnh-sang-SVG vẽ nét ảnh thành các hình cách điệu chứ không phải bản thể hiện đúng thật.",
          "SVG còn là văn bản: một file XML bạn có thể mở trong trình soạn thảo, quản lý phiên bản như code, và sửa màu hay đường dẫn bằng tay. Khả năng soi được ấy là một siêu năng lực thầm lặng — màu của một icon có thể đổi bằng một thuộc tính thay vì một lần xuất lại.",
        ],
      },
      {
        heading: "Raster sang SVG so với SVG sang raster: hai công việc khác hẳn nhau",
        paragraphs: [
          "Chuyển SVG sang raster là chụp đúng thật: bộ dựng vẽ các hình vector ở kích thước bạn chọn và điểm hóa kết quả. Hãy chọn đúng kích thước — PNG/JPG được vẽ ra bị đóng băng ở độ phân giải ấy và từ đó ứng xử như mọi ảnh raster khác.",
          "Chuyển raster sang SVG là diễn giải, không phải dịch thuật. Thuật toán vẽ nét xấp xỉ các vùng điểm ảnh bằng đường cong và vùng màu, nên đầu ra là một bản dựng cách điệu: tuyệt vời cho logo và đồ họa đơn giản cần khả năng co giãn, sai lầm cho bất cứ thứ gì phải nhìn giống từng điểm ảnh bức ảnh gốc.",
          "Chọn hướng theo nhu cầu: nếu nguồn vốn là vector và nền tảng đích chỉ nhận raster, hãy chuyển xuống và chọn kích thước rộng rãi cho màn hình retina. Nếu nguồn là một đồ họa đơn giản mắc kẹt trong PNG và bạn cần co giãn vô hạn hay file cực nhỏ, vẽ nét sang SVG là bước nâng cấp.",
        ],
      },
      {
        heading: "Ghi chú thực dụng và xử lý cục bộ",
        paragraphs: [
          "File SVG thường rất nhỏ — một icon mô tả bằng vài đường path có thể nặng một phần kilobyte so với hàng chục kilobyte của bản PNG tương đương. Với giao diện ngập icon, chênh lệch ấy nhân lên qua từng tài nguyên và từng lần tải trang.",
          "Một lưu ý tương thích: một số bề mặt hạn chế SVG vì nó có thể chứa script. Nếu một nền tảng chặn tải lên SVG, xuất một phiên bản PNG lớn là cách xử lý chuẩn — hãy tạo ở hai đến ba lần kích thước hiển thị để nó vẫn sắc trên màn hình mật độ cao.",
          "Chuyển đổi ở đây chạy hoàn toàn trong trình duyệt của bạn: dựng hình và vẽ nét diễn ra trên thiết bị, không có bước tải lên. Chuyển logo khách hàng, tài sản thương hiệu hay biểu đồ nội bộ chưa từng gửi chúng đến bất kỳ máy chủ nào.",
        ],
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
    deepDive: [
      {
        heading: "Chọn định dạng đích bằng điều gì phải sống sót",
        paragraphs: [
          "Chuyển đổi định dạng thực chất là câu hỏi về những thuộc tính nào quan trọng với đích đến. Hãy hỏi ba câu: nó có cần trong suốt không (PNG hay WebP là có, JPG là không), nội dung là ảnh chụp hay đồ họa (JPG/WebP cho ảnh, PNG cho chữ và mép cứng), và người nhận có chấp nhận định dạng đó không (một số nền tảng, CMS và phần mềm cũ chỉ nhận JPG và PNG).",
          "Hai ràng buộc thu hẹp lựa chọn rất nhanh. Nếu trong suốt phải sống sót, JPG bị loại ngay lập tức. Nếu file phải mở trong phần mềm xa lạ — một biểu mẫu, một máy in, Windows cổ của khách — JPG và PNG là hai canh bạc an toàn nhất, vì mọi hệ thống ảnh của những thập kỷ qua đều đọc được chúng.",
          "WebP chiếm vùng giữa hiệu quả: nhỏ hơn JPG ở cùng chất lượng, hỗ trợ trong suốt, nhưng có đuôi tương thích dài nhất. Mẫu thực dụng là chuyển sang WebP cho trang của chính bạn và sang JPG/PNG cho mọi nơi bạn không kiểm soát.",
        ],
      },
      {
        heading: "Chuyển đổi thật sự tốn gì",
        paragraphs: [
          "Chuyển giữa các định dạng mất dữ liệu là mã hóa lại: một JPG lưu lại thành WebP mất dữ liệu là vứt dữ liệu lần hai. Ở chất lượng cao tổn thất vô hình, nhưng xích các chuyển đổi mất dữ liệu — JPG sang WebP rồi về JPG — cộng dồn lỗi như mọi lần nén lặp lại. Hãy chuyển một lần, hướng thẳng vào định dạng cuối.",
          "Chuyển sang định dạng không mất dữ liệu luôn giữ thông tin so với nguồn: JPG sang PNG giữ mọi thứ JPG chứa, kể cả lỗi của nó, nhưng không mất thêm gì. File phình to vì không mất dữ liệu buộc phải ghi trung thực từng điểm ảnh.",
          "Chú ý trong suốt dọc đường ống: chuyển một ảnh có kênh alpha sang JPG lặng lẽ tô các vùng trong suốt bằng màu nền. Nếu kết quả hiện một hộp trắng hay đen không mong đợi, đó là kênh alpha bị dẹt hóa, không phải hỏng dữ liệu.",
        ],
      },
      {
        heading: "Chuyển hàng loạt và xử lý cục bộ",
        paragraphs: [
          "Kịch bản thực tế của một bộ chuyển đa dụng là một thư mục file lệch chuẩn: ảnh chụp màn hình PNG mà biểu mẫu muốn thành JPG, WebP tải về mà một trình chỉnh cũ không mở được, các lô hỗn hợp hướng đến một trình tải lên duy nhất. Chế độ hàng loạt áp một định dạng đích và một cài chất lượng cho cả thư mục.",
          "Sắp lô trước khi chuyển tiết kiệm công làm lại: các mục ảnh chụp có thể đi sang JPG, các mục đồ họa sang PNG, trong hai lượt thay vì một cài đặt thỏa hiệp duy nhất. Một lựa chọn phổ quát thường phục vụ nền tảng, không phải những bức ảnh.",
          "Mọi thứ chạy trong trình duyệt của bạn: giải mã, chuyển đổi và tải xuống diễn ra trên thiết bị, không tải lên. Chuyển tài sản khách hàng, thiết kế chưa phát hành hay kho lưu trữ cá nhân nghĩa là những file ấy chưa từng rời khỏi máy của bạn.",
        ],
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
    deepDive: [
      {
        heading: "Hình mờ có thể và không thể bảo vệ gì",
        paragraphs: [
          "Hình mờ là một răn đe và một ghi nguồn, không phải ổ khóa. Dấu nhìn thấy khiến trộm qua loa bớt hấp dẫn — ảnh bị cào có logo là vô dụng với ai muốn nhận công việc của người khác làm của mình — nhưng nó không chặn được cắt, phủ hay gỡ có chủ đích, và tự nó không chứng minh điều gì về tác quyền.",
          "Vị trí là cả trò chơi cho khả năng nhìn thấy: dấu ở góc bị cắt đi dễ dàng, trong khi dấu lặp lại hay căn giữa sống sót qua cắt nhưng thay đổi ảnh nhiều hơn. Dùng biên tập và xem trước nghiêng về dấu góc với giả định trung thực rằng người mua nhận bản sạch; bảo vệ ảnh chỉ chia sẻ nghiêng về vị trí xâm nhập hơn.",
          "Độ đậm là núm còn lại: quá tinh tế thì dấu biến mất trên nền rối, quá mạnh thì nó làm mất giá chính bản xem trước mà nó định quảng bá. Khoảng 40–60% độ đậm với màu tương phản với phần lớn ảnh là vùng làm việc thường dùng.",
        ],
      },
      {
        heading: "Dấu chữ so với logo ảnh",
        paragraphs: [
          "Hình mờ chữ nhanh và linh hoạt — gõ một tên, một handle hay một dòng bản quyền rồi chỉnh cỡ và vị trí. Điểm yếu là thiếu cá tính: dấu chữ trơn dễ bắt chước, nên hình mờ chữ ghi nguồn nhưng gần như không xây thương hiệu.",
          "Hình mờ bằng ảnh (một logo PNG có trong suốt) mang bản sắc thương hiệu và sống sót qua đổi định dạng — ai sao chép ảnh đã đóng mờ là sao chép luôn logo của bạn. Nó đòi một tài sản chuẩn bị sẵn, nhưng tài sản ấy khi đó đóng mờ cả một lô trong một lượt.",
          "Với công việc hàng loạt, sự nhất quán quan trọng hơn sự kết hợp: cùng vị trí, cùng độ đậm, cùng kích thước trên mọi ảnh. Một portfolio đóng mờ trông chuyên nghiệp khi dấu dự đoán được, và nghiệp dư khi nó nhảy loạn qua từng khung.",
        ],
      },
      {
        heading: "Xử lý cục bộ bảo vệ các bản gốc sạch",
        paragraphs: [
          "Đóng mờ nghĩa là đưa cho công cụ những ảnh đẹp nhất, chưa đóng mờ của bạn — chính những tài sản bạn nhất quyết muốn tránh xa máy chủ của người khác. Một dịch vụ đóng mờ dựa trên tải lên nhận bản gốc sạch của bạn ở đầy đủ độ phân giải, đảo ngược toàn bộ ý nghĩa của việc làm này.",
          "Công cụ này xử lý hoàn toàn trong trình duyệt của bạn: ảnh gốc và tài sản hình mờ được hợp thành cục bộ, và đầu ra được ghi vào đĩa của bạn. Bản sạch chưa từng rời khỏi thiết bị, nên chỉ bản đã đánh dấu mới tồn tại bên ngoài nó.",
          "Giữ các bản gốc chưa đóng mờ một cách riêng biệt và cẩn thận: nếu bao giờ cần đóng mờ lại ở kích thước hay vị trí mới, bản gốc sạch là nguồn duy nhất. Và đừng bao giờ vô tình công bố bản sạch — phần lớn rò rỉ của ảnh được bảo vệ đến từ bản chưa bảo vệ, không phải từ ai đó tẩy dấu.",
        ],
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
    deepDive: [
      {
        heading: "Vì sao WebP tồn tại và nó thắng ở gì",
        paragraphs: [
          "WebP được Google tạo ra để giải một vấn đề cụ thể: JPEG đã ba thập kỷ tuổi và các file không mất dữ liệu của PNG thì lớn. WebP nén tốt hơn ở cả hai mặt — chế độ mất dữ liệu dùng các kỹ thuật mã hóa video VP8, còn chế độ không mất dữ liệu thường thắng PNG — đồng thời hỗ trợ trong suốt và hoạt ảnh, điều JPEG không làm được.",
          "Khoản thắng thực dụng là trọng lượng trang. Ảnh mã hóa WebP ở chất lượng tương đương về thị giác thường nhỏ hơn JPEG hàng chục phần trăm. Trên một trang nhiều ảnh, điều đó dịch thẳng thành tải nhanh hơn, băng thông ít hơn và điểm Core Web Vitals tốt hơn — lý do đa số trang lớn giờ phục vụ WebP cho các trình duyệt đủ sức.",
          "Điểm hề luôn là hỗ trợ. WebP chạy trên mọi trình duyệt hiện đại, nhưng một số ứng dụng gốc, hệ điều hành cũ, một số trình chỉnh ảnh và nhiều cài đặt CMS vẫn từ chối nó — chính vì vậy chuyển WebP thành JPG hay PNG vẫn là nhu cầu phổ biến và thực tế.",
        ],
      },
      {
        heading: "Chuyển ra khỏi WebP: kỳ vọng gì",
        paragraphs: [
          "Nếu WebP của bạn được lưu ở chế độ mất dữ liệu, chuyển sang JPG là mã hóa lại dữ liệu đã nén: mất chất thường nhỏ ở cài cao, nhưng đi qua nhiều định dạng mất dữ liệu thì cộng dồn lỗi, nên hãy chuyển một lần và giữ kết quả.",
          "Chuyển sang PNG cho ra file không mất dữ liệu sẽ lớn hơn WebP đáng kể — thường gấp nhiều lần với ảnh chụp. Đó không phải lỗi: PNG trả tiền cho độ chính xác từng điểm ảnh, và là lựa chọn đúng khi bạn cần trong suốt hay định chỉnh ảnh tiếp.",
          "Nguyên tắc cầm tay: JPG cho nội dung ảnh chụp đi đến việc chia sẻ hay biểu mẫu không nhận WebP; PNG cho đồ họa, ảnh chụp màn hình, ảnh trong suốt và bất cứ thứ gì sẽ được chỉnh tiếp. Chú ý dung lượng đầu ra sau chuyển đổi — nếu PNG phình to, nguồn là ảnh chụp và JPG có lẽ là đích tốt hơn.",
        ],
      },
      {
        heading: "Chuyển đổi cục bộ và ghi chú quy trình",
        paragraphs: [
          "Bộ chuyển này giải mã WebP và mã hóa lại thành định dạng bạn chọn hoàn toàn trong trình duyệt — không tải lên, không hàng đợi, không chờ một chuyến đi máy chủ. File chưa từng rời khỏi thiết bị của bạn, điều quan trọng với thiết kế chưa phát hành, tài sản khách hàng hay ảnh cá nhân.",
          "Chế độ hàng loạt khớp kịch bản phổ biến: bạn tải một bộ WebP từ một trang hay bản bàn giao thiết kế, và một công cụ phía sau — một CMS, một chợ trực tuyến, một dịch vụ in — chỉ nhận JPG hay PNG. Chuyển cả thư mục một lần thay vì vật lộn với từng file.",
          "Giữ bản WebP gốc khi còn nghi ngờ. Nếu nguồn là WebP mất dữ liệu, nó vốn đã là phiên bản chất lượng tốt nhất bạn có; mọi chuyển đổi chỉ có thể đi xuống từ đó, nên bản gốc là lưới an toàn mã hóa lại của bạn.",
        ],
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
    deepDive: [
      {
        heading: "Ánh xạ hoa-thường không đơn giản như vẻ ngoài",
        paragraphs: [
          "Chữ hoa và chữ thường là các thuộc tính Unicode, và vài ngôn ngữ phá vỡ giả định một-một ngây thơ. Ví dụ nổi tiếng nhất là tiếng Thổ Nhĩ Kỳ: chữ i không dấu (ı) hóa hoa thành I, và I hóa thường thành ı, không phải i — vì vậy phần mềm từng phát hành một lỗi được đặt biệt danh “vấn đề Turkish I”. Chữ ß tiếng Đức không có dạng hoa truyền thống; đa số phần mềm ánh xạ nó thành hai chữ SS, và dù Unicode đã thêm ẞ hoa vào năm 2008, từ điển và văn bản vẫn chuộng SS.",
          "Các chữ có dấu như é, ñ, ü chuyển sạch sẽ vì chúng là một điểm mã duy nhất, nhưng một chữ viết dạng e kèm dấu ghép thì chuyển thành hai ký tự, và dấu không đổi hoa-thường. Chữ sigma cuối của tiếng Hy Lạp là trường hợp đặc biệt khác: Σ cuối từ ánh xạ thành ς chứ không phải σ trong xử lý văn bản đúng chuẩn.",
          "Công cụ này chuyển từng chữ theo quy tắc Unicode chuẩn và giữ dấu nguyên vẹn, nên văn bản châu Âu sống sót qua các vòng hoa-thường hai chiều. Nó không triển khai riêng quy tắc bản địa Thổ Nhĩ Kỳ — một bộ bản địa hóa hiểu ngôn ngữ mới làm — nhưng nó không bao giờ âm thầm làm rơi hay làm hỏng một ký tự kiểu như các script chỉ biết ASCII.",
        ],
      },
      {
        heading: "Title Case và quy tắc chữ nhỏ",
        paragraphs: [
          "Kiểu tít báo tiếng Anh viết thường các từ chức năng ngắn — mạo từ như a và the, giới từ ngắn như of, in và to, liên từ kết hợp như and và but — trừ khi chúng là từ đầu hay từ cuối của tiêu đề. Danh sách từ chính xác khác nhau giữa các cẩm nang phong cách: giới hạn của AP ngắn hơn, Chicago viết thường nhiều giới từ bất kể độ dài. Đa số công cụ web nhúng cứng một danh sách; công cụ này theo quy ước biên tập phổ biến là giữ mạo từ và giới từ ngắn ở dạng thường giữa tiêu đề.",
          "Quy tắc này thực sự xoay quanh tiếng Anh. Trong tiếng Tây Ban Nha và Pháp, tiêu đề thường giữ viết hoa kiểu câu bình thường, nên áp Title Case tiếng Anh cho một cụm tiếng Pháp cho ra thứ bản địa đọc là sai. Tiếng Đức viết hoa danh từ thay vào đó. Sentence case là mặc định an toàn cho văn bản đa ngôn ngữ — vì vậy công cụ này cũng viết hoa lại sau các dấu câu dạng đầy đủ, nên một câu tiếng Trung kèm câu tiếng Anh được xử lý đúng.",
          "Khi phân vân về phong cách tòa soạn, hãy đọc cẩm nang bạn đang viết theo và coi đầu ra công cụ là điểm khởi đầu. Một tiêu đề một từ như “The Shining” minh họa quy tắc biên: the đứng đầu nên giữ hoa dù giữa tiêu đề nó sẽ ở dạng thường.",
        ],
      },
      {
        heading: "Các kiểu lập trình viên và những gì giữ cục bộ",
        paragraphs: [
          "camelCase, PascalCase, snake_case, kebab-case và CONSTANT_CASE tồn tại vì mỗi ngôn ngữ có quy ước định danh khác nhau: JavaScript và Java nghiêng về camelCase, Python chuộng snake_case, tên thuộc tính CSS và HTML dùng kebab-case. Chuyển giữa chúng không chỉ là bỏ khoảng trắng — công cụ tách các biên camelCase như parseHTMLValue thành từ riêng trước, nên đầu ra không dính một từ viết tắt vào từ kế tiếp.",
          "Dấu câu, chữ số và ký tự CJK đi qua các kiểu code nguyên vẹn: ký tự tiếng Trung không có dạng hoa, và hoa-luân phiên chỉ lật chữ Latin, giữ nguyên bố cục ký hiệu. Nhờ đó đầu ra dự đoán được khi bạn dán nội dung trộn như “item-2: done”.",
          "Mọi thứ chạy trong trình duyệt của bạn bằng JavaScript thuần. Văn bản của bạn chưa từng rời khỏi trang — không gọi máy chủ, không mẹo clipboard, không gì để rò rỉ. Chuyển bản nháp độc quyền, định danh nội bộ hay tên khách hàng an toàn như dán vào trình soạn thảo của chính bạn.",
        ],
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
    deepDive: [
      {
        heading: "Ký tự so với cụm grapheme",
        paragraphs: [
          "Từ “ký tự” giấu một cái bẫy: thứ người dùng cảm nhận là một ký tự không phải lúc nào cũng là một đơn vị mã. Emoji có tông da, cờ và tổ hợp gia đình, chữ có dấu viết dạng gốc kèm dấu ghép, và các chữ ghép Devanagari — tất cả là một ký tự trong mắt nhưng nhiều điểm mã trong chuỗi.",
          "Vì vậy các bộ đếm nghiêm túc báo hai con số: đơn vị mã (cái mà thuộc tính length của JavaScript đếm, và cái đa số giới hạn nền tảng từng đo) và cụm grapheme (cái con người thấy). Khoảng cách là thật — một emoji cờ là 1 cụm nhưng 4 đơn vị mã UTF-16.",
          "Với mục đích thực dụng: các nền tảng mạng xã hội giờ thường đếm gần với cụm grapheme hơn, trong khi các biểu mẫu cũ và cơ sở dữ liệu đếm đơn vị mã. Khi giới hạn nằm ở biên, chiến lược an toàn là để dư bằng số emoji trong văn bản của bạn.",
        ],
      },
      {
        heading: "Đọc đúng các giới hạn cứng",
        paragraphs: [
          "Giới hạn ký tự hiếm khi thương lượng được, nhưng đo được: đoạn SMS 160 ký tự (70 khi bất kỳ ký tự ngoài GSM xuất hiện, khiến giá mỗi đoạn tăng gấp đôi), bio nền tảng, mục tiêu mô tả meta khoảng 150–160 ký tự, tiêu đề meta khoảng 50–60. Biết chế độ nào áp dụng cho văn bản của bạn hơn là đoán mò.",
          "Trường hợp SMS xứng đáng được chú ý vì nó trừng phạt nặng nhất: một chữ có dấu hay một emoji lật toàn bộ tin nhắn sang một bảng mã khác và gần như giảm một nửa số ký tự mỗi đoạn. Một tin nhắn vừa một đoạn khi là tiếng Anh gõ thường có thể thành ba đoạn chỉ với một emoji trái tim.",
          "Bộ đếm còn giúp chiều ngược lại: khi viết cho một mức tối thiểu — câu trả lời luận 300 ký tự, mức sàn mô tả sản phẩm — theo dõi số đếm trực tiếp xóa bỏ sự nhàm chán của việc đếm tay và rủi ro nộp dưới giới hạn.",
        ],
      },
      {
        heading: "Đếm cục bộ cho bản nháp riêng tư",
        paragraphs: [
          "Việc đếm diễn ra hoàn toàn trong trình duyệt của bạn: văn bản được phân tích bằng JavaScript cục bộ và không bao giờ được truyền đi. Nhờ đó phù hợp với bản thảo chưa xuất bản, email mật, thư ứng tuyển và bất cứ thứ gì bạn không muốn dán vào một dịch vụ web xa lạ.",
          "Bộ đếm cập nhật theo từng phím bấm thay vì theo lần nộp, nên quy trình là liên tục: gõ, liếc con số, chỉnh. Không có nút để bấm và không có vòng đi máy chủ để chờ.",
          "Một thói quen đáng áp dụng: đếm phiên bản cuối, không chỉ các bản nháp. Chỉnh sửa, nhất là dán từ nguồn khác, thay đổi độ dài âm thầm, và phiên bản bạn thực nộp mới là phiên bản có số đếm quan trọng.",
        ],
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
    deepDive: [
      {
        heading: "Emoji thực sự hoạt động thế nào dưới mui xe",
        paragraphs: [
          "Emoji không phải ảnh — chúng là các điểm mã Unicode được vẽ bởi font mà nền tảng cung cấp. Cùng điểm mã U+1F600 vẽ thành một khuôn mặt cười hơi khác trên iOS, Android và Windows, vì vậy một emoji trông hoàn hảo trên điện thoại của bạn có thể trông lạ trong ảnh chụp của đồng nghiệp.",
          "Các bộ điều chỉnh mở rộng tập hợp: bộ điều chỉnh tông da là các điểm mã ghép thay đổi ký tự gốc đứng trước, chuỗi ZWJ (ký tự nối độ rộng không) dán nhiều emoji thành một — các tổ hợp gia đình và nghề nghiệp — còn bộ chọn biến thể quyết định giữa hiển thị kiểu chữ và kiểu màu. Một emoji nhìn qua tưởng đơn giản có thể là chuỗi năm điểm mã.",
          "Vì vậy tìm kiếm và sao chép an toàn hơn tự ghép tay: bảng chọn cung cấp chuỗi đầy đủ và đúng, trong khi chuỗi ghép tay là nguồn phổ biến của emoji hỏng hiển thị thành hai khuôn mặt riêng hay một hộp trống.",
        ],
      },
      {
        heading: "Chọn và dùng emoji có chủ đích",
        paragraphs: [
          "Emoji hoạt động tốt nhất như dấu câu cho sắc thái, không phải thay thế từ: một biểu tượng giơ ngón cái đúng chỗ khép lại tin nhắn một cách ấm áp, trong khi một đoạn ngập biểu tượng đọc như nhiễu. Bối cảnh chuyên nghiệp thưởng cho sự tiết chế — một hoặc hai cái mỗi tin nhắn giữ được tín hiệu.",
          "Chú ý sự trôi nghĩa giữa các nền tảng: một số emoji mang nghĩa phụ thay đổi theo cộng đồng và vùng miền, và một ít cái được đọc phổ biến là điều khác giá trị bề mặt. Khi phân vân trong bối cảnh trang trọng hay quốc tế, hãy chọn phương án nghĩa đen không mơ hồ.",
          "Sao chép-dán là tương tác lõi vì các chuỗi emoji dễ vỡ khi sửa: xóa một điểm mã giữa chuỗi ZWJ làm vỡ cả glyph. Sửa quanh emoji dễ nhất là gõ lại văn bản xung quanh rồi dán emoji mới tinh.",
        ],
      },
      {
        heading: "Xử lý cục bộ và độ phủ Unicode",
        paragraphs: [
          "Bảng chọn chạy hoàn toàn trong trình duyệt của bạn: tìm kiếm, phân loại và sao chép diễn ra cục bộ dựa trên dữ liệu tên Unicode được nhúng sẵn. Không gì bạn tìm hay sao chép được truyền đi, điều quan trọng khi soạn tin nhắn riêng hay tài liệu công việc nhạy cảm.",
          "Tìm kiếm hoạt động trên tên và từ khóa, nên kết quả tốt đúng bằng chất lượng đặt tên: “cười”, “lửa”, “ngôi sao” ra đúng kết quả hiển nhiên, còn emoji ít được đặt tên cần duyệt theo danh mục. Các nhóm duyệt — mặt cười, động vật, đồ ăn, vật thể, biểu tượng — phản chiếu cách chuẩn Unicode tổ chức tập hợp.",
          "Vì emoji là văn bản, mọi thứ bạn sao chép được dán như văn bản: hoạt động trong bất kỳ ô nào nhận Unicode, từ email đến chú thích code. Nếu một đích đến hiện hộp rỗng, thiết bị hay font đó chỉ đơn giản là thiếu emoji mới hơn — điểm mã đúng ngay cả khi hiển thị sai.",
        ],
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
    deepDive: [
      {
        heading: "Đây không phải font — chúng là các ký tự đồng dạng",
        paragraphs: [
          "Các kiểu đậm, nghiêng và thư pháp mà công cụ này tạo ra không phải thay đổi font. Chúng ánh xạ chữ của bạn sang các điểm mã Unicode chuyên dụng trong khối Ký hiệu Chữ-số Toán học (khoảng U+1D400–U+1D7FF), được thêm cho ký hiệu toán để một chữ A đậm trong công thức có thể phân biệt với chữ A thường. Văn bản của bạn giữ nguyên kích thước và font không bao giờ đổi — bạn đang chuyển sang các ký tự khác vốn chỉ trông giống chữ được tạo kiểu.",
          "Phép ánh xạ ấy giải thích cả phép màu lẫn giới hạn. Nó hoạt động trong bất kỳ ô văn bản nào — bio Instagram, biệt danh chat, tiêu đề YouTube — vì không cần cài font. Nhưng bảng chữ cái ấy không đầy đủ: không có chữ số đậm ghép cho mọi kiểu, không có ı không dấu trong bộ nghiêng (nó ánh xạ thành i có dấu — kẻ thù của tiếng Thổ), và các glyph thiếu rơi về chữ thường, tạo ra những chuỗi nửa-lạ-vặt mà mọi người than phiền.",
          "Các nhà toán học dùng những điểm mã này cho ngữ nghĩa thật — 𝔸 có thể nghĩa là “tập hợp A” trong một bài báo. Dùng chúng để trang trí chiếm đoạt ký hiệu mà trình đọc màn hình và công cụ tìm kiếm đọc theo nghĩa đen, và điều đó dẫn đến điểm tiếp theo.",
        ],
      },
      {
        heading: "Chỗ văn bản kỳ ảo gãy đổ",
        paragraphs: [
          "Unicode trang trí hỏng ở những chỗ dự đoán được. Trình đọc màn hình đọc 𝕭𝖔𝖑𝖉 thành một loạt ký tự đậm toán học, nghe như vô nghĩa thay vì “đậm” — một vấn đề khả năng tiếp cận cho mọi người theo dõi dựa vào công cụ hỗ trợ. Máy tìm kiếm khớp với chữ thường, nên một hồ sơ hay tiêu đề viết bằng ký tự kỳ ảo có thể trở thành không tìm được theo chính tên của nó.",
          "Dán vào các hệ thống lọc đầu vào có thể lặng lẽ gỡ các ký tự về chữ thường hoặc từ chối chúng. Cơ sở dữ liệu với bảng mã cũ, SMS (không có chữ GSM cho những điểm mã này), và các terminal cũ đều làm hỏng chúng. Và vì mỗi glyph đến từ font toán, chất lượng hiển thị chênh lệch: trên một số thiết bị chữ ổn, trên một số khác độ đậm nét xung đột với văn bản xung quanh.",
          "Hãy dùng văn bản kỳ ảo nơi người đọc nhìn thấy nó và không ai cần tìm kiếm, đọc to hay xử lý nó: tên hiển thị, chú thích thẩm mỹ, poster sự kiện. Giữ tên người dùng mà người ta sẽ tìm kiếm, và toàn bộ nội dung quan trọng, bằng chữ thường ngày.",
        ],
      },
      {
        heading: "Tức thì, offline, và đảo ngược được",
        paragraphs: [
          "Chuyển đổi là một tra cứu bảng theo từng ký tự chạy trong trình duyệt của bạn — không máy chủ, không gọi mạng, và hoạt động cả khi không có kết nối. Gõ, so sánh các kiểu cạnh nhau, sao chép kiểu bạn muốn.",
          "Vì đầu ra là văn bản Unicode thường, nó sống sót qua mọi trình soạn thảo, và có thể đảo ngược: dán chuỗi kỳ ảo trở lại và đầu ra thuần của công cụ (hay bất kỳ bộ chuẩn hóa nào) khôi phục các chữ gốc. Không gì được lưu ở đâu trong lúc đó.",
          "So với các ứng dụng “font generator” đòi cài hồ sơ hay tải font về, cách tiếp cận này không có gì để cài và không có gì phải tin — bạn thấy gì trong bản xem trước thì chính xác cái đó rơi sang bên kia clipboard.",
        ],
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
    deepDive: [
      {
        heading: "Khớp literal so với biểu thức chính quy",
        paragraphs: [
          "Có hai chế độ khớp khác nhau căn bản. Chế độ literal coi chuỗi tìm kiếm là văn bản thuần: tìm “3.5” tìm đúng “3.5” và không bao giờ ra “335” hay “365”. Chế độ biểu thức chính quy coi mẫu là ngữ pháp: dấu chấm nghĩa là “ký tự bất kỳ”, nên cùng mẫu đó khớp 3.5, 3x5 và 395. Chọn sai chế độ là nguyên nhân phổ biến nhất của kiểu “thay thế làm gì đó kỳ lạ”.",
          "Biểu thức chính quy đáng cái sự phức tạp khi bạn cần cấu trúc chứ không phải chuỗi: khớp bất kỳ năm bốn chữ số bằng \\d{4}, bắt một cái tên và tái sử dụng trong phần thay thế bằng ngoặc và tham chiếu ngược, hay nhắm một giá trị chỉ khi nó đi sau một nhãn cụ thể bằng lookaround. Nếu bạn chỉ cần đổi một chuỗi cố định, chế độ literal dễ suy luận hơn và không thể khớp thừa.",
          "Quy trình an toàn cho mọi phép thay thế không tầm thường: chạy tìm kiếm trước với việc thay bị tắt và đọc từng kết quả, rồi mới bật thay thế. Nếu số khớp khiến bạn bất ngờ, mẫu rộng hơn bạn nghĩ — siết nó trước khi thay, không phải sau.",
        ],
      },
      {
        heading: "Những cái bẫy kinh điển của thay thế",
        paragraphs: [
          "Độ nhạy hoa-thường lặng lẽ nhân đôi hay chia đôi số khớp của bạn: “Apple” và “apple” là hai chuỗi khác nhau ở chế độ nhạy hoa-thường, thường là điều bạn muốn với code và không phải điều bạn muốn với văn xuôi. Khớp nguyên từ tồn tại để “con mèo” không khớp bên trong “mèo con” — không có nó, một phép thay ngây thơ có thể tạo ra “phần mềđoàn”.",
          "Chuỗi thay thế có những cái bẫy riêng: ở chế độ regex, một $ hay dấu gạch chéo trong văn bản thay thế có thể bị diễn giải là tham chiếu nhóm hay ký tự thoát. Viết một số tiền đô la thật vào phần thay regex cần thoát dấu đô la, nếu không nó có thể kéo vào một nhóm bắt bạn không định.",
          "Văn bản nhiều dòng thêm câu hỏi xuống dòng: các mẫu nhìn ổn trên một dòng có thể khớp tràn qua nhiều dòng vì dấu chấm có thể nuốt cả xuống dòng tùy cờ. Neo mẫu vào biên từ hay cấu trúc dòng tường minh là cách trị đáng tin.",
        ],
      },
      {
        heading: "Mọi thứ diễn ra trên trang",
        paragraphs: [
          "Khớp và thay chạy hoàn toàn bằng JavaScript trong trình duyệt trên văn bản đang nằm trong ô. Không tải lên, không dịch vụ xem trước, không chỉ mục phía máy chủ cho nội dung của bạn — một bản nháp hợp đồng, file log hay ghi chú cá nhân được xử lý bởi chính máy hiển thị nó.",
          "Điều đó khiến công cụ là lựa chọn hợp lý cho văn bản bạn không muốn dán vào một ứng dụng web xa lạ: tài liệu nội bộ, dữ liệu khách hàng cần lau nhanh, mã nguồn sắp commit. Đóng tab là không còn gì.",
          "Với file rất lớn, công cụ trình duyệt cuối cùng chạm giới hạn bộ nhớ — log nửa megabyte dễ chịu, dump một gigabyte thì không. Ở thang đó, sed dòng lệnh vẫn là công cụ đúng; với mọi thứ dưới vài megabyte, trang này mở nhanh hơn cả một terminal.",
        ],
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
    deepDive: [
      {
        heading: "Hai nghìn năm Cicero bị xáo trộn",
        paragraphs: [
          "Văn bản đổ chỗ không phải tiếng Latinh bịa ra — nó là tiếng Latinh bị làm hỏng. Các từ đến từ “De finibus bonorum et malorum” (Về cực hạn của Thiện và Ác), một luận thuyết triết học Cicero viết năm 45 TCN, các đoạn 1.10.32–33. Đoạn văn bàn về nỗi đau và khoái cảm; ở đâu đó trong thời kỳ dàn trang, ai đó đã xáo trộn và cắt cụt nó thành “Lorem ipsum dolor sit amet, consectetur adipiscing elit…” — những từ không còn tạo thành câu Latinh mạch lạc nào.",
          "Lịch sử phổ biến ghi công các tấm decal khô Letraset thập niên 1960 — nơi nhà thiết kế chà văn bản tít in sẵn lên bản vẽ — với việc lan tỏa đoạn văn này; phần mềm dàn trang Aldus mang nó vào xuất bản kỹ thuật số thập niên 1980. Nó sống sót vì nó đã có mặt khắp nơi — tương đương placeholder của một chuẩn ren ốc vít.",
          "Một chi tiết đa số người bỏ sót: độ dài từ và phân bố chữ của văn bản gần như tự nhiên-Latinh, chính là điều bạn muốn ở văn đổ chỗ — một bố cục trụ được với văn giả thường trụ được với bản chép thật cùng độ dài. “Ở đây chèn vài chữ” không có tính chất ấy.",
        ],
      },
      {
        heading: "Vì sao văn đổ chỗ thắng văn bản trông thật",
        paragraphs: [
          "Văn bản thật — một đoạn trích báo, một đoạn văn của bạn bè — mời người duyệt đọc, và đọc mời phê bình nội dung: “tôi sẽ không diễn đạt thế này”. Tiếng Latinh vô nghĩa có đúng thuộc tính ngược lại: nó nhìn như ngôn ngữ, chiếm chỗ như ngôn ngữ, nhưng không mang nghĩa nào để cãi. Người duyệt đánh giá bố cục, typography và nhịp điệu thay vì nội dung.",
          "Kiểm soát độ dài quan trọng hơn đa số người tưởng. Một trang được duyệt với 200 từ đổ chỗ sẽ tràn ngay khi bản chép thật chạy tới 300; tạo các khối đúng kích thước bạn thực sự mong đợi — một teaser thẻ hai dòng, một đoạn năm câu — thử bố cục trước biến động thật, không phải một khối may mắn.",
          "Quy ước còn có chức năng giao tiếp: mọi người trong thiết kế và xuất bản nhận ra lorem ipsum ngay lập tức, nên một bản mock ngập nó đọc như “bố cục đang chờ” mà không cần một ghi chú nào.",
        ],
      },
      {
        heading: "Tạo ngay tại chỗ, không gửi đi đâu",
        paragraphs: [
          "Bộ tạo dựng các đoạn văn từ một danh sách từ lorem-ipsum đóng gói sẵn, xáo trộn mới mỗi lần bạn bấm — các từ truy nguồn về Cicero, nhưng trình tự được tạo cục bộ, không phải lấy từ một API lorem-ipsum. Không gì rời khỏi trình duyệt, và công cụ chạy offline.",
          "Sự biến thiên là có chủ đích: bấm lặp lại cho ra văn bản khác nhau, nên hai bản mock cạnh nhau không mang cùng văn đổ chỗ — một lợi thế thực tế nhỏ khi so sánh bố cục. Phiên bản bắt đầu bằng “Lorem ipsum” có sẵn khi bạn muốn câu mở đầu kinh điển.",
          "Mẹo thực dụng khi bàn giao: khi giao thiết kế, hãy nói bằng văn bản với khách hàng rằng văn bản là placeholder. Tai nạn lorem-ipsum tái diễn nhất là văn đổ chỗ vô tình lên production — một công ty dịch thuật từng nổi tiếng in nó vào cuốn brochure của khách.",
        ],
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
    deepDive: [
      {
        heading: "Cái gì tính là trùng phụ thuộc quy tắc so sánh",
        paragraphs: [
          "Phát hiện trùng lặp là một quyết định so sánh, và ba quyết định thay đổi kết quả. Khớp chính xác: “data” và “data” là trùng, nhưng “data ” (có khoảng trắng cuối) và “Data” (viết hoa) thì không. Khớp bỏ-trim-và-không-phân-hoa-thường coi “Data ” và “data” là cùng một dòng — thường là điều bạn muốn khi đầu vào đến từ copy-paste hay xuất biểu mẫu, nơi khoảng trắng vô hình len lỏi liên tục.",
          "Còn một quyết định ngữ nghĩa: giữ lần xuất hiện đầu hay cuối? Với log và ID, giữ-lần-đầu bảo toàn thứ tự đến ban đầu. Với bảng giá nơi hàng sau cập nhật hàng trước, giữ-lần-cuối là lựa chọn đúng. Công cụ này giữ lần xuất hiện đầu và bảo toàn thứ tự dòng, khớp kỳ vọng khử trùng lặp của đa số.",
          "Một bẫy liên quan là ký tự vô hình: tab, khoảng trắng không ngắt và ký tự độ rộng không khiến hai dòng nhìn giống hệt lại khác nhau. Nếu khử trùng chạy sạch mà bạn vẫn thấy trùng, hãy chạy dọn khoảng trắng trước — công cụ remove-extra-spaces trên trang này tồn tại chính xác cho bước đó.",
        ],
      },
      {
        heading: "Vì sao khử trùng lặp trước khi sắp và đếm",
        paragraphs: [
          "Khử trùng lặp thường là bước tiền xử lý, không phải đích đến. Trước khi đếm giá trị duy nhất, hãy khử trùng — nếu không bộ đếm đếm lần lặp hai lần. Trước khi sắp, hãy khử trùng — sắp một danh sách với hàng nghìn dòng giống hệt nhau lãng phí sự chú ý của người đọc và mọi tham chiếu số dòng phía sau. Trước khi tạo import CSV hay danh sách IN của SQL, hãy khử trùng — khóa trùng ở đó gây lỗi hoặc xử lý đôi trong im lặng.",
          "Trình tự dọn dữ liệu kinh điển là: chuẩn hóa khoảng trắng, rồi khử trùng, rồi sắp, rồi biến đổi. Làm ngược lại (sắp trước, khử trùng sau) vẫn chạy nhưng làm diff so với phiên bản trước ồn ào: mọi bản trùng bị gỡ hiện như những phép xóa rải rác thay vì một khối gọn gàng.",
          "Với các kho văn bản — danh sách từ khóa, người nhận email, kho tag — khử trùng lặp còn là công cụ đúng đắn: một người nhận trùng bị mail hai lần, một tag trùng làm lệch phân tích tần suất. Một cú bấm ở đây thắng cả chuỗi công thức bảng tính.",
        ],
      },
      {
        heading: "Xử lý cục bộ, thứ tự được giữ",
        paragraphs: [
          "Toàn bộ danh sách được xử lý bằng JavaScript trong trình duyệt: tách theo xuống dòng, so sánh, phát các dòng duy nhất theo thứ tự xuất hiện đầu. Không tải lên, không vòng máy chủ, và công cụ chạy offline sau khi trang tải xong.",
          "Đầu vào lớn là chuyện nhỏ — hàng trăm nghìn dòng xử lý trong chưa đầy một giây trên máy thường, vì so sánh là tra cứu hash-set theo từng dòng, không phải quét từng cặp. So sánh từng cặp mới là thứ khiến khử trùng ngây thơ chậm ở quy mô lớn; công cụ này không làm vậy.",
          "Không gì được lưu: refresh trang là đầu vào biến mất. Với danh sách khách hàng, kho ID nội bộ hay bất kỳ tập dữ liệu có dữ liệu cá nhân, đó là hình dạng công cụ an toàn cần có — dữ liệu chưa từng thành mục nhật ký của người khác.",
        ],
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
    deepDive: [
      {
        heading: "Vì sao khoảng trắng vô hình là lỗi văn bản phổ biến nhất",
        paragraphs: [
          "Khoảng trắng thừa hiếm khi tự tuyên bố. Một khoảng đôi sau dấu chấm, một khoảng trắng cuối dòng, một tab ngụy trang thành thụt lề — tất cả vô hình trong trình soạn thảo, tất cả thật trong dữ liệu. Chúng làm gãy so sánh theo dòng (hai dòng “giống hệt” chênh nhau một khoảng cuối), làm gãy số đếm token (một khoảng đôi có thể thêm một từ ma), và tạo ra cú khớp chuỗi thất bại kinh điển nơi hai giá trị nhìn như nhau mà so ra khác.",
          "Nguồn chính là cơ học: copy-paste từ PDF (mà nó chèn xuống dòng và khoảng đệm), đầu ra OCR, ô biểu mẫu với xác thực lỏng lẻo, và các trình soạn thảo tự thụt lề bằng tab và khoảng trắng lẫn lộn. Không nguồn nào hiện lên trong rà soát bằng mắt, vì vậy dọn dẹp là việc của công cụ, không phải việc soát lỗi.",
          "Khoảng trắng không ngắt xứng đáng được nhắc riêng: trình soạn HTML và bộ xử lý văn bản thích chèn U+00A0 thay vì khoảng trắng thường, và nó sống sót qua các phép trim một cách vô hình. Văn bản dọn cho import CSV hay tra cứu cơ sở dữ liệu cần chuẩn hóa cả những ký tự này, nếu không tra cứ bí ẩn trượt mãi.",
        ],
      },
      {
        heading: "Từng quy tắc dọn dẹp làm gì",
        paragraphs: [
          "Gộp nhiều khoảng trắng biến mọi chuỗi từ hai khoảng trở lên thành một — an toàn cho văn xuôi và danh sách, và là dọn dẹp được yêu cầu nhiều nhất sau khi dán từ PDF. Cắt mép dòng gỡ khoảng trắng đầu và cuối từng dòng, chính là điều khiến diff và phát hiện trùng lặp ứng xử dự đoán được sau đó.",
          "Gỡ dòng rỗng xử lý các mẫu khoảng hở: một dòng trống giữa các đoạn đọc ổn, nhưng năm dòng trống từ một chuỗi email dán vào đọc như bị gãy. Gỡ toàn bộ xuống dòng nối văn bản thành một đoạn — hữu ích cho mô tả meta và ô biểu mẫu một dòng, tàn phá với bất cứ thứ gì có cấu trúc dòng.",
          "Chuyển tab thành khoảng trắng quan trọng với code và file cấu hình: trộn tab và khoảng trắng tạo ra các file mà căn lề khác nhau theo từng trình soạn thảo. Hãy chọn các quy tắc khớp đích đến của bạn — công cụ áp chúng cùng nhau, nên một bản dán từ PDF thường muốn gộp + cắt mép + gỡ dòng rỗng trong một lượt.",
        ],
      },
      {
        heading: "Tức thì, cục bộ, chính xác từng byte",
        paragraphs: [
          "Việc dọn chạy từng ký tự trong trình duyệt của bạn. Không gì được tải lên — với nội dung nằm trong cam kết bảo mật, bản nháp chưa công bố hay mẫu dữ liệu người dùng, đó chính là toàn bộ điểm của công cụ phía máy khách.",
          "Biến đổi là tất định và trên thực tế đảo ngược được: giữ bản gốc trong một tab, dọn trong tab kia, rồi so. Vì mọi quy tắc đều cơ học, cùng đầu vào luôn cho cùng đầu ra — không mô hình, không ngẫu nhiên, không bất ngờ.",
          "Một cặp thực dụng với các công cụ anh em: dọn khoảng trắng trước, rồi chạy remove-duplicate-lines, rồi text-diff so với bản gốc để thấy chính xác cái gì đổi. Ba bước ấy biến nội dung dán lộn xộn thành văn bản có thể duyệt, có thể diff trong vài giây.",
        ],
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
    deepDive: [
      {
        heading: "Đảo ký tự không phải là đảo văn bản",
        paragraphs: [
          "Có hai loại đảo, và trộn lẫn chúng tạo ra những lỗi nổi tiếng. Đảo ký tự lật chuỗi theo từng ký tự: “abc” thành “cba”. Đảo từ giữ mỗi từ nguyên vẹn và lật thứ tự: “hello world” thành “world hello”. Muốn một kiểu mà nhận kiểu kia là lời than phổ biến nhất về các công cụ đảo, nên công cụ này giữ chúng tách biệt.",
          "Đảo ký tự có một cái bẫy Unicode: văn bản lưu trong UTF-16 — thứ JavaScript dùng — biểu diễn emoji và một số chữ viết hiếm thành các cặp surrogate, hai đơn vị mã phải ở cùng nhau. Đảo ngây thơ tách cặp và tạo rác: emoji gia đình 👨‍👩‍👧 đảo thành các hộp vỡ hay glyph vô nghĩa. Đảo đúng phải đi qua các cụm grapheme, không phải đơn vị mã.",
          "Các chuỗi ghép cũng quan trọng: “e” cộng một dấu ghép khi đảo thành dấu-đứng-trước, hiển thị sai trong đa số font. Đảo nhận thức grapheme giữ dấu bám vào chữ của nó.",
        ],
      },
      {
        heading: "Nơi văn bản đảo thực sự hữu ích",
        paragraphs: [
          "Palindrome là cách dùng kinh điển: kiểm tra một từ đọc xuôi ngược như nhau — “racecar”, “level” — theo đúng nghĩa đen là đảo-rồi-so. Đảo thứ tự từ có công dụng biên tập thực tế: lật danh sách “họ-tên” thành “tên-họ”, đảo danh sách gạch đầu dòng, hủy một cột bị dán ngược từ dưới lên từ bảng tính.",
          "Đảo mức ký tự xuất hiện trong thiết kế câu đố và trò chơi (chữ soi gương, thông điệp ẩn đọc đúng trong gương), trong kiểm thử (đưa chuỗi đảo cho validator xem nó có từ chối không), và trong vượt qua các bộ lọc khớp chuỗi ngây thơ — cũng chính là lý do reverse-text là một mẹo pen-test kinh điển đáng biết.",
          "Đảo dòng — lật thứ tự cả các dòng — là con ngựa thồ thầm lặng cho file log: mới-nhất-đầu và cũ-nhất-đầu chỉ cách nhau một phép đảo, và các bản xuất bảng tính ra ngược từ dưới lên được sửa trong một cú bấm.",
        ],
      },
      {
        heading: "Chạy hoàn toàn trên trang",
        paragraphs: [
          "Phép đảo là một thao tác chuỗi thuần được thực hiện bằng JavaScript trong trình duyệt ngay khi bạn gõ — không máy chủ, không lưu trữ, chạy offline. Với văn bản dài, thao tác vẫn tức thì, vì đảo là tuyến tính theo độ dài.",
          "Công cụ xử lý đúng các trường hợp biên Unicode nêu trên: cụm grapheme giữ nguyên, emoji sống sót, dấu ghép bám chữ gốc. Cái bạn dán trở lại là văn bản hợp lệ, không phải một chuỗi ký tự thay thế.",
          "Không gì được ghi nhớ giữa các phiên: refresh và ô trống rỗng. Nếu bạn đang đảo thứ gì nhạy cảm — một chuỗi giống mật khẩu, một định danh nội bộ — đó chính là hành vi bạn muốn.",
        ],
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
    deepDive: [
      {
        heading: "Một câu được phát hiện thế nào",
        paragraphs: [
          "Câu là một khái niệm mờ, và các bộ đếm bất đồng về nơi nó kết thúc. Quy tắc ngây thơ — tách tại mỗi dấu chấm, chấm than và dấu hỏi — thất bại với “TS. Nguyễn đến lúc 3.5 giờ chiều”: ba dấu chấm, không câu nào kết thúc. Một bộ phát hiện thật cần nhận biết viết tắt (TS., BS., v.d.), xử lý số thập phân, và logic cho dấu ba chấm và dấu câu kép như “Thật chứ?!”.",
          "Công cụ này dùng tầng heuristics: dấu câu kết câu theo sau bởi khoảng trắng và một chữ cái hoa được tính là biên; các viết tắt từ danh sách nhúng được bỏ qua; các dấu dạng đầy đủ (。！？) được coi là biên cứng — điều văn bản CJK cần vì nó không có khoảng trắng. Văn bản trộn Trung-Anh vì thế được đếm đúng ở cả hai chữ viết.",
          "Đếm vốn dĩ xấp xỉ với các trường hợp biên — hội thoại trong ngoặc kép, mảnh gạch đầu dòng không có dấu kết. Hãy coi con số là một ước lượng mạnh, không phải tiên đề; nếu một câu cụ thể quan trọng (về pháp lý hay hợp đồng), hãy tự đếm câu đó.",
        ],
      },
      {
        heading: "Đọc độ dài từ số câu",
        paragraphs: [
          "Độ dài câu trung bình là con số hữu ích nhất mà bộ đếm tạo ra. Dưới 15 từ mỗi câu đọc gọn và dễ; trên 25 thường báo hiệu vấn đề hiểu, và các biên tập viên nhắm khoảng 15–20 cho độc giả đại chúng. Số đếm mỗi câu còn phơi bày câu chạy dài: một câu 60 từ gần như luôn là vấn đề dấu câu, không phải lựa chọn phong cách.",
          "Số câu chuyển thành thời gian đọc với quy tắc thô: khoảng 200–250 từ mỗi phút cho người lớn đọc văn xuôi, nên số từ chia 225 cho ra số phút. Kết hợp với trung bình câu, bạn biết được văn bản dài mà dễ đọc hay ngắn mà dày đặc.",
          "Với dịch giả và nhóm bản địa hóa, số câu quan trọng vì đa số định giá dịch thuật và công cụ bộ nhớ dịch làm việc ở cấp câu — biết số đếm trước ước lượng khối lượng phân đoạn.",
        ],
      },
      {
        heading: "Cục bộ, không giới hạn",
        paragraphs: [
          "Phân tích chạy bằng JavaScript trong trình duyệt ngay khi bạn gõ. Không tài khoản, không tải lên, không giới hạn kích thước tài liệu — dán cả một chương và số đếm cập nhật trực tiếp.",
          "Không gì được giữ lại: refresh và mọi thứ đặt lại. Với bản thảo chưa công bố, bản nháp khách hàng hay đề thi, mô hình phía máy khách ấy là hình dạng an toàn về riêng tư.",
          "Hãy ghép nó với word counter cho tỉ lệ từ-mỗi-câu, và với case converter khi chuẩn bị tiêu đề. Ba cái cùng nhau phủ phần lớn kiểm tra tiền-biên-tập mà không cần dịch vụ ngoài nào.",
        ],
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
    deepDive: [
      {
        heading: "Slug để làm gì",
        paragraphs: [
          "Slug là phiên bản an toàn-URL của một tiêu đề: “10 Mẹo pha Cà phê Ngon” thành 10-meo-pha-ca-phe-ngon. Slug quan trọng vì ba lý do: chúng khiến URL đọc được với con người trước khi bấm, chúng mang từ khóa mà máy tìm kiếm dùng làm tín hiệu xếp hạng, và chúng giữ URL ổn định và chia sẻ được — không khoảng trắng, không rác mã hóa kiểu %20 khắp nơi.",
          "Cơ chế: viết thường mọi thứ, thay khoảng trắng bằng dấu phân cách (gạch ngang là quy ước web), gỡ các ký tự bất hợp pháp hay mơ hồ trong URL, và gộp các lần lặp. Một bộ tạo tốt làm tất cả cùng lúc thay vì để bạn tự sửa tay các chuỗi “%C3%A9” trong link chia sẻ.",
          "Slug còn phục vụ các việc ngoài URL: tên file cho tài sản xuất ra, tên nhánh git, ID thành phần. Cùng quy tắc áp dụng khắp nơi — bộ ký tự sống sót qua sao chép, mã hóa và terminal mà không thành ký tự thoát.",
        ],
      },
      {
        heading: "Dấu, phiên âm và vấn đề CJK",
        paragraphs: [
          "Tiếng Latinh có dấu là điểm quyết định đầu tiên. Có hai trường phái: phiên âm (café → cafe) hay gỡ dấu (café → caf). Phiên âm giữ khả năng đọc và là điều công cụ này làm cho các dấu phụ Latinh phổ biến — á thành a, ü thành u — bằng quy tắc gấp Unicode chuẩn.",
          "Văn bản CJK buộc một lựa chọn khó hơn: không có chữ Latinh nào để gấp 一杯好咖啡 thành. Các lựa chọn là pinyin cho tiếng Trung, romanization cho tiếng Nhật, hay giữ nguyên ký tự. Trình duyệt hiện đại xử lý URL UTF-8 tốt, nên giữ ký tự CJK trong slug là hợp lệ về kỹ thuật và phổ biến trên các nền tảng Trung Quốc; tuy nhiên chia sẻ quốc tế chuộng pinyin hay romanization vì nó sống sót qua SMS, terminal và hệ thống cũ mà không có nhiễu mã hóa.",
          "Số và stop-word là quyết định khẩu vị: giữ “the” và “of” cho slug dài hơn, dễ đọc hơn; cắt chúng cho slug ngắn hơn. Lời khuyên SEO đã lật qua lật lại nhiều năm; đồng thuận ổn định là slug khớp tiêu đề quan trọng hơn slug ngắn.",
        ],
      },
      {
        heading: "Tạo trực tiếp, giữ cục bộ",
        paragraphs: [
          "Chuyển đổi chạy theo từng phím bấm trong trình duyệt của bạn. Không gọi API, không giới hạn tần suất, chạy offline — khác với các dịch vụ slug cần một chuyến máy chủ cho mỗi tiêu đề.",
          "Đầu ra tất định quan trọng với hệ thống nội dung: cùng tiêu đề luôn cho cùng slug, nên link xây hôm nay không gãy khi bài viết được tạo lại. Không có hậu tố ngẫu nhiên trừ khi bạn tự thêm (một đuôi ngẫu nhiên ngắn là cách chuẩn đảm bảo tính duy nhất qua hàng nghìn bài).",
          "Kiểm tra tính duy nhất được cố ý không làm ở đây — nó đòi biết toàn bộ kho URL của bạn, thứ nằm trong CMS của bạn. Công cụ đảm bảo định dạng đúng; tránh va chạm thuộc về tầng định tuyến của bạn, đúng chỗ của nó.",
        ],
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
    deepDive: [
      {
        heading: "Một lượt cho cả đường ống dọn dẹp",
        paragraphs: [
          "Phần lớn sự lộn xộn văn bản đến theo bó: nội dung dán từ PDF mang khoảng đôi, xuống dòng lạc loài và từ bị gạch nối tách qua dòng; văn bản web sao chép kéo theo khoảng trắng không ngắt vô hình và ký tự độ rộng không; bảng tính xuất kèm tab cuối dòng. Dọn từng quy tắc một nghĩa là năm lượt và các bước bị quên — một bộ dọn kết hợp áp cả đường ống cùng lúc.",
          "Trình tự chuẩn quan trọng: chuẩn hóa Unicode trước (gấp khoảng trắng không ngắt về loại thường, gỡ ký tự độ rộng không và ký tự điều khiển), vì các quy tắc sau so sánh ký tự; rồi gộp khoảng trắng, rồi cắt mép dòng, rồi sửa xuống dòng. Chạy khử trùng hay so sánh trước khi chuẩn hóa cho kết quả sai — hai dòng nhìn giống hệt vẫn “khác nhau” vì một ký tự vô hình còn sống.",
          "Đầu ra nên nhàm chán: không có thay đổi nào bạn không giải thích được. Mỗi quy tắc trong bộ dọn đều cơ học và xem trước được, chính là điều phân biệt bộ dọn với một “trình viết lại” AI — cùng đầu vào luôn cho cùng đầu ra, và bạn có thể xác minh từng phép biến đổi.",
        ],
      },
      {
        heading: "Cái gì bị gỡ và tại sao",
        paragraphs: [
          "Unicode vô hình là nhóm hàng đầu: khoảng trắng độ rộng không (U+200B) và ký tự nối, dấu hướng, ký tự điều khiển. Chúng vô hình trong mọi trình soạn thảo nhưng làm gãy so sánh chuỗi, làm phình văn bản SEO với byte vô nghĩa, và thậm chí có thể được dùng để giấu watermark hay payload độc hại trong nội dung dán. Gỡ chúng an toàn cho gần như mọi văn xuôi.",
          "Chuẩn hóa khoảng trắng phủ khoảng đôi, tab ngụy trang thành khoảng trắng, khoảng cuối dòng và dòng trống mồ côi. Đây là cách trị cho văn bản “nhìn ổn mà diff hiện trăm thay đổi” — phần lớn diff ấy thuần khoảng trắng.",
          "Sửa xuống dòng xử lý hiện vật dán PDF: ngắt cứng mỗi 40 ký tự khiến văn bản không tìm được và không chảy lại được. Nối các dòng bị gãy (cẩn thận — ngắt đoạn phải sống sót) biến văn bản trích từ PDF trở lại thành văn xuôi mạch lạc.",
        ],
      },
      {
        heading: "Tất định, cục bộ, kiểm chứng được",
        paragraphs: [
          "Mọi quy tắc chạy bằng JavaScript trong trình duyệt trên văn bản trong ô — không tải lên, chạy offline, không gì được lưu. Với bản nháp hợp đồng, bản chép khách hàng hay nội dung chưa công bố, bộ dọn phía máy khách là lựa chọn đúng về riêng tư.",
          "Tất định là cam kết thiết kế: cùng đầu vào, cùng đầu ra, mọi lần. Nhờ đó công cụ an toàn bên trong một quy trình lặp được — dọn, khử trùng, diff — nơi một trình viết lại tạo sinh sẽ tiêm các thay đổi không kiểm được.",
          "Chuỗi đồng hành tự nhiên trên trang này: text-cleaner trước, remove-duplicate-lines sau, text-diff so với bản gốc để xác nhận không gì có nghĩa bị đổi. Ba bước, tất cả cục bộ, tất cả tức thì.",
        ],
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
    deepDive: [
      {
        heading: "Base64 là mã hóa, không phải mã hóa bí mật",
        paragraphs: [
          "Lầm tưởng phổ biến nhất về Base64 là nó che giấu điều gì. Nó không. Base64 là một mã hóa đảo ngược được định nghĩa bởi RFC 4648: nhận các byte tùy ý và diễn đạt lại bằng 64 ký tự an toàn (A-Z, a-z, 0-9, + và /) để dữ liệu nhị phân sống sót qua các kênh chỉ xử lý văn bản, như đính kèm email hay trường JSON. Bất kỳ ai có chuỗi đều giải mã trong một bước — công cụ này làm tức thì, và mọi bộ giải mã khác cũng vậy. Nếu bạn cần bí mật, bạn cần mã hóa thật (AES, RSA) với khóa; Base64 không cung cấp gì.",
          "Vì sao là 64 ký tự? Sáu bit chỉ đúng 64 giá trị, nên Base64 đóng gói mỗi 3 byte (24 bit) thành 4 ký tự (4 × 6 bit). Dữ liệu có độ dài không phải bội của 3 để lại phần dư, và đó là nơi phần đệm = xuất hiện: một = nghĩa là nhóm cuối chứa 2 byte, hai = nghĩa là 1 byte. Phần đệm về mặt kỹ thuật là thông tin tùy chọn — bộ giải mã có thể suy ra — vì vậy bạn sẽ gặp các chuỗi Base64 bị cắt mất = cuối, và vì vậy bộ giải mã nên nhận cả hai.",
          "Một biến thể liên quan quan trọng trong thực tế: Base64 an toàn-URL thay + và / bằng - và _, vì + và / gây rắc rối trong URL và tên file. JWT dùng bảng chữ cái này, nên header hay payload của một JWT giải mã sạch sẽ ở đây dù một bộ giải mã RFC 4648 nghiêm ngặt có thể từ chối các ký tự -.",
        ],
      },
      {
        heading: "Bạn nhận lại gì, và đầu ra rác nghĩa là gì",
        paragraphs: [
          "Giải mã luôn tạo ra byte; câu hỏi là những byte đó được diễn giải thế nào. Công cụ này chạy chúng qua một TextDecoder UTF-8, nên văn bản từng được mã hóa UTF-8 quay về đúng như ban đầu — chữ có dấu, emoji, ký tự CJK đều đi vòng trọn vì Base64 mang byte, không phải ký tự. Nếu đầu ra hiện ký tự thay thế (�), đầu vào có lẽ chưa từng là văn bản UTF-8: có thể là ảnh, PDF hay file mã hóa theo bảng mã khác. Giải mã vẫn thành công; chỉ là không có văn bản để hiển thị.",
          "Base64 ngoài đời lộn xộn, nên công cụ dọn trước khi giải mã: khoảng trắng và xuống dòng bị gỡ (email và đầu ra PEM ngắt Base64 ở 76 ký tự, thứ làm gãy các bộ giải mã nghiêm ngặt), và tiền tố data URI như data:image/png;base64, bị gỡ để bạn dán cả cụm. Độ dài là nguyên nhân hỏng phổ biến khác: độ dài Base64 phải là bội của 4, nên một chuỗi bị cắt giữa chừng bởi copy-paste hay một dòng log làm gãy giải mã — hãy kiểm tra hai đầu trước.",
        ],
      },
      {
        heading: "Cục bộ theo thiết kế, và so với CLI",
        paragraphs: [
          "Chuỗi mã hóa hiện diện khắp các bối cảnh nhạy cảm: header Authorization, khóa API trong khối cấu hình, JWT chứa định danh tài khoản, payload nhúng bạn tìm thấy trong traffic. Dán bất kỳ thứ nào trong số đó vào một trang web xa lạ gửi đầu vào lên máy chủ nghĩa là giao chính dữ liệu bạn đang soi cho bên thứ ba. Bộ giải mã này chạy hoàn toàn trong trình duyệt của bạn bằng JavaScript — không gì được tải lên, không gì được ghi log, và chạy offline sau khi trang tải xong.",
          "Công cụ dòng lệnh (openssl base64 -d, certutil, python base64) mạnh nhưng khó tính với đầu vào bị ngắt dòng, thiếu phần đệm và xử lý file, và khác nhau giữa các nền tảng. Cho một khoảnh khắc “chuỗi này là gì?” một lần, công cụ trình duyệt chịu tiền tố và khoảng trắng, giải mã bảng chữ URL-safe kiểu JWT, và hiển thị văn bản đa byte đúng thường nhanh hơn — với cùng cam kết riêng tư và lịch sử shell không lưu bí mật đã mã hóa của bạn.",
        ],
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
    deepDive: [
      {
        heading: "Toán học đằng sau bảng chữ cái",
        paragraphs: [
          "Base64 do RFC 4648 định nghĩa hoạt động theo nhóm 6 bit: 64 ký tự cần đúng 6 bit, nên mỗi 3 byte (24 bit) đóng gói thành 4 ký tự (4 × 6 bit). Đầu vào có độ dài không phải bội của 3 để lại 1 hay 2 byte, và phần đệm = đánh dấu nhóm cuối thiếu bao nhiêu — một = cho 2 byte, hai = cho 1. Vì vậy Base64 hợp lệ luôn có độ dài chia hết cho 4, và đầu ra lớn hơn đầu vào khoảng 33%. Sự phình ấy là cái giá của an toàn nhị phân, và có ý nghĩa khi bạn nhúng ảnh vào data URI hay nhồi payload vào cookie có giới hạn kích thước.",
          "Trước khi mã hóa, văn bản phải thành byte, và lựa chọn bảng mã đổi thay mọi thứ. Công cụ này luôn dùng UTF-8 qua TextEncoder chuẩn, là đồng thuận hiện đại: base64.b64encode(s.encode()) của Python, Buffer.from(s).toString('base64') của Node và Base64.getEncoder() của Java đều giả định UTF-8 cho cùng một chuỗi. Hàm btoa() legacy của trình duyệt thì ném lỗi với ký tự ngoài Latin-1 — nguồn kinh điển của emoji hỏng — chính là sai lầm mà mã hóa UTF-8-trước tránh được.",
          "Hai biến thể bảng chữ cùng tồn tại. Biến thể chuẩn dùng + và / và là điều HTTP Basic Auth và data: URI yêu cầu. Biến thể an toàn-URL định nghĩa trong cùng RFC đổi chúng thành - và _ để chuỗi đi được trong tham số truy vấn và tên file không cần mã hóa phần trăm; JWT dùng nó. Tạo sai biến thể là lỗi phổ biến — dữ liệu giải mã được cả hai cách, nhưng bộ tiêu thụ nghiêm ngặt từ chối ký tự lệch chuẩn.",
        ],
      },
      {
        heading: "Mã hóa không phải mã hóa bí mật — và Base64 thuộc về đâu",
        paragraphs: [
          "Dù đầu ra trông khó đọc đến đâu, Base64 không mang lại một chút bí mật nào. Không có khóa, không có vòng biến đổi — chỉ có một bảng ánh xạ cố định mà ai cũng đảo ngược bằng một lời gọi hàm, gồm cả bộ giải mã của công cụ này. Lưu mật khẩu, token hay khóa bản quyền “được mã hóa” bằng Base64 là một mẫu lỗ hổng thật thấy ở các hệ thống cấu hình sai. Nếu mục tiêu là bảo mật, hãy dùng mật mã thật (AES-GCM cho dữ liệu, bcrypt/argon2 cho mật khẩu); chỉ dùng Base64 khi một kênh thuần văn bản phải mang byte.",
          "Nơi nó thuộc về: HTTP Basic Auth (username:password mã hóa một lần mỗi request), ảnh nhúng trong CSS hay HTML qua data: URI, khối nhị phân nhỏ trong JSON, đính kèm email dưới MIME, và các đoạn JWT. Trong tất cả những trường hợp này, mục tiêu là vận chuyển, không phải bảo vệ — bên nhận giải mã tất định, từng byte một.",
          "Một phép thử vòng tròn là kiểm tra hợp lý rẻ nhất: mã hóa ở đây, rồi dán đầu ra vào bộ giải mã được liên kết và xác nhận nhận lại bản gốc — gồm cả khoảng trắng cuối, emoji và văn bản trộn chữ viết. Nếu một bộ tiêu thụ Base64 của bạn ứng xử sai, khác biệt gần như luôn là phần đệm bị gỡ, ngắt dòng, hay bảng chữ an toàn-URL, không phải các byte.",
        ],
      },
      {
        heading: "Mã hóa cục bộ, không cái bẫy terminal",
        paragraphs: [
          "Mọi thứ chạy trong trình duyệt của bạn bằng JavaScript — văn bản bạn dán chưa từng rời khỏi thiết bị, không gì được tải lên hay ghi log, và trang chạy offline sau khi tải. Điều đó quan trọng hơn vẻ ngoài với việc mã hóa: thông tin Basic Auth, token API nội bộ và dữ liệu khách hàng thường xuyên đi qua một bước Base64, và gửi chúng đến một trang bên thứ ba để mã hóa là phản lại toàn bộ mục đích.",
          "So với dòng lệnh echo -n 'text' | base64, công cụ này tránh các cái bẫy kinh điển: quên -n nên xuống dòng bị mã hóa vào đầu ra, lỗi trích dẫn làm hỏng khoảng trắng, và khác biệt nền tảng (base64 của macOS ngắt dòng ở 76 ký tự, một số công cụ Windows cần cờ để bỏ xuống dòng). Đầu ra ở đây là một dòng sạch dán thẳng vào header hay cấu hình — với cùng cam kết riêng tư và không gì được lưu vào lịch sử shell.",
        ],
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
    deepDive: [
      {
        heading: "Bộ minifier an toàn gỡ gì — và không được gỡ gì",
        paragraphs: [
          "Một bộ minifier stylesheet đi trên sợi dây mảnh. Phần có thể gỡ an toàn: chú thích, khoảng trắng giữa các khai báo, dấu chấm phẩy cuối trước ngoặc đóng, và khoảng trắng quanh các dấu phân cách như : và ,. Phần trông gỡ được mà không được: bất kỳ khoảng trắng nào trong chuỗi (content: “a b” nghĩa khác với “ab”), mọi thứ trong url(), và — tinh tế nhất — khoảng trắng trong selector. .a .b (kết hợp hậu duệ) và .a.b (cùng phần tử với hai class) chênh nhau đúng một khoảng trắng, nên gỡ nhầm khoảng trắng đổi chỗ các phần tử được tạo kiểu.",
          "Vì vậy một bộ minifier bảo thủ chủ yếu là một cỗ máy khoảng trắng, không phải trình viết lại. Các bộ hậu xử lý hăng hái có thể đi xa hơn — gộp quy tắc trùng, đổi #ffffff thành #fff, bỏ khai báo bị đè — nhưng mỗi bước ấy có thể đổi hành vi trong trường hợp biên (thứ tự cascade, tương tác specificity, hỗ trợ sau của trình duyệt cho cú pháp màu). Một công cụ cam kết không đổi ngữ nghĩa đổi vài byte lấy sự chắc chắn rằng file đã min hiển thị giống hệt; với stylesheet production, sự đánh đổi ấy thường là đúng.",
          "Chú thích xứng đáng một lưu ý riêng: thông báo pháp lý, header bản quyền và ghi chú hack-trình-duyệt đôi khi sống trong chú thích. Nếu một stylesheet mang header bản quyền phải sống sót qua việc phân phối, hãy thêm lại sau khi min — hoặc giữ nguồn chưa min làm bản chính tắc, vốn là thực hành tốt bất kể.",
        ],
      },
      {
        heading: "Minification so với gzip: chúng nhân nhau, không cạnh nhau",
        paragraphs: [
          "Lầm tưởng phổ biến là bật nén máy chủ khiến minification trở nên vô nghĩa. Hai cái tấn công hai loại dư thừa khác nhau. Minification gỡ các token ngôn ngữ không cần; gzip rồi nén các byte sống sót bằng từ điển. Vì khoảng trắng và tên thuộc tính dài lặp lại đúng là loại nội dung dự đoán được mà gzip ăn ngon, min+gzip luôn nhỏ hơn không-min+gzip — khoản tiết kiệm cộng dồn chứ không chồng lấn.",
          "Con số dung lượng ở đây báo chênh lệch byte thô, là trần trung thực của khoản lời. Dung lượng truyền thật còn phụ thuộc mức nén của máy chủ và stylesheet có được cache không. CSS viết tay điển hình mất 15–30% chỉ từ việc gỡ khoảng trắng và chú thích; CSS sinh tự động hay định dạng dày có thể mất nhiều hơn, file phình vendor đôi khi ít hơn.",
          "Một điều minifier không trị được: render-blocking. StyleSheet nhỏ hơn tải nhanh hơn nhưng vẫn chặn lần vẽ đầu khi được phân tích. Nếu mục tiêu là lần vẽ đầu nhanh hơn, minification là bước một; các đòn bẩy lớn hơn là tách CSS tới hạn, trì hoãn kiểu không tới hạn và gỡ hẳn quy tắc chết — chẳng điều nào bộ minifier an toàn làm giúp bạn.",
        ],
      },
      {
        heading: "Làm việc cục bộ là tính năng, không phải phương án dự phòng",
        paragraphs: [
          "StyleSheet ít rõ ràng nhạy cảm hơn một dump cơ sở dữ liệu, nhưng rò rỉ nhiều hơn người ta tưởng: tên class và feature flag chưa phát hành, giá trị design token nội bộ, thử nghiệm bị chú thích có tên sản phẩm, URL tuyệt đối từ môi trường staging. Dán một theme chưa lên sóng vào dịch vụ web lưu đầu vào nghĩa là tài liệu ấy hạ cánh xuống hạ tầng của người khác trước khi code còn có chỗ trong git.",
          "Bộ minifier này chạy hoàn toàn trong trình duyệt của bạn bằng JavaScript — đầu vào chưa từng rời khỏi trang, không gì được lưu hay ghi log, và công cụ tiếp tục chạy offline sau khi tải. Còn một khía cạnh thực dụng: không trần dung lượng nào từ giới hạn tải lên, và không chờ vòng đi mạng. Đầu ra cập nhật nhanh đúng bằng tốc độ bạn dán, khiến con số dung lượng thành vòng phản hồi dùng được khi bạn quyết định mức dọn dẹp đáng bao nhiêu.",
        ],
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
    deepDive: [
      {
        heading: "Suy đoán kiểu: các quy tắc bảo thủ giữ dữ liệu trung thực",
        paragraphs: [
          "Ô CSV là văn bản; JSON có kiểu. Nối hai bên nghĩa là bộ chuyển phải đoán, và chất lượng của bộ chuyển sống ở cách nó đoán. Các quy tắc ở đây cố ý bảo thủ: một ô trở thành số chỉ khi là literal số sạch — không số 0 đầu, không khoảng trắng quanh. true và false thành boolean, literal null đúng nghĩa thành null, còn mọi thứ khác ở lại là chuỗi. Nghĩa là 007 giữ nguyên “007”, không phải 7; mã bưu chính, mã sản phẩm và số điện thoại giữ số 0 của mình; và ngày kiểu 2024-03-04 không âm thầm thành gì khác.",
          "Mặc định bảo thủ tồn tại vì một kiểu sai là một lỗi im lặng. Một bộ tiêu thụ JSON nhận 7 thay vì “007” không thể khôi phục bản gốc; một bộ nhận chuỗi khi nó muốn số ít nhất hỏng to hay dễ chuyển đổi. Khi bạn biết một cột thực sự là số, hãy ép kiểu ở hạ nguồn nơi giả định là tường minh — bộ chuyển không phải chỗ đánh cược với định danh của bạn.",
          "Xử lý header phủ hai bệnh kinh điển của CSV: tên cột rỗng và trùng. Header rỗng nhận tên sinh ra (column1, column2, …) để mỗi dòng giữ đủ trường; các bản trùng gộp về lần xuất hiện cuối, vì đối tượng JSON không thể mang khóa lặp. Nếu trùng lặp quan trọng với schema của bạn, hãy sửa header trước khi chuyển — không bộ chuyển nào bịa được thông tin nguồn chưa từng có.",
        ],
      },
      {
        heading: "Phân tích CSV đúng: dấu ngoặc kép, xuống dòng và dấu phân cách",
        paragraphs: [
          "Tách CSV theo dấu phẩy sai ngay khi một tập dữ liệu thật đến. RFC 4180, tiêu chuẩn mà định dạng này thực tế theo, định nghĩa trường có ngoặc kép: một trường chứa dấu phẩy, dấu ngoặc hay xuống dòng phải được bọc trong ngoặc kép, và một dấu ngoặc trong trường ấy được thoát bằng cách nhân đôi. Một trường tên đọc “Ada, Bá tước” là một ô; tách ngây thơ biến nó thành hai và dịch mọi cột phía sau.",
          "Kết thúc dòng là bẫy thứ hai. File CSV trộn CRLF (Windows, bản xuất Excel) và LF (công cụ Unix), và một xuống dòng trong trường có ngoặc là dữ liệu, không phải dấu phân cách bản ghi — một địa chỉ nhiều dòng hay một bình luận dán vào phải sống sót như một ô. Phân tích đúng là một máy trạng thái nhỏ, không phải một lời gọi split(); đó là thứ chạy ở đây.",
          "Dấu phân cách thay đổi theo bản địa: Excel ở phần lớn châu Âu và Mỹ Latinh ghi file phân cách bằng chấm phẩy vì dấu phẩy là dấu thập phân ở những bản địa ấy. Công cụ cho bạn chọn phẩy hay chấm phẩy tường minh thay vì đoán, nên một file mà mọi trường tình cờ chứa chấm phẩy không bị phát hiện nhầm. Nếu nguồn dùng tab, công cụ anh em JSON-to-CSV xử lý vòng ngược lại.",
        ],
      },
      {
        heading: "Chuyển đổi cục bộ cho dữ liệu gọi tên người thật",
        paragraphs: [
          "CSV hướng tới JSON thường hướng tới một API hay cơ sở dữ liệu — và nội dung của chúng thường là đời thật: người dùng, đơn hàng, liên hệ, phản hồi. Chuyển file như vậy qua một trang web xử lý tải lên nghĩa là các hàng đi qua biên mạng và thường hạ cánh vào nhật ký hay kho của ai đó. Với dữ liệu về người nhận diện được, bước ấy chính xác là điều chính sách riêng tư và lẽ thường cùng nói đừng làm.",
          "Bộ chuyển này phân tích và tuần tự hóa hoàn toàn trong trình duyệt của bạn bằng JavaScript — việc dán, phân tích, suy đoán kiểu và đầu ra đều diễn ra trên máy của bạn, không có bước tải lên nào trong đường dẫn code. Nó chạy offline sau khi tải, không áp hạn ngạch hàng hay dung lượng nào ngoài bộ nhớ trình duyệt, và không gì bạn chuyển được ghi vào đâu cả. Với một file seed dùng một lần có người dùng thử hay một bản xuất khách hàng không được di chuyển, đó là kiến trúc duy nhất giữ trọn lời hứa của dữ liệu.",
        ],
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
    deepDive: [
      {
        heading: "Một thuật toán cho mỗi việc: họ SHA-2 so với các thuật toán đã gãy",
        paragraphs: [
          "Công cụ này cố ý cung cấp năm thuật toán vì các công việc khác nhau cần thuật toán khác nhau. SHA-256 và SHA-512 là chuẩn hiện hành — chúng chống lưng chứng chỉ TLS, ký code và Bitcoin. SHA-384 là cùng cấu trúc với SHA-512 nhưng đầu ra bị cắt ngắn, phổ biến nơi một chuẩn đòi bản tóm tắt ngắn hơn. SHA-1 và MD5 xuất hiện ở đây không phải để khuyên dùng mà vì thế giới thực vẫn dùng: checksum lưu trữ legacy, nhà cung cấp cũ và bộ xác minh cũ cứ đòi chúng.",
          "Lịch sử gãy đổ đáng biết chính xác. Khả năng chống va chạm của MD5 sụp giữa thập niên 2000, với phần mềm độc hại Flame năm 2012 giả mạo chứng chỉ Microsoft làm màn trình diễn tiêu biểu. SHA-1 trụ lâu hơn: Google và CWI Amsterdam chứng minh va chạm SHA-1 thực dụng đầu tiên (tấn công SHAttered) năm 2017. Cả hai vẫn chấp nhận được cho tính toàn vẹn không đối kháng — xác nhận một file sống sót qua truyền — nhưng cả hai phải bị từ chối ở bất cứ nơi nào kẻ tấn công có thể chọn một phần đầu vào.",
          "Một nguyên tắc cầm tay thực dụng: với bất cứ thứ gì bạn phát hành hôm nay, hãy tạo SHA-256 (hay SHA-512 cho file lớn, nơi nội thất 64-bit của nó nhanh hơn trên CPU hiện đại). Khi bạn phải xác minh một tổng MD5 hay SHA-1 cũ, hãy làm ở đây một lần và đồng thời tạo SHA-256 bên cạnh, để hồ sơ mang cả phép kiểm legacy lẫn phép kiểm chống tương lai.",
        ],
      },
      {
        heading: "Độ dài bản tóm tắt và hình dạng của đầu ra đúng",
        paragraphs: [
          "Đầu ra của mỗi thuật toán có kích thước cố định, khiến đầu ra sai nhận ra ngay: MD5 là 32 ký tự hex, SHA-1 là 40, SHA-256 là 64, SHA-384 là 96 và SHA-512 là 128. Nếu một SHA-256 được tuyên bố có 63 hay 65 ký tự, có gì đó phía trước hỏng — một phép cắt, một cú dán nhầm, hay một thuật toán khác đội nhãn sai. Kiểm tra độ dài trước khi so sánh tiết kiệm sự bối rối săn một sự lệch mà thực ra là lỗi định dạng.",
          "Chữ hoa-thường của hex là cái bẫy so sánh khác: một số công cụ in bản tóm tắt hoa, một số in thường. Giá trị giống hệt nhau — thập lục phân chỉ là ký hiệu — nên so không phân hoa-thường hay chuẩn hóa cả hai bên trước. Và cẩn thận khoảng trắng cuối: băm một văn bản có ký tự xuống dòng cuối cho ra bản tóm tắt khác với không có, đó là lý do chế độ văn bản ở đây băm chính xác các ký tự bạn cung cấp và chế độ file băm byte thô của file.",
          "Thuộc tính một chiều là thứ khiến tất cả điều này hoạt động: một bản tóm tắt độ dài cố định vứt thông tin theo thiết kế, và byte giống nhau luôn cho bản tóm tắt giống nhau. Tính tất định ấy là điều khiến một checksum do một dự án ở quốc gia này công bố khớp với cái bạn tính trong trình duyệt ở quốc gia khác — cùng byte, cùng bản tóm tắt, bất kể ai tính hay tính ở đâu.",
        ],
      },
      {
        heading: "Băm ngay nơi file đang sống",
        paragraphs: [
          "Hash thường được tính chính vì niềm tin đang bị nghi vấn — nên môi trường băm quan trọng ngang thuật toán. Gửi một file đến máy chủ xa lạ để băm là tự phản bội mục đích: bạn truyền đi chính những byte mà tính toàn vẹn bạn đang định xác minh. Mọi thứ ở đây chạy trong trình duyệt của bạn; văn bản băm ngay khi bạn gõ và file được đọc cục bộ bằng file API của trình duyệt, không bao giờ được tải lên.",
          "Thực thi cục bộ còn gỡ các trần thực dụng: không băng thông tải lên, không giới hạn kích thước ngoài bộ nhớ của bạn, không hàng đợi — vân tay một ISO hàng gigabyte chỉ tốn đúng bằng thời gian đọc nó từ đĩa, và sau khi trang tải xong quy trình chạy offline.",
          "Với công việc một thuật toán tập trung, các trang SHA-256 generator và MD5 generator cho mỗi thuật toán một khung riêng; trang này là công cụ song song — một đầu vào, năm bản tóm tắt, và sự tự do xác minh tổng cũ và phát hành tổng mới ở cùng một chỗ.",
        ],
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
    deepDive: [
      {
        heading: "Năm ký tự và quy tắc dấu và-đi-trước",
        paragraphs: [
          "Làm văn bản an toàn cho HTML cần thoát đúng năm ký tự: &amp;, &lt;, &gt;, &quot; và &#39;. Dấu và đi trước vì mọi thực thể đều bắt đầu bằng nó — một & chưa thoát đi theo chữ cái là tín hiệu trình duyệt dùng để bắt đầu phân tích một tham chiếu. Đó cũng là lý do thứ tự quan trọng khi thoát: & phải thành &amp; trước mọi thứ khác, nếu không các thực thể bạn vừa tạo bị thoát lần nữa thành &amp;lt;.",
          "Chiều ngược lật thứ tự: khi bỏ thoát, &amp; được xử lý cuối cùng, không phải đầu tiên. Xử lý nó đầu tiên và &amp;lt; thành &lt;, rồi thành một thẻ < thật — một thẻ sống nơi tác giả muốn văn bản nhìn thấy được. Sai sót thứ tự duy nhất ấy là toàn bộ cơ chế đằng sau các lỗi bỏ-thoát-hai-lần, và là sai lầm đa số các dòng regex một-lần-thoát mắc phải.",
          "Có cần thoát dấu ngoặc kép là câu hỏi bối cảnh. Trong node văn bản chúng vô hại — <p>Anh ấy nói “xin chào”</p> là hợp lệ. Trong giá trị thuộc tính, dấu ngoặc delimit thuộc tính phải được thoát, và dấu ngoặc chưa thoát trong thuộc tính là vector chèn kinh điển: một giá trị kết thúc bằng “ có thể đóng thuộc tính và mở một thuộc tính mới. Hãy thoát dấu ngoặc cho bối cảnh thuộc tính; để yên trong văn bản thuần nếu bạn muốn đầu ra dễ đọc.",
        ],
      },
      {
        heading: "Thực thể, XSS và ranh giới nói thật lòng",
        paragraphs: [
          "Thoát là tuyến phòng thủ đầu tiên của XSS: một <script> do người dùng gửi thành &lt;script&gt;, hiển thị như văn bản nhìn thấy thay vì thực thi. Các template engine tử tế làm tự động cho nội suy văn bản — nhưng nối chuỗi thủ công, dựng HTML trong JavaScript bằng +, hay render nội dung người dùng vào thuộc tính vẫn đòi kỷ luật bằng tay.",
          "Ranh giới xứng đáng được nói thẳng: thoát làm nội dung trơ như markup, không làm nội dung đáng tin. Một tài liệu đã thoát vẫn hiển thị mọi thứ tác giả viết — văn bản lừa đảo, hướng dẫn gây hiểu lầm. Thoát giải quyết tính đúng đắn và an toàn chèn, không phải rà soát nội dung.",
          "Các thực thể số như &#233; và &#x2019; tồn tại cho khả năng tương thích, không phải an ninh. Trong thế giới UTF-8 chúng phần lớn không cần, nhưng các đường ống email legacy, các đường code cũ với bảng mã không phải UTF-8, và các hệ thống gỡ byte cao vẫn được lợi. Các tham chiếu theo tên mà chiều bỏ thoát nhận ra phủ tập hợp thường ngày — markup, dấu câu, dấu phụ Latinh và ký hiệu tiền tệ — cộng mọi dạng số.",
        ],
      },
      {
        heading: "Thoát nội dung người dùng ngay tại máy",
        paragraphs: [
          "Văn bản cần thoát thường là lời của người khác: tin nhắn hỗ trợ khách hàng, chuỗi bình luận được cào để phân tích, bio người dùng sắp vào một template email. Đó chính xác là nội dung bạn không muốn định tuyến qua một dịch vụ web — và một số phiên bản trực tuyến của công cụ này thật sự POST văn bản lên backend của họ.",
          "Mọi thứ ở đây chạy bằng JavaScript trong trình duyệt của bạn: phép biến đổi là thao tác ký tự thuần với không dính mạng nào ở bất kỳ bước nào. Dán cả tin nhắn của khách, toàn bộ dump bình luận, một template với các trường cá nhân hóa; không gì rời khỏi thiết bị, không gì được ghi log, và chỉ số đếm ký tự giữ bạn trung thực về mức thoát làm phình văn bản bao nhiêu.",
          "Ghép nó với mã hóa URL khi đi qua các bối cảnh: thực thể HTML bảo vệ bối cảnh markup, mã hóa phần trăm bảo vệ bối cảnh URL, và cái này không thay thế cái kia — một & đã thoát HTML bên trong chuỗi truy vấn là một thứ khác với một & được mã hóa phần trăm. Làm cả hai chuyển đổi cục bộ, cạnh nhau, là cách các bối cảnh không bị nhầm.",
        ],
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
    deepDive: [
      {
        heading: "Nơi khoảng trắng quan trọng: ngoại lệ pre/textarea",
        paragraphs: [
          "Quy tắc chi phối mọi bộ định dạng HTML là khoảng trắng không phải lúc nào cũng miễn phí. Giữa các phần tử khối, một xuống dòng bị gộp thành một khoảng trắng và trình duyệt gần như bỏ qua ở mọi nơi — nhưng không phải mọi nơi. Trong pre và textarea, khoảng trắng chính là nội dung. Trong script và style, một xuống dòng lạc có thể đổi ý nghĩa (một template literal trong script, hay một attribute selector trong CSS, có thể nhạy cảm với định dạng). Một beautifier mù quáng thụt lề các khối ấy không chỉ làm code trông kỳ — nó có thể làm gãy code.",
          "Có một trường hợp thứ hai tinh tế hơn: phần tử inline. Khoảng trắng giữa các thẻ <a>, <b> hay <img> trong một đoạn hiển thị thành một khoảng trắng nhìn thấy. Thêm xuống dòng ở đó đổi kết quả hiển thị theo cách về kỹ thuật là thẩm mỹ nhưng khác biệt rõ ràng. Vì vậy một bộ định dạng cẩn thận giữ nội dung inline trên một dòng thay vì đẩy mọi con xuống dòng riêng — khác biệt giữa các trình duyệt ở đây nhỏ nhưng thật.",
          "Bộ định dạng làm các quyết định ấy trở nên tường minh: nội dung của pre, textarea, script và style đi qua nguyên vẹn, và các thẻ được phân loại là block, inline hay void (img, br, hr, input và các bạn, không có thẻ đóng và không được mở một tầng thụt lề). Phân loại này chính là cái trong đặc tả HTML, và phân loại sai là điều phân biệt một bộ định dạng với một kẻ làm hỏng markup.",
        ],
      },
      {
        heading: "Tự đóng thẻ: HTML dị dạng được thụt lề ra sao cho hợp lý",
        paragraphs: [
          "HTML ngoài đời — template email, trang lưu từ trình duyệt, đầu ra CMS legacy — hiếm khi đóng đủ thẻ. Chuẩn HTML định nghĩa một tập phần tử có thẻ kết thúc tùy chọn: một li mới tự động đóng li trước, một p bị đóng bởi đa số phần tử cấp khối đi sau, và một thẻ đóng cho tổ tiên tự động đóng mọi con cháu đang mở. Một bộ định dạng bỏ qua các quy tắc này lồng mọi thứ vào thẻ chưa đóng đầu tiên, và thụt lề thành một lời nói dối.",
          "Cách tiếp cận thực dụng ở đây phản chiếu một parser trình duyệt: giữ một ngăn xếp phần tử đang mở, đóng chúng theo quy tắc kết-thúc-tự-động của chuẩn, và để một thẻ đóng tổ tiên pop mọi phần tử mở sau nó. Đầu vào dị dạng suy giảm một cách nhẹ nhàng — thẻ chưa đóng vẫn thụt lề, thẻ đóng lệch không làm gãy lượt chạy — nhưng công cụ không bịa cấu trúc nó không thấy được, đó là lý do nó cố ý không sắp lại hay “sửa” markup của bạn ngoài khoảng trắng.",
          "Sự tiết chế ấy là một lập trường thiết kế. Tồn tại các beautifier sắp lại thuộc tính, đổi cú pháp tự-đóng, hay chuẩn hóa dấu ngoặc; hữu ích cho cẩm nang phong cách, nguy hiểm khi bạn cần đầu ra khớp một diff hay một template nghiêm ngặt. Khi mục tiêu là đọc một template email đã min hay một trang đã lưu, biến đổi thuần khoảng trắng là hướng trung thực: bạn thấy gì chính là cấu trúc của bạn, chỉ được dàn ra để nhìn thấy.",
        ],
      },
      {
        heading: "Vì sao định dạng chạy ngay trong trình duyệt của bạn",
        paragraphs: [
          "Loại HTML người ta dán vào bộ định dạng thường là bảo mật: template email giao dịch có token khách hàng, trang admin nội bộ có URL API, trang của đối thủ lưu về để nghiên cứu. Gửi bất kỳ thứ nào trong số này lên một dịch vụ định dạng là đặt markup của bạn lên máy chủ bên thứ ba nơi nó có thể bị ghi log hay lưu giữ. Công cụ này tokenize và thụt lề cục bộ bằng JavaScript — không gì đi qua mạng, không có bước tải lên, và trang chạy cả khi offline.",
          "Còn một lợi thế độ tin cậy. Định dạng phía máy khách nghĩa là không độ trễ vòng đi khi gõ, không giới hạn tần suất, không trần dung lượng do gói dịch vụ đặt. Một trang đã lưu lớn với hàng nghìn node được định dạng trong cùng phiên mà không chạm hạn ngạch.",
          "Nếu bạn cần tính năng định dạng ngoài khoảng trắng — ngắt dòng kiểu Prettier, sắp thuộc tính, đơn vị thụt lề cấu hình được — con đường trung thực là chạy một bộ định dạng đàng hoàng trong toolchain dự án của bạn. Với quy trình dán-để-đọc, phạm vi hẹp của công cụ này chính là điểm: một công việc, làm dự đoán được, với markup của bạn chưa từng rời khỏi máy.",
        ],
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
    deepDive: [
      {
        heading: "Vì sao khoảng trắng trong HTML rắc rối hơn vẻ ngoài",
        paragraphs: [
          "Gộp khoảng trắng nghe có vẻ tầm thường, nhưng quy tắc hiển thị của HTML làm nó tinh tế. Trong luồng thường, mọi chuỗi khoảng trắng, tab và xuống dòng hiển thị thành một khoảng trắng — vì vậy một xuống dòng giữa hai phần tử inline như <a> hay <em> tạo ra một khe hở nhìn thấy, trong khi một xuống dòng giữa hai <div> không tạo gì cả. Một bộ minifier phải tôn trọng sự bất đối xứng này: gộp khe inline thành một khoảng trắng, xóa hẳn khe cấp khối.",
          "Một số phần tử không bao giờ tha thứ cho thay đổi khoảng trắng. Trong <pre>, <textarea>, <script> và <style>, khoảng trắng là nội dung literal — gộp nó và mẫu code của bạn mất định dạng, textarea của bạn đến với mặc định méo mó, script hay stylesheet của bạn thậm chí có thể gãy cú pháp. Công cụ này để những vùng ấy nguyên từng byte.",
          "Đó là lý do phần trăm tiết kiệm có thể thấp hơn các bộ minifier hăng hái báo: mọi lựa chọn ở đây nghiêng về giữ hiển thị giống hệt thay vì bóp byte cuối cùng. Cái nó gỡ — chú thích tác giả, thụt lề, không gian chết giữa các khối — vốn vô hình trong trình duyệt, nên không gì bạn thấy có thể đổi.",
        ],
      },
      {
        heading: "Bộ minifier bảo thủ từ chối làm gì",
        paragraphs: [
          "Các bộ minifier hăng hái còn có thể gỡ dấu ngoặc thuộc tính, sắp lại thuộc tính, viết lại thuộc tính boolean và gộp các node văn bản kề nhau. Mỗi thứ tiết kiệm thêm vài byte nhưng nâng rủi ro: gỡ dấu ngoặc có thể va chạm với giá trị thuộc tính chứa khoảng trắng, gộp hăng có thể đổi các biên text node mà CSS hay script dựa vào. Công cụ này cố ý không làm điều nào.",
          "Sự bảo thủ ấy có lời ở các miền mà minify HTML được làm bằng tay nhiều nhất: template email và nội dung CMS legacy. Các trình duyệt email nổi tiếng bất nhất trong HTML chấp nhận, và template cũ thường dựa vào những quirk markup mà một bộ minifier tái cấu trúc sẽ âm thầm làm gãy. Một bộ minifier chỉ gỡ byte chứng minh được là vô hình thì an toàn để chạy trên markup bạn không thể thử nghiệm đầy đủ.",
          "Chú thích xứng đáng một lưu ý riêng. Chú thích tác giả an toàn để xóa, nhưng một số chú thích là code sống: conditional comment của IE, marker template phía máy chủ, thông báo bản quyền. Xóa tất cả đổi hành vi. Công cụ này gỡ chú thích thường nhưng giữ conditional comment, chính là cách phổ biến nhất khiến các bộ minifier ngây thơ làm gãy trang thật.",
        ],
      },
      {
        heading: "Min ngay trên thiết bị, nhất là với markup riêng tư",
        paragraphs: [
          "HTML bạn min thường không phải công khai: landing page chưa phát hành, dashboard nội bộ, template email có trường trộn dữ liệu khách hàng, markup staging với chú thích về giá chưa lên sóng. Tải tất cả lên dịch vụ web chỉ để gỡ khoảng trắng là rủi ro tránh được — nhiều bộ minifier trực tuyến thật sự POST tài liệu lên máy chủ của họ.",
          "Ở đây toàn bộ đường ống chạy trong trình duyệt của bạn: phân tích, biến đổi và con số dung lượng đều diễn ra bằng JavaScript cục bộ, không mạng nào tham gia. Template độc quyền và trang nội bộ được min mà không rời khỏi máy, và công cụ chạy offline — hữu ích khi bạn đang đánh bóng một trang trước khi nó có nơi để ở.",
          "Với triển khai thật, ghép nó với các bộ minifier CSS và JavaScript cho khoản lời lớn nhất, rồi dựa vào nén truyền (gzip hay brotli ở máy chủ) thứ áp đảo mọi thứ bộ minifier tiết kiệm. Công việc của bộ minifier là gỡ các byte mà định dạng truyền không gỡ được; nén của máy chủ xử lý phần còn lại.",
        ],
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
    deepDive: [
      {
        heading: "Năm nhóm và cách đọc chúng",
        paragraphs: [
          "Chữ số đầu của một mã trạng thái cho biết họ nào đang nói. 1xx là thông tin — tiếng l CRUD tạm thời như 100 Continue trong các lần tải lớn, không bao giờ là câu trả lời cuối. 2xx nghĩa là thành công dưới một hình thức nào: 200 là OK trơn, 201 báo một tài nguyên đã được tạo, 204 báo thành công mà không có gì gửi trả. 3xx là chuyển hướng — tài nguyên sống ở nơi khác. 4xx là lỗi của máy khách, 5xx là của máy chủ.",
          "Việc chia nhóm quan trọng khi gỡ lỗi vì nó giao trách nhiệm ngay lập tức. Một 4xx trong log của bạn thường nghĩa là máy khách gửi sai — thông tin xác thực sai (401), thiếu quyền (403), thân yêu cầu sai (400), hay hỏi một thứ không tồn tại (404). Một 5xx nghĩa là máy chủ gặp vấn đề nội bộ — ngoại lệ chưa xử lý (500), lỗi thượng nguồn (502 Bad Gateway), quá tải (503). Đọc nhóm trước biến một lỗi từ bí ẩn thành một hướng đi.",
          "Hai điều tinh tế đáng biết: 202 Accepted nghĩa là yêu cầu đã nhận nhưng chưa được xử lý — phổ biến với hàng đợi công việc async — và một 3xx không phải lúc nào cũng là chuyển hướng trình duyệt sẽ theo, vì 304 Not Modified là câu trả lời đàm phán cache mà không có thân nào cả.",
        ],
      },
      {
        heading: "Chuyển hướng, caching và các mã mọi người hay sai",
        paragraphs: [
          "Họ 3xx là nơi sai sót ngoài đời tập trung. 301 là vĩnh viễn: máy tìm kiếm chuyển điểm xếp hạng, và trình duyệt có thể cache chuyển hướng một cách hăng hái. 302 là tạm thời nhưng mơ hồ về phương thức — các máy khách lịch sử đổi POST thành GET sau một 302, chính là điều 307 cấm. Khi một POST phải sống sót qua chuyển hướng nguyên vẹn, 307 (tạm thời) hay 308 (vĩnh viễn) là câu trả lời đúng; 303 See Other là chỉ thị có chủ đích “đổi cái này thành GET”, kinh điển sau một form POST.",
          "Hành vi caching là nửa còn lại mà nhóm không nói cho bạn. Một 200 có thể cache được hay không tùy header; 304 tường minh là cái bắt tay cache; 410 Gone bảo máy khách ngừng hỏi, và máy tìm kiếm gỡ chỉ mục nó nhanh hơn 404. Mã trạng thái đặt khung, nhưng header quyết định chi tiết — vì vậy một API “trả 200 với đối tượng lỗi trong thân” làm gãy cache và retry ở khắp nơi: mã nói thành công, ngữ nghĩa nói thất bại.",
          "401 so với 403 xứng đáng có dòng riêng: 401 là về bản sắc (bạn chưa xác thực, thử lại với thông tin xác thực, thường kèm header WWW-Authenticate), trong khi 403 là về ủy quyền (bản sắc đã xác lập, truy cập bị từ chối). Trả 403 cho việc thiếu đăng nhập thay vì 401 là một trong những lỗi thiết kế API phổ biến nhất — máy khách không thể biết việc xác thực lại có giúp gì không.",
        ],
      },
      {
        heading: "Một cẩm nang ở lại trên máy của bạn",
        paragraphs: [
          "Trang này là một tham chiếu tĩnh render cục bộ trong trình duyệt của bạn: không yêu cầu tra cứu nào được thực hiện khi bạn tìm hay bấm, và sau khi trang tải xong nó chạy offline. Thiết kế ấy phù hợp với cách nó được dùng — giữa chừng một sự cố, trong một cuộc gọi, với log production mở và mạng gãy nửa chừng. Tính năng bấm-để-sao-chép tồn tại vì mã trạng thái thường kết thúc trong báo cáo lỗi, runbook và code review, từng phím bấm một.",
          "Mã trạng thái đến từ các chuẩn HTTP (các nhóm lõi trong RFC 9110 và các bạn, các mã mở rộng HTTP/2 như 425, và mã 418 ngày Cá tháng Tư cuối cùng được chính thức đặt chỗ), và tập hợp hiếm khi mở rộng — các bổ sung được áp dụng rộng rãi cuối cùng là các chẩn đoán cụ thể hơn của dải 4xx. Cẩm nang này phủ tập hợp thực dụng và giải thích từng cái bằng ngôn ngữ đời thường thay vì văn bản đặc tả.",
          "Ghép nó với trình phân tích URL khi gỡ lỗi: một 301 hay 302 vô nghĩa cho đến khi bạn thấy header Location trỏ đi đâu, và parser hiển thị cấu trúc URL đích trực tiếp.",
        ],
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
    deepDive: [
      {
        heading: "Min, gzip và cái gì thật sự tiết kiệm byte",
        paragraphs: [
          "Minification và nén là hai tầng khác nhau, và biết tầng nào làm việc quan trọng đấy. Minification là viết lại văn bản có mất dữ liệu: chú thích và khoảng trắng bị gỡ, tên bị rút ngắn, câu lệnh được gộp. Gzip hay Brotli là nén truyền không mất dữ liệu áp dụng sau đó. Khoảng trắng nén cực kỳ tốt — riêng gzip có thể co một script dài dòng 70–80% — nên khoản tiết kiệm cận biên của bộ minifier nhỏ hơn nhiều so với phần trăm thô của nó.",
          "Lý do thật để min không phải dư thừa gzip mà là chi phí phân tích và thực thi: mỗi chú thích và ký tự định dạng mà trình duyệt phải phân tích là thời gian CPU trên thiết bị của khách truy cập, điều có ý nghĩa trên điện thoại cấu hình thấp. Cũng nhớ rằng gỡ chú thích có chi phí ẩn nếu bạn dựa vào chú thích nội dòng — một số công cụ (nguồn-đồ dù đứng ngoài, một số bundler và framework đọc các chỉ thị như /*#__PURE__*/ từ chú thích) cần những marker ấy sống sót.",
          "Công cụ này cố ý đi làn bảo thủ: nó gỡ chú thích và gộp dòng trống nhưng giữ xuống dòng giữa các câu lệnh. Nếu bạn phục vụ đầu ra với gzip hay Brotli bật, bạn thu được phần lớn khoản tiết kiệm sẵn có mà không cần bước build — và không có rủi ro nào từ các phép viết lại gây mangled, inline hay đổi tên làm code ứng xử khác dự kiến.",
        ],
      },
      {
        heading: "Tự động chèn dấu chấm phẩy — lý do xuống dòng được giữ",
        paragraphs: [
          "JavaScript là ngôn ngữ chính thống duy nhất mà xóa một xuống dòng có thể đổi hành vi chương trình. Tự động chèn dấu chấm phẩy (ASI) chèn dấu chấm phẩy dựa trên biên dòng và các quy tắc cụ thể: một return theo sau bởi xuống dòng trả về undefined, không phải biểu thức ở dòng dưới; a++ đứng một mình trên một dòng, phép gán tiếp tục qua nhiều dòng — tất cả phụ thuộc vào chỗ ngắt. Ghép tất cả vào một dòng một cách ngây thơ là gộp các biên ấy và âm thầm viết lại ngữ nghĩa.",
          "Vì vậy các bộ minifier đầy đủ phải phân tích file thành AST trước khi đụng vào — chúng phát lại code nơi các rủi ro ASI được giải tường minh. Bất kỳ công cụ nào chỉ xóa khoảng trắng mà không phân tích (như các bộ minifier regex nhanh) có thể cho ra code chạy khác nguồn. Công cụ này né hoàn toàn lớp lỗi ấy bằng cách giữ các xuống dòng tại biên câu lệnh nguyên vẹn.",
          "Sự đánh đổi là trung thực: bạn nhận một file lớn hơn một chút so với đầu ra của Terser, đổi lấy cam kết hành vi tương đương về cấu trúc từng byte. Với script nhúng trong trang, extension, user style hay môi trường không có đường ống build, cam kết ấy thường đáng giá vài byte.",
        ],
      },
      {
        heading: "Mã nguồn của bạn ở lại trên thiết bị",
        paragraphs: [
          "Dán mã nguồn chưa phát hành vào một công cụ web là một quyết định niềm tin, và đa số lập trình viên đưa ra quá dễ dàng. Code bạn sắp lên sóng có thể chứa tên nội bộ, endpoint API, thông tin xác thực bị chú thích hay logic độc quyền. Tải nó lên một bộ minifier bên thứ ba nghĩa là máy chủ của người lạ lưu một bản sao công việc pre-release của bạn — không hợp đồng, không kiểm toán, không cam kết xóa.",
          "Công cụ này xử lý mọi thứ trong trình duyệt của bạn: bộ minifier là JavaScript chạy cục bộ trên đầu vào của bạn, không có yêu cầu mạng nào mang code của bạn đi đâu. Con số tiết kiệm byte được tính tại chỗ. Sau khi trang tải xong, bạn có thể ngắt mạng và tiếp tục min.",
          "Với các nhóm có đường ống thật, hãy tiếp tục dùng Terser/esbuild trong CI nơi source map và bundle được quản lý đàng hoàng. Với một file đơn lẻ, một lần kiểm nhanh những gì production sẽ phục vụ, hay một codebase không có hệ thống build, đây là con đường không-cài-đặt, không-rủi-ro.",
        ],
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
    deepDive: [
      {
        heading: "Định dạng đổi khoảng trắng, không bao giờ đổi ý nghĩa",
        paragraphs: [
          "Beautification thuần túy là một thao tác khoảng trắng: đầu vào được phân tích thành một cấu trúc dữ liệu, rồi tuần tự hóa lại với thụt lề bạn chọn. Khóa, giá trị, độ sâu lồng và thứ tự khóa ra đúng như lúc vào — hai tài liệu JSON chỉ khác khoảng trắng phân tích thành cùng một giá trị và thay thế được cho nhau với bất kỳ chương trình nào tiêu thụ chúng.",
          "Một điểm tinh tế đáng biết: định dạng số có thể dịch chuyển trong hiển thị. Số JSON được phân tích thành số thực IEEE-754, nên các số nguyên rất lớn — bất kỳ cái nào trên 2^53, như ID snowflake — có thể in với các chữ số bị làm tròn. Giá trị vốn đã mất chính xác từ lúc phân tích trong mọi JavaScript engine; bộ định dạng không bịa ra phép làm tròn. Khi các chữ số chính xác quan trọng, ID nên đi trong JSON của bạn dưới dạng chuỗi.",
          "Điều định dạng không thể làm là sắp lại hay đổi tên bất cứ gì. Một số công cụ cung cấp sắp khóa như tùy chọn thêm, tiện cho việc diff file cấu hình, nhưng hãy coi nó là một bước riêng có chủ đích — một bộ định dạng âm thầm sắp lại khóa khiến so sánh từng byte với bản gốc trở nên bất khả thi.",
        ],
      },
      {
        heading: "Chọn độ rộng thụt lề",
        paragraphs: [
          "Hai khoảng trắng là chuẩn trên thực tế trong hệ sinh thái JavaScript — các package npm, đa số cẩm nang phong cách và phần lớn codebase frontend dùng nó, nên là mặc định an toàn nhất khi dán vào codebase của nhóm. Bốn khoảng trắng vẫn phổ biến trong code doanh nghiệp cũ và vùng gần Java. Tab thắng về khả năng tiếp cận: mỗi người đọc đặt riêng độ rộng hiển thị, với cái giá là các file trộn tab/khoảng trắng hiển thị không nhất quán.",
          "Độ rộng quan trọng hơn vẻ ngoài vì diff nhạy với khoảng trắng. Nếu linter của nhóm ép hai khoảng trắng mà bạn định dạng bằng bốn, mọi dòng hiện là đã đổi trong review dù không gì ngữ nghĩa di chuyển. Hãy khớp quy ước của đích đến của file trước khi dán đầu ra.",
          "Cho việc soi nhanh một lần — đọc phản hồi API, kiểm tra một dòng log — lựa chọn thụt lề thuần túy là khẩu vị. Chọn cái nào khiến độ sâu lồng dễ theo nhất với mắt bạn; công cụ cập nhật trực tiếp, nên đổi không tốn gì.",
        ],
      },
      {
        heading: "Làm đẹp để đọc, min để giao, tất cả trên thiết bị",
        paragraphs: [
          "Định dạng và min là hai đầu của một quy trình. Pretty-print cho con người: code review, gỡ lỗi, so sánh payload. Minify cho máy: truyền, lưu trữ và cache, nơi từng byte thụt lề là sức chết. Công cụ này ghép cặp với bộ minifier JSON — làm đẹp để soi một payload đến, min trước khi gửi đi.",
          "Khác với các bộ định dạng trình soạn thảo, không cần cài hay cấu hình gì: không dự án, không plugin, không phải lưu file ra đĩa chỉ để định dạng lại. Dán, đọc, sao chép. Điều đó khiến nó là vòng lặp nhanh nhất cho trường hợp phổ biến nhất — một payload từ một tab trình duyệt bạn sẽ đóng trong một phút.",
          "JSON của bạn được phân tích hoàn toàn trong tab trình duyệt này. Phản hồi từ API staging, dòng log có dữ liệu người dùng và file cấu hình chứa bí mật chưa từng chạm vào máy chủ — công cụ còn chạy offline, nên một cú giật VPN hay một chuyến bay không cắt ngang buổi gỡ lỗi.",
        ],
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
    deepDive: [
      {
        heading: "Khoảng trắng miễn phí trong JSON — trừ khi ở trong chuỗi",
        paragraphs: [
          "Ngữ pháp JSON định nghĩa khoảng trắng (khoảng trắng, tab, xuống dòng) là bỏ qua được giữa các token: giữa khóa và giá trị của một đối tượng, giữa các phần tử mảng, quanh các ngoặc. Gỡ nó cho ra một tài liệu phân tích thành đúng cùng một giá trị — vì vậy minification ở đây là một biến đổi không mất dữ liệu, khác với nén ảnh hay âm thanh.",
          "Nơi duy nhất khoảng trắng thiêng liêng là trong giá trị chuỗi. “hello world” với khoảng trắng bị gộp là một giá trị khác. Một bộ minifier đúng đi qua ngữ pháp chứ không áp thay thế văn bản mù quáng — vì vậy đầu vào phải là JSON hợp lệ trước, và một tài liệu không hợp lệ nhận lỗi dòng-và-cột thay vì một dòng một mảnh.",
          "Một điểm tinh tế mà con số dung lượng làm lộ: số và tên khóa không bị đụng. Một bộ minifier không làm tròn 3.14159, không sắp lại khóa hay rút ngắn “someVeryLongKeyName” — tất cả những điều đó sẽ đổi dữ liệu. Mọi thứ tiết kiệm được đến từ định dạng, vì vậy phần trăm chênh nhau nhiều giữa một file thụt lề bốn khoảng và một file thụt lề tab.",
        ],
      },
      {
        heading: "Minification mua được gì — và nén làm gì thay",
        paragraphs: [
          "JSON đã min thường co 30–60% so với đầu vào pretty-printed, tùy độ sâu thụt lề. Với phản hồi API, con số ấy ít quan trọng hơn vẻ ngoài, vì nén truyền ăn phần lớn cùng các byte: gzip và brotli gộp thụt lề lặp lại và tên khóa gần như miễn phí. Bản min vẫn thắng bên trên — tỉ lệ nén cải thiện một khi dư thừa đã mất — nhưng khoản lời cận biên mỗi phản hồi khiêm tốn.",
          "Nơi minification thật sự có lời: lưu trữ ở quy mô (log, kho sự kiện, fixture nhúng), trao đổi file máy-với-máy nơi từng megabyte truyền hay đĩa đều đắt, và JSON nhúng trong các tài liệu khác — một thẻ script, một data attribute, một chuỗi cấu hình — nơi thụt lề nhân lên qua hàng nghìn lần lặp.",
          "Hãy giữ phiên bản định dạng làm nguồn sự thật. JSON min là cho máy; gỡ lỗi một bức tường token một dòng bằng mắt là một trò chơi thua. Ghép công cụ này với bộ định dạng: giữ file đẹp trong repo, min tại điểm dùng, và định dạng lại bất cứ khi nào một payload min cần đọc.",
        ],
      },
      {
        heading: "Co payload mà không gửi chúng đi đâu",
        paragraphs: [
          "JSON bạn min trước khi giao thường là nhạy cảm: cấu hình có endpoint và khóa, file bản dịch cho một sản phẩm chưa phát hành, bản ghi khách hàng xuất ra để di trú. Một bộ minifier tải tài liệu lên backend biến một bước tiết kiệm byte thuần cục bộ thành một cú xuất dữ liệu — nên bộ này chạy hoàn toàn bằng JavaScript trong trình duyệt của bạn.",
          "Thực thi cục bộ còn nghĩa là không trần kích thước và không độ trễ: một bản xuất nhiều megabyte được min dễ dàng như một đoạn ngắn, và toàn bộ luồng chạy offline. Không gì được ghi log, nên các lần lặp trên cùng một file không để lại vết.",
          "Một quy trình giữ bạn trung thực: min một bản sao, không bao giờ bản gốc. Công cụ cho bạn khoản tiết kiệm byte chính xác để quyết định dạng gọn có đáng duy trì không — với cấu hình do máy tiêu thụ thường là có; với file con người còn chỉnh, nguồn định dạng cộng đầu ra min lúc build thắng file min bằng tay trong mọi trường hợp.",
        ],
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
  "extract-audio": {
    name: 'Video sang MP3',
    tagline: 'Tách track âm thanh từ bất kỳ video nào thành MP3 — MP4, MOV, WebM và hơn thế, chuyển đổi hoàn toàn trong trình duyệt bằng ffmpeg.wasm. Không tải lên, không máy chủ.',
    intro: ['Bài giảng để nghe trên đường đi, bản ghi podcast mắc kẹt trong file video, cuộc phỏng vấn bạn muốn thành âm thanh để phiên âm, soundtrack cho điện thoại — công cụ này tách track âm thanh khỏi video và mã hóa thành MP3 chuẩn phát được ở mọi nơi.',
        'Việc chuyển đổi chạy trên ffmpeg.wasm — chính FFmpeg đã thúc đẩy vô số bộ chuyển desktop, được biên dịch sang WebAssembly và chạy trong bộ nhớ trình duyệt của bạn. Video được đọc từ đĩa vào hệ thống tập tin ảo trong bộ nhớ, tách luồng, track âm thanh được giải mã rồi mã hóa lại bằng libmp3lame, và kết quả trả về như một bản tải xuống. Không một byte video nào chạm mạng.',
        'Lần dùng đầu tải engine một lần (khoảng 31 MB); trình duyệt cache nó, mọi lần chuyển sau bắt đầu tức thì. Bản single-thread không cần SharedArrayBuffer: site chạy mọi nơi không cần header đặc biệt — và không gửi file của bạn cho ai.'],
    steps: ['Kéo thả một file video — MP4, MOV, WebM, MKV và các container phổ biến khác đều chạy.',
        'Chọn chất lượng MP3: 320 kbps cho nhạc, 192 kbps cho dùng chung, 128 kbps để tiết kiệm dung lượng với nội dung lời nói.',
        'Nhấn Trích xuất âm thanh và tải MP3. Video dài mất thời gian — thanh tiến độ phản ánh tiến độ mã hóa thực tế.'],
    faqs: [
        { q: 'Video của tôi có được tải lên đâu không?', a: 'Không. ffmpeg.wasm chạy trong bộ nhớ trình duyệt: video được đọc cục bộ vào hệ thống tập tin ảo, chuyển đổi, và MP3 được tạo trên thiết bị của bạn. Yêu cầu mạng duy nhất là tải engine một lần từ CDN công cộng — file của bạn không nằm trong đó.' },
        { q: 'Vì sao lần chuyển đầu chậm?', a: 'Lần chạy đầu tải engine WebAssembly (~31 MB) — chi phí một lần; sau đó cache của trình duyệt cung cấp tức thì. Bản thân việc chuyển chạy gần thời gian thực hoặc nhanh hơn: mã hóa âm thanh nhẹ hơn nhiều so với mã hóa lại video.' },
        { q: 'Chọn chất lượng nào?', a: '320 kbps trong suốt với nhạc; 192 kbps là điểm ngọt cho phần lớn nội dung kể cả podcast và bài giảng; 128 kbps giữ file lời nói nhỏ gọn. Lưu ý: MP3 không vượt quá chất lượng nguồn — video nguồn bitrate thấp vẫn thấp bất kể cài đặt.' },
        { q: 'Công cụ báo không tìm thấy track âm thanh — tại sao?', a: 'Vài video thật sự câm; một số container (stream .ts thô, vài .flv) bộ demux nhanh không xử lý được. Chuyển chúng sang MP4 trước, hoặc kiểm tra file có phát kèm âm thanh trong trình phát của bạn không.' },
    ],
  },
};