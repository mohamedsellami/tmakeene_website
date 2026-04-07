import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | تمكين",
  description: "سياسة الخصوصية لتطبيق تمكين.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-midnight-blue sm:text-3xl">
        سياسة الخصوصية لتطبيق &quot;تمكين&quot;
      </h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-primary-text">
        <section>
          <h2 className="font-bold text-midnight-blue">1. مقدمة</h2>
          <p>
            نحن في تطبيق &quot;تمكين&quot; نلتزم بحماية خصوصية المستخدمين، خاصة الأطفال.
            تم تصميم التطبيق ليكون بيئة تعليمية آمنة لا تعتمد على جمع أو معالجة
            أي بيانات شخصية تخص الأطفال.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">2. الفئة المستهدفة</h2>
          <p>
            هذا التطبيق موجه للأطفال لأغراض تعليمية، ويتم استخدامه تحت إشراف
            أولياء الأمور.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">3. بيانات الأطفال</h2>
          <p>نحن لا نقوم بما يلي:</p>
          <ul className="list-disc space-y-1 pe-6">
            <li>
              جمع أي معلومات شخصية من الأطفال (مثل الاسم، البريد الإلكتروني، رقم
              الهاتف، الموقع الجغرافي).
            </li>
            <li>إنشاء حسابات شخصية للأطفال.</li>
            <li>تمكين أي وسيلة تواصل بين الأطفال أو مع أطراف خارجية.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">4. آلية التعريف داخل التطبيق</h2>
          <ul className="list-disc space-y-1 pe-6">
            <li>يتم إنشاء معرف عشوائي (Random ID) لكل مستخدم.</li>
            <li>هذا المعرف لا يحتوي على أي معلومات تعريف شخصية.</li>
            <li>لا يمكن استخدام هذا المعرف لتحديد هوية الطفل أو تتبعه خارج نطاق التطبيق.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">5. بيانات الاستخدام (تحليلات داخلية محدودة)</h2>
          <p>نقوم بتسجيل بعض البيانات التقنية المرتبطة بالمعرف العشوائي فقط، مثل:</p>
          <ul className="list-disc space-y-1 pe-6">
            <li>التقدم في الدروس</li>
            <li>وقت إكمال الأنشطة</li>
          </ul>
          <ul className="list-disc space-y-1 pe-6 mt-2">
            <li>هذه البيانات لا ترتبط بأي معلومات شخصية.</li>
            <li>تُستخدم هذه البيانات فقط لتحسين جودة المحتوى والتجربة التعليمية.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">6. بيانات أولياء الأمور</h2>
          <p>قد يُطلب من ولي الأمر تقديم:</p>
          <ul className="list-disc space-y-1 pe-6">
            <li>الاسم الكامل</li>
            <li>رقم الهاتف</li>
          </ul>
          <p className="mt-2">استخدام هذه البيانات:</p>
          <ul className="list-disc space-y-1 pe-6">
            <li>التواصل بخصوص الاشتراكات أو الدفع</li>
            <li>الرد على الاستفسارات</li>
            <li>حل المشاكل التقنية</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">7. مشاركة البيانات</h2>
          <ul className="list-disc space-y-1 pe-6">
            <li>لا نقوم ببيع أو تأجير أو مشاركة بيانات أولياء الأمور مع أي طرف ثالث.</li>
            <li>لا تتم مشاركة أي بيانات تخص الأطفال (كونها غير موجودة أساسًا).</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">8. مدة الاحتفاظ بالبيانات</h2>
          <ul className="list-disc space-y-1 pe-6">
            <li>يتم الاحتفاظ ببيانات أولياء الأمور فقط للمدة اللازمة لتقديم الخدمة.</li>
            <li>يمكن حذف البيانات عند طلب ولي الأمر.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">9. حماية البيانات</h2>
          <p>نلتزم باتخاذ الإجراءات التقنية والتنظيمية المناسبة لحماية البيانات من:</p>
          <ul className="list-disc space-y-1 pe-6">
            <li>الوصول غير المصرح به</li>
            <li>التعديل أو الإفشاء</li>
            <li>الفقدان</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">10. حقوق أولياء الأمور</h2>
          <p>يحق لولي الأمر:</p>
          <ul className="list-disc space-y-1 pe-6">
            <li>طلب الاطلاع على بياناته</li>
            <li>طلب تعديلها</li>
            <li>طلب حذفها</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">11. التعديلات على السياسة</h2>
          <p>
            قد يتم تحديث هذه السياسة من وقت لآخر. استمرار استخدام التطبيق يعني
            الموافقة على النسخة المحدثة.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-midnight-blue">12. التواصل</h2>
          <p>لأي استفسارات متعلقة بالخصوصية، يمكن التواصل عبر:</p>
          <ul className="list-disc space-y-1 pe-6">
            <li>البريد الإلكتروني: tamkeene.app@gmail.com</li>
            <li>رقم الهاتف: 0555677816</li>
          </ul>
        </section>

        <section className="rounded-[10px] border border-light-grey bg-off-white p-4">
          <h2 className="font-bold text-midnight-blue">رسالة طمأنة للأولياء</h2>
          <p className="mt-2">
            نحن ندرك أن أمان الأطفال هو الأولوية الأولى لكل ولي أمر. تم تصميم
            تطبيق &quot;تمكين&quot; ليكون بيئة تعليمية مغلقة وآمنة:
          </p>
          <ul className="mt-2 list-disc space-y-1 pe-6">
            <li>لا يوجد تواصل مع غرباء</li>
            <li>لا يتم جمع بيانات شخصية للأطفال</li>
            <li>كل المحتوى تعليمي ومراقب مسبقًا</li>
            <li>
              هدفنا هو توفير تجربة تعليمية مفيدة وآمنة يمكنكم الوثوق بها
              لأبنائكم.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
