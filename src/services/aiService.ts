import { Language } from '../types';

export interface AiResponseResult {
  text: string;
  category: 'lesson' | 'homework' | 'report' | 'quiz' | 'analysis' | 'general';
  topic?: string;
  codeSnippet?: string;
}

export class AiService {
  /**
   * Generates intelligent educational response for teachers.
   * Abstracted so backend Gemini API endpoint can be swapped transparently.
   */
  async generateResponse(
    prompt: string,
    language: Language = 'uz',
    studentContext?: { name?: string; group?: string; attendance?: number; progress?: number }
  ): Promise<AiResponseResult> {
    // Artificial realistic thinking latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lower = prompt.toLowerCase();

    // 1. Python loop problems / homework
    if (lower.includes('python') || lower.includes('loop') || lower.includes('sikl') || lower.includes('цикл')) {
      if (language === 'uz') {
        return {
          category: 'homework',
          topic: 'Python: While va For sikllari (10 ta masala)',
          codeSnippet: `# 1-Masala namunasi:
son = int(input("Son kiriting: "))
yigindi = 0
i = 1
while i <= son:
    yigindi += i
    i += 1
print(f"1 dan {son} gacha bo'lgan sonlar yig'indisi: {yigindi}")`,
          text: `### 🎯 Bugungi dars uchun 10 ta Python masalasi (O‘rtacha daraja)

**Guruh:** Python-003  
**Mavzu:** While va For sikllari, hisoblagichlar va to‘xtatish shartlari.

1. **Sonlar yig‘indisi:** Foydalanuvchi kiritgan $N$ sonigacha bo‘lgan barcha toq sonlar yig‘indisini \`while\` yordamida hisoblang.
2. **Kopaytirish jadvali:** Berilgan sonning 1 dan 10 gacha bo‘lgan ko‘paytirish jadvalini chiroyli ustun shaklida chiqaring.
3. **Parol tekshiruvi:** To‘g‘ri parol kiritilmaguncha takroran so‘raydigan va 3 ta noto‘g‘ri urinishdan so‘ng bloklaydigan dastur tuzing.
4. **Faktorial hisoblash:** Foydalanuvchi kiritgan musbat butun sonning faktorialini (\`n!\`) hisoblang.
5. **Raqamlar yig‘indisi:** Kiritilgan ixtiyoriy ko‘p xonali sonning raqamlari yig‘indisini topuvchi dastur.
6. **Teskari son:** Sonni teskari tartibda yozing (masalan, 1234 -> 4321).
7. **Tub sonni aniqlash:** Berilgan son faqat o‘ziga va 1 ga bo‘linishini tekshiring.
8. **Fibonachchi ketma-ketligi:** Dastlabki $N$ ta Fibonachchi sonlarini ekranga chiqaring.
9. **Taxmin qilish o‘yini:** Kompyuter 1 dan 50 gacha son o‘ylaydi. O‘quvchi topguncha maslahat beradi ("Kattaroq", "Kichikroq").
10. **Ro‘yxatdagi eng kattasi:** Sikl yordamida \`max()\` funksiyasisiz ro‘yxatdagi eng katta elementni toping.

💡 *O‘qituvchiga maslahat: 1-5 masalalarni darsda birgalikda tahlil qiling, 6-10 topshiriqlarni mustaqil ishlash uchun bering.*`,
        };
      } else if (language === 'ru') {
        return {
          category: 'homework',
          topic: 'Python: Задачи на циклы For и While',
          codeSnippet: `# Пример решения задачи на поиск суммы:
n = int(input("Введите число N: "))
total = sum(i for i in range(1, n + 1) if i % 2 != 0)
print(f"Сумма нечетных чисел: {total}")`,
          text: `### 🎯 10 практических задач по Python на циклы (Средний уровень)

**Группа:** Python-003  
**Цель:** Закрепление понимания условий выхода из цикла и работы со счетчиками.

1. **Сумма нечетных чисел:** Найти сумму всех нечетных чисел от 1 до $N$ с помощью цикла \`while\`.
2. **Таблица умножения:** Сгенерировать аккуратную таблицу умножения для заданного пользователем числа.
3. **Безопасный пароль:** Запрашивать ввод пароля до тех пор, пока не будет введен верный (максимум 3 попытки).
4. **Вычисление факториала:** Рассчитать факториал введенного числа $N!$.
5. **Сумма цифр числа:** Подсчитать сумму всех цифр любого введенного целого числа.
6. **Переворот числа:** Вывести число задом наперёд без использования срезов строк.
7. **Проверка на простоту:** Определить, является ли число простым.
8. **Ряд Фибоначчи:** Сгенерировать первые $N$ чисел Фибоначчи.
9. **Игра «Угадай число»:** Компьютер загадывает число от 1 до 50, подсказывая «Больше» или «Меньше».
10. **Поиск максимума в списке:** Найти максимальный элемент без использования встроенной функции \`max()\`.`,
        };
      } else {
        return {
          category: 'homework',
          topic: 'Python: While & For Loops Challenge Set',
          codeSnippet: `# Example Solution for Sum of Digits:
num = int(input("Enter number: "))
sum_digits = 0
while num > 0:
    sum_digits += num % 10
    num //= 10
print(f"Sum of digits: {sum_digits}")`,
          text: `### 🎯 10 Medium-Level Python Loop Problems

**Class:** Python-003  
**Objective:** Reinforce termination conditions, counters, and loop control statements.

1. **Sum of Odd Numbers:** Calculate the sum of all odd integers from 1 to $N$ using a \`while\` loop.
2. **Multiplication Table:** Print an aligned multiplication table for a user-specified number from 1 to 10.
3. **Password Authenticator:** Prompt the user until the correct passcode is provided (limit: 3 attempts).
4. **Factorial Calculator:** Compute the factorial ($N!$) of a given positive integer.
5. **Sum of Digits:** Calculate the sum of all individual digits in an arbitrary integer.
6. **Reverse Integer:** Reverse a number algorithmically without string slicing tricks.
7. **Prime Number Tester:** Verify whether a given integer has any divisors other than 1 and itself.
8. **Fibonacci Sequence:** Generate the first $N$ numbers in the Fibonacci sequence.
9. **Number Guessing Game:** Computer chooses a random number from 1 to 50; provide "Higher/Lower" hints.
10. **Manual Maximum:** Identify the highest value in an array without using the built-in \`max()\` method.`,
        };
      }
    }

    // 2. Parent Report
    if (lower.includes('parent') || lower.includes('ota') || lower.includes('родител') || lower.includes('xat') || lower.includes('письмо')) {
      const studentName = studentContext?.name || 'Ali Karimov';
      const groupName = studentContext?.group || 'Python-003';
      const att = studentContext?.attendance ?? 92;
      const prog = studentContext?.progress ?? 84;

      if (language === 'uz') {
        return {
          category: 'report',
          topic: `Ota-ona uchun xabarnoma: ${studentName}`,
          text: `### ✉️ Hurmatli ota-ona!

Assalomu alaykum! Ushbu xat orqali farzandingiz **${studentName}** ning **${groupName}** guruhidagi sentyabr oyi davomidagi o‘qish natijalari bilan tanishtirmoqchimiz.

#### 📊 Qisqacha ko‘rsatkichlar:
* **Darslarga qatnashish (Davomat):** ${att}% (Yuqori darajada)
* **Mavzularni o‘zlashtirish:** ${prog}%
* **Uyga vazifalarni bajarish:** 14 / 16 ta topshiriq muvaffaqiyatli topshirildi

#### 🌟 O‘qituvchi fikri va yutuqlar:
${studentName} darslarda nihoyatda faol va intiluvchan. Dasturlash asoslari va algoritmik mantiqni tez ilg‘ab olmoqda. Ayniqsa, sikllar va shartli operatorlar bo‘yicha topshiriqlarni sinfdoshlaridan oldinroq mustaqil yechishga harakat qiladi.

#### 🎯 Tavsiyalar:
Uydagi amaliyotni yanada mustahkamlash uchun haftasiga 2-3 marta 30 daqiqadan mustaqil kichik loyihalar ustida ishlashi tavsiya etiladi.

*Hamkorligingiz va farzandingiz taʼlimiga qaratayotgan eʼtiboringiz uchun samimiy minnatdorchilik bildiramiz!*

Hurmat bilan,  
**Azizbek Abduhakimov**  
*IT & Dasturlash fani o‘qituvchisi*`,
        };
      } else if (language === 'ru') {
        return {
          category: 'report',
          topic: `Отчет родителям: ${studentName}`,
          text: `### ✉️ Уважаемые родители!

Здравствуйте! Направляем вам регулярный ежемесячный отчет об успехах вашего ребенка **${studentName}** в группе **${groupName}**.

#### 📊 Ключевые показатели за сентябрь:
* **Посещаемость занятий:** ${att}% (Отличный результат)
* **Успеваемость и прогресс:** ${prog}%
* **Выполнение практических работ:** 14 из 16 заданий сдано вовремя

#### 🌟 Комментарий преподавателя:
${studentName} проявляет высокий интерес к программированию и логическому мышлению. Отлично справляется с практическими заданиями, проявляет инициативу и помогает одногруппникам.

#### 🎯 Рекомендации:
Рекомендуется выделять 25–30 минут дома на повторение синтаксиса и закрепление разобранных на уроках алгоритмов.

*Благодарим вас за поддержку и внимание к развитию ребенка!*

С уважением,  
**Азизбек Абдухакимов**  
*Преподаватель программирования*`,
        };
      } else {
        return {
          category: 'report',
          topic: `Parent Progress Report: ${studentName}`,
          text: `### ✉️ Dear Parents,

We are delighted to share the monthly progress report for **${studentName}** in **${groupName}**.

#### 📊 Performance Overview:
* **Class Attendance:** ${att}% (Outstanding commitment)
* **Curriculum Mastery:** ${prog}%
* **Practical Assignments:** 14 of 16 completed with top marks

#### 🌟 Teacher Evaluation:
${studentName} continues to show curiosity and solid problem-solving aptitude. Grasps core computational logic with ease and consistently volunteers during live coding challenges.

#### 🎯 Recommendations:
Encourage 20–30 minutes of independent coding practice twice a week to consolidate loop mechanics.

*Thank you for your sustained partnership and dedication to your child’s educational journey.*

Warm regards,  
**Azizbek Abduhakimov**  
*Computer Science & IT Educator*`,
        };
      }
    }

    // 3. Lesson Plan
    if (lower.includes('plan') || lower.includes('reja') || lower.includes('dars') || lower.includes('урок')) {
      if (language === 'uz') {
        return {
          category: 'lesson',
          topic: 'Dars rejasi: 90 daqiqalik interaktiv mashg‘ulot',
          text: `### 📋 90 Daqiqalik Dars Rejasi: "Python Funksiyalar va Modullar"

**Guruh:** Python-003  
**Davomiyligi:** 90 daqiqa (1 dars)  
**Kerakli jihozlar:** Noutbuklar, proyektor, GitHub Classroom.

---

#### 1. Kirish va O‘tgan mavzuni takrorlash (00:00 – 00:15)
* Davomatni belgilash (Teacher OS orqali 30 soniya)
* O‘tgan darsdagi \`while\` sikllari bo‘yicha 3 ta tezkor "blits-savol"
* Uyga vazifadagi qiyin bo‘lgan 1 ta masalani doskada yechish

#### 2. Yangi nazariy tushuncha (00:15 – 00:35)
* Nima uchun funksiya kerak? (DRY — Don't Repeat Yourself tamoyili)
* \`def\` kalit so‘zi, argumentlar va \`return\` natijasi
* Mahalliy (local) va global o‘zgaruvchilar farqi

#### 3. Interaktiv amaliy mashg‘ulot (00:35 – 01:10)
* *Mini-loyiha:* Oddiy konvertor funksiyasi (Valyuta: UZS -> USD)
* O‘quvchilar juftlikda ishlaydi: Biri funksiya yozadi, ikkinchisi test qiymatlari bilan tekshiradi.

#### 4. Qahramon masalasi & Kviz (01:10 – 01:25)
* 5 savoldan iborat interaktiv viktorina
* Eng tez va to‘g‘ri yozgan o‘quvchiga ball qo‘shish

#### 5. Xulosa va Uyga vazifa berish (01:25 – 01:30)
* Mavzuni 3 ta asosiy xulosa bilan yakunlash
* Uyga vazifani tushuntirish va Teacher OS ga yuklash`,
        };
      } else {
        return {
          category: 'lesson',
          topic: '90-Minute Structured Lesson Plan: Functions',
          text: `### 📋 Structured Lesson Plan: Python Functions & Modular Design

**Target Group:** Python-003  
**Duration:** 90 Minutes  
**Materials:** IDE, Interactive Projector, Code Exercises.

---

#### 1. Warm-Up & Rapid Review (00:00 – 00:15)
* Quick attendance marking via Teacher OS
* 3 lightning review questions on loop boundary invariants
* Debugging 1 common homework error live

#### 2. Core Concept Introduction (00:15 – 00:35)
* Why write functions? The DRY Principle (Don't Repeat Yourself)
* Syntax: \`def\`, parameters, return statements, and docstrings
* Local vs Global scope visualization

#### 3. Hands-On Guided Lab (00:35 – 01:10)
* Build a currency converter module (UZS to USD / EUR)
* Pair programming drill: driver writes logic, navigator tests edge cases

#### 4. Formative Assessment & Quiz (01:10 – 01:25)
* 5-question code-reading quiz
* Live code execution inspection

#### 5. Synthesis & Homework Assignment (01:25 – 01:30)
* Key takeaways review
* Homework assignment published on Teacher OS`,
        };
      }
    }

    // 4. Quiz questions
    if (lower.includes('quiz') || lower.includes('test') || lower.includes('savol') || lower.includes('вопрос')) {
      return {
        category: 'quiz',
        topic: 'Python Loops & Logic 5-Question Quiz',
        text: `### ❓ 5-Question Quick Diagnostic Quiz (With Solutions)

#### 1. What is the final output of the following snippet?
\`\`\`python
x = 1
while x < 5:
    x += 2
print(x)
\`\`\`
* A) 4
* B) 5 *(Correct)*
* C) 6
* D) Infinite loop

---

#### 2. Which statement immediately terminates the loop?
* A) \`continue\`
* B) \`pass\`
* C) \`break\` *(Correct)*
* D) \`return 0\`

---

#### 3. How many times will \`range(2, 10, 3)\` iterate?
* A) 3 times (values: 2, 5, 8) *(Correct)*
* B) 4 times
* C) 8 times
* D) 2 times

---

#### 4. What happens if a while loop condition never becomes False?
* A) Program stops with SyntaxError
* B) Memory clears automatically
* C) An Infinite Loop occurs *(Correct)*
* D) Python compiler fixes it automatically

---

#### 5. What will \`[i * 2 for i in range(3)]\` produce?
* A) \`[2, 4, 6]\`
* B) \`[0, 2, 4]\` *(Correct)*
* C) \`[0, 1, 2]\`
* D) \`[1, 2, 3]\``,
      };
    }

    // Default Fallback
    return {
      category: 'general',
      topic: 'Pedagogical Assistant Guidance',
      text: `### 🤖 Teacher OS AI Assistant

Men sizning darslaringizni samarali tashkil qilish, o‘quvchilar bilan ishlash va maʼmuriy vaqtingizni 70% ga qisqartirish uchun doim tayyorman.

**Sizga quyidagi amallarda yordam bera olaman:**
* 📝 **Dars rejalari:** 45, 60 yoki 90 daqiqalik mashg‘ulotlar uchun batafsil reja va slaydlar tuzilmasi
* 📚 **Topshiriqlar va amaliyot:** Oson, o‘rtacha va qiyin darajadagi dasturlash va mantiqiy masalalar
* 👨‍👩‍👦 **Ota-onalarga xat:** Har bir o‘quvchi natijalariga mos samimiy va professional xabarnomalar
* 📊 **Diagnostika va tahlil:** Davomat va baholarni umumlashtirib berish

*Yuqoridagi tezkor tugmalardan birini bosing yoki istalgan savolingizni yozing!*`,
    };
  }
}

export const aiService = new AiService();
