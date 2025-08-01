import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ترجمة الجمل
const resources = {
  en: {
    translation: {
      Posts: 'Posts',
      Profile: 'Profile',
      Photo: 'Photo',
      NewPassword: 'New Password',
      Logout: 'Logout',
      send:'send',
      Writeyourcommenthere:'Write your comment here...',
      comments : 'comments',
      Therearenopostsyet: 'There are no posts yet.',
      Shareyour: 'Share your thoughts or a special moment with others. Your first post will be a great start',
      Createyourfirstpost:'Create your first post',
      UploadProfilePicture: 'Upload Profile Picture',
      save: 'SAVE',
      ChangeYourPassword:'Change Your Password',
      CurrentPassword:'Current Password',
      NewPassword :'New Password',
      UpdatePassword:'Update Password',
      Currentpasswordisrequired:'Current password is required',
      Newpasswordisrequired : 'New password is required',
      Atleast8characters: 'At least 8 characters ',
      Max20characters:'Max 20 characters',
      Includeupperslowercasenumberspecialcharacter: 'Include upper/lowercase , number & special character',
      page: 'page',
      createyourpost : 'Create Your Post',
      Post:'Post',
      Postaddedsuccessfully:'Post added successfully',
      FailedtocreatepostTryagain : 'Failed to create post .Try again',
      Uploading :'Uploading...',
      Writeacommentbeforesending : 'Write a comment before sending',
      Commentadded : 'Comment added',
      Failedtosendcomment :'Failed t,o send comment',
      Passwordupdatedsuccessfully : 'Password updated successfully',
      Incorrectpasswordorerroroccurred : 'Incorrect password or error occurred',
      Postdeleted :'Post deleted',
      Failedtodelete: 'Failed to delete',
      Photoupdatedsuccessfully :'Photo updated successfully',
      Failedtoupdatephoto:'Failed to update photo',
      WelcomeBack :'Welcome Back',
      Logintoexploreposts :'Log in to explore posts, interact with users, and share your story.',
      EmailAddress:'Email Address',
      Password:'Password',
      Login:'Login',
      Emailisrequired:'Email is required',
      Invalidemail:'Invalid email',
      Min4characters:'Min 4 characters',
      Max60characters:'Max 60 characters',
      Passwordisrequired: 'Password is required',
      Min8characters:'Min 8 characters',
      Max20characters:'Max 20 characters',
      Nameisrequired:'Name is required',
      Max15characters:'Max 15 characters',
      Min3characters:'Min 3 characters',
      UseastrongpasswordlikeZiad42512:'Use a strong password like Ziad425@12',
      Confirmyourpassword:'Confirm your password',
      Passwordsmustmatch:'Passwords must match',
      Dateofbirthisrequired:'Date of birth is required',
      Genderisrequired:'Gender is required',
      CreateYourAccount:'Create Your Account',
      Joinnowandstart:'Join now and start posting your thoughts, photos, and stories',
      Name:'Name',
      Email:'Email',
      ConfirmPassword:'Confirm Password',
      Register:'Register',
      DateofBirth:'Date of Birth',
      Female:'Female',
      Male:'Male',
      Setting:'Setting',
      Login:'Login',
      Register:'Register',
      Pleaseselectavalidimagefile:'Please select avalid image file'

    }
  },
  ar: {
    translation: {
      Posts: 'المنشورات',
      Profile: 'الملف الشخصي',
      Photo: 'الصوره',
      NewPassword: 'تغير الرقم السري',
      Logout : 'تسجيل   خروج',
      send : 'ارسال',
      Writeyourcommenthere :'...اكتب تعليقك هنا',
      comments: 'التعليقات',
      Therearenopostsyet : '.لا توجد مشاركات حتى الآن',
      Shareyour :'شارك أفكارك أو لحظة مميزة مع الآخرين. ستكون مشاركتك الأولى بداية رائعة.',
      Createyourfirstpost :'أنشئ منشورك الأول',
     UploadProfilePicture : 'تحميل صورة الملف الشخصي',
     save : 'حفظ',
     ChangeYourPassword : 'تغيير كلمة المرور الخاصة',
     CurrentPassword : 'كلمة المرور الحالية',
     NewPassword: 'كلمة مرور جديدة',
     UpdatePassword: 'تحديث كلمة المرور',
     Currentpasswordisrequired : 'كلمة المرور الحالية مطلوبة',
     Newpasswordisrequired:'مطلوب كلمة مرور جديدة',
     Atleast8characters :'8 أحرف على الأقل',
     Max20characters:'الحد الأقصى 20 حرفًا',
     Includeupperslowercasenumberspecialcharacter: 'تضمين الأحرف الكبيرة/الصغيرة والأرقام والأحرف الخاصة',
     page: 'صفحه',
     createyourpost :'انشاء منشور',
     Post: 'نشر',
     Postaddedsuccessfully:'تمت الإضافة بنجاح',
     FailedtocreatepostTryagain:'فشل في إنشاء المنشور حاول مرة أخرى',
     Uploading :'...جاري النشر',
      Writeacommentbeforesending : 'اكتب تعليق قبل الارسال',
      Commentadded : 'تمت اضافه التعليق',
      Failedtosendcomment:'فشل في ارسال التعليق',
      Passwordupdatedsuccessfully :'تم تحديث كلمه المرور بنجاح',
      Incorrectpasswordorerroroccurred: 'كلمه المرور غير صحيحه',
      Postdeleted:'تم حذف المنشور',
      Failedtodelete:'فشل حذف المنشور',
      Photoupdatedsuccessfully: 'تم تحديث الصورة بنجاح',
      Failedtoupdatephoto: 'فشل تحديث الصورة',
      WelcomeBack: 'مرحبًا بعودتك',
      Logintoexploreposts:'.سجّل الدخول لاستكشاف المنشورات والتفاعل مع المستخدمين ومشاركة قصتك',
      EmailAddress:' البريد الإلكتروني',
      Password:'كلمة المرور',
      Login:'تسجيل الدخول',
      Emailisrequired: 'البريد الإلكتروني مطلوب',
      Invalidemail :'بريد إلكتروني غير صالح',
      Min4characters:'الحد الأدنى للأحرف 4',
      Max60characters :'الحد الأقصى 60 حرفًا',
      Passwordisrequired:'كلمة المرور مطلوبة',
      Min8characters:'الحد الأدنى 8 أحرف',
      Max20characters:'الحد الأقصى 20 حرفًا',
      Nameisrequired:'الاسم مطلوب',
      Max15characters:'الحد الأقصى 15 حرفًا',
      Min3characters:'الحد الأدنى 3 أحرف',
      UseastrongpasswordlikeZiad42512:'استخدم كلمة مرور قوية مثلZiad425@12',
      Confirmyourpassword:'تأكيد كلمة المرور الخاصة بك',
      Passwordsmustmatch:'يجب أن تتطابق كلمات المرور',
      Dateofbirthisrequired:'تاريخ الميلاد مطلوب',
      Genderisrequired:'الجنس مطلوب',
      CreateYourAccount:'إنشاء حسابك',
      Joinnowandstart:'انضم الآن وابدأ بنشر أفكارك وصورك وقصصك',
      Email:'البريد الإلكتروني',
      Name:'الاسم',
      ConfirmPassword:'تأكيد كلمة المرور',
      Register:'نسجيل',
      DateofBirth:'تاريخ الميلاد',
      Female:'انثي',
      Male:'ذكر',
      Setting:'الاعدادت',
      Login:'تسجيل الدخول',
      Register:"انشاء حساب",
      Pleaseselectavalidimagefile:'الرجاء تحديد ملف الصورة الصالحة'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
