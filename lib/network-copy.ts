import type { Locale } from './site';
import type { ToolCopy } from '@/tools/_lib/types';
import { processingInfo } from './tool-processing';

const QUESTIONS: Record<Locale, [string, string, string]> = {
 en:['What is sent to an external service?', 'Are the data and service unlimited or guaranteed?', 'No. External providers can apply quotas, outages and coverage limits. IP geolocation is approximate; registration records can be redacted or unavailable. A failed lookup is not proof that a domain or IP does not exist.'],
 zh:['哪些内容会发送给外部服务？','数据和服务是否无限量或有保证？','不是。外部服务可能有额度、故障和覆盖限制。IP 定位只是估算，注册资料可能被隐藏或不可用；查询失败不代表域名或 IP 不存在。'],
 ja:['外部に何を送信しますか？','データや利用回数は無制限で保証されますか？','いいえ。外部サービスには利用枠・障害・対象範囲の制限があります。IP 位置は概算で、登録情報が非公開の場合もあります。検索失敗はドメインや IP の不存在を証明しません。'],
 es:['¿Qué se envía a un servicio externo?','¿Los datos y el servicio son ilimitados o garantizados?','No. Los proveedores pueden imponer cuotas, sufrir fallos y tener cobertura limitada. La geolocalización IP es aproximada y los registros pueden estar ocultos. Un fallo no demuestra que el dominio o IP no exista.'],
 pt:['O que é enviado a um serviço externo?','Os dados e o serviço são ilimitados ou garantidos?','Não. Provedores podem ter cotas, falhas e cobertura limitada. A localização IP é aproximada e registros podem estar ocultos. Uma falha não prova que o domínio ou IP não existe.'],
 fr:['Que transmet-on à un service externe ?','Les données et le service sont-ils illimités ou garantis ?','Non. Les fournisseurs peuvent appliquer des quotas, subir des pannes et limiter la couverture. La géolocalisation IP est approximative et les registres peuvent être masqués. Un échec ne prouve pas une inexistence.'],
 de:['Was wird an externe Dienste gesendet?','Sind Daten und Dienst unbegrenzt oder garantiert?','Nein. Anbieter können Kontingente, Ausfälle und Abdeckungslücken haben. IP-Ortung ist ungefähr, Registrierungsdaten können verborgen sein. Eine fehlgeschlagene Abfrage beweist keine Nichtexistenz.'],
 ru:['Что передаётся внешнему сервису?','Данные и сервис безлимитны и гарантированы?','Нет. У поставщиков бывают квоты, сбои и пробелы покрытия. Геолокация IP приблизительна, регистрационные записи могут быть скрыты. Сбой не доказывает отсутствие домена или IP.'],
 it:['Cosa viene inviato a servizi esterni?','Dati e servizio sono illimitati o garantiti?','No. I fornitori possono applicare quote, subire guasti e avere copertura limitata. La posizione IP è approssimativa e i registri possono essere nascosti. Un errore non prova che il dominio o IP non esista.'],
 tr:['Harici hizmete ne gönderilir?','Veri ve hizmet sınırsız veya garantili mi?','Hayır. Sağlayıcılar kota, kesinti ve kapsam sınırları uygulayabilir. IP konumu yaklaşık, kayıt bilgileri gizli olabilir. Başarısız sorgu, alan adı veya IP’nin yokluğunu kanıtlamaz.'],
 ko:['외부 서비스에 무엇을 보내나요?','데이터와 서비스가 무제한이거나 보장되나요?','아니요. 제공자 할당량·장애·범위 제한이 있을 수 있습니다. IP 위치는 추정치이며 등록 정보가 숨겨질 수 있습니다. 조회 실패가 도메인이나 IP 부재를 증명하지는 않습니다.'],
 ar:['ما الذي يرسل إلى خدمة خارجية؟','هل البيانات والخدمة غير محدودة أو مضمونة؟','لا. قد يفرض المزود حصصاً أو يتعطل أو يحد التغطية. موقع IP تقريبي وقد تحجب سجلات التسجيل. فشل البحث لا يثبت عدم وجود النطاق أو IP.'],
 hi:['बाहरी सेवा को क्या भेजा जाता है?','क्या डेटा और सेवा असीमित या गारंटी वाले हैं?','नहीं। प्रदाता की सीमा, खराबी और कवरेज की कमी हो सकती है। IP स्थान अनुमानित है और पंजीकरण जानकारी छिपी हो सकती है। विफल खोज से डोमेन या IP का न होना सिद्ध नहीं होता।'],
 id:['Apa yang dikirim ke layanan eksternal?','Apakah data dan layanan tanpa batas atau dijamin?','Tidak. Penyedia dapat menerapkan kuota, mengalami gangguan dan membatasi cakupan. Lokasi IP adalah perkiraan dan catatan pendaftaran dapat disembunyikan. Kegagalan bukan bukti domain atau IP tidak ada.'],
 vi:['Dữ liệu nào gửi đến dịch vụ ngoài?','Dữ liệu và dịch vụ có vô hạn hoặc bảo đảm không?','Không. Nhà cung cấp có thể áp hạn mức, gặp sự cố và thiếu phạm vi. Vị trí IP là ước tính, hồ sơ đăng ký có thể bị ẩn. Tra cứu lỗi không chứng minh tên miền hay IP không tồn tại.'],
};

/** Replace obsolete blanket claims on the two provider-backed lookup pages. */
export function lookupCopy(slug: string, locale: Locale, base: ToolCopy): ToolCopy {
  const info=processingInfo(slug,locale);
  const [question,limitsQuestion,limits]=QUESTIONS[locale];
  return {...base, intro:[info.note,limits],faqs:[{q:question,a:info.note},{q:limitsQuestion,a:limits}],deepDive:undefined};
}
