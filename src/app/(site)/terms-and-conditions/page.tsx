import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام | تمكين",
  description: "الشروط والأحكام لاستخدام تمكين.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-midnight-blue sm:text-3xl">
        الشروط والأحكام لتطبيق &quot;تمكين&quot;
      </h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-primary-text">
        <section>
          <h2 className="font-bold text-midnight-blue">1. القبول</h2>
          <p>باستخدام التطبيق، يقر ولي الأمر بالموافقة على هذه الشروط والأحكام.</p>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">2. طبيعة الخدمة</h2>
          <ul className="list-disc space-y-1 pe-6">
            <li>التطبيق يقدم محتوى تعليميًا رقميًا مسجلًا مسبقًا.</li>
            <li>لا توجد حصص مباشرة أو تفاعل حي مع معلمين.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">3. الاستخدام المسموح</h2>
          <ul className="list-disc space-y-1 pe-6">
            <li>استخدام التطبيق لأغراض تعليمية فقط.</li>
            <li>استخدام التطبيق تحت إشراف ولي الأمر.</li>
            <li>عدم إساءة استخدام التطبيق أو محاولة اختراقه.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">4. الحسابات</h2>
          <ul className="list-disc space-y-1 pe-6">
            <li>لا يتم إنشاء حسابات شخصية للأطفال.</li>
            <li>يتم استخدام معرف عشوائي فقط لتتبع التقدم داخل التطبيق.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">5. الاشتراكات والدفع</h2>
          <ul className="list-disc space-y-1 pe-6">
            <li>تتم جميع عمليات الدفع من خلال ولي الأمر عبر CCP أو BaridiMob.</li>
            <li>يتحمل ولي الأمر مسؤولية صحة المعلومات المقدمة.</li>
          </ul>
          <h3 className="mt-3 font-bold text-midnight-blue">سياسة الاسترجاع (Refund)</h3>
          <ul className="list-disc space-y-1 pe-6">
            <li>يمكن لولي الأمر طلب استرجاع المبلغ عبر التواصل معنا.</li>
            <li>يتم إعادة المبلغ عبر CCP أو BaridiMob.</li>
            <li>تتم معالجة طلبات الاسترجاع خلال مدة معقولة بعد التحقق من الطلب.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">6. الملكية الفكرية</h2>
          <ul className="list-disc space-y-1 pe-6">
            <li>جميع المحتويات (الدروس، التمارين، التصميم) مملوكة لتطبيق &quot;تمكين&quot;.</li>
            <li>يمنع نسخ أو إعادة نشر أو توزيع المحتوى دون إذن مسبق.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">7. حدود المسؤولية</h2>
          <ul className="list-disc space-y-1 pe-6">
            <li>نسعى لتقديم محتوى دقيق وعالي الجودة، لكن لا نضمن خلوه التام من الأخطاء.</li>
            <li>لا نتحمل أي مسؤولية عن سوء استخدام التطبيق.</li>
            <li>لا نتحمل أي مسؤولية عن الاعتماد الكامل على المحتوى دون إشراف.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">8. توفر الخدمة</h2>
          <ul className="list-disc space-y-1 pe-6">
            <li>قد يتم إيقاف التطبيق مؤقتًا لأغراض الصيانة أو التحديث.</li>
            <li>لا نضمن توفر الخدمة بشكل دائم دون انقطاع.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">9. الصلاحيات والتثبيت</h2>
          <ul className="list-disc space-y-1 pe-6">
            <li>
              يتطلب تثبيت التطبيق تفعيل خيار &quot;تثبيت التطبيقات من مصادر غير معروفة&quot;
              على جهاز المستخدم.
            </li>
            <li>التطبيق لا يطلب أي صلاحيات حساسة من الجهاز.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">10. إنهاء الاستخدام</h2>
          <p>يحق لنا تعليق أو إيقاف الوصول في حال مخالفة الشروط.</p>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">11. التعديلات</h2>
          <ul className="list-disc space-y-1 pe-6">
            <li>يمكن تعديل هذه الشروط في أي وقت.</li>
            <li>استمرار الاستخدام يعني الموافقة على التعديلات.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">12. القانون المعمول به</h2>
          <p>تخضع هذه الشروط للقوانين المعمول بها في الجزائر.</p>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">13. التواصل</h2>
          <p>يمكن لولي الأمر التواصل معنا عبر:</p>
          <ul className="list-disc space-y-1 pe-6">
            <li>البريد الإلكتروني: support@tamkeen.app</li>
            <li>رقم الهاتف لأي دعم أو استفسار: 0555677816</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
