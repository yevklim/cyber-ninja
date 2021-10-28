import shield from './imgs/shield.svg';
import PersonalDataDefense from './imgs/PersonalDataDefense.svg'
import CorpDataDefense from './imgs/CorpDataDefense.svg'
import DefenseBreak from './imgs/DefenseBreak.svg'
import Virus from './imgs/Virus.svg'
import Worm from './imgs/Worm.svg'
import Trojan from './imgs/Trojan.svg'
import RootKit from './imgs/Rootkit.svg'
import BackDoor from './imgs/Backdoor.svg'
import Downloader from './imgs/Downloader.svg'
import Phishing from './imgs/Phishing.svg'
import Ransomware from './imgs/Ransomware.svg'
import DoS from './imgs/DoS.svg'
import MitM_H from './imgs/MitM-H.svg'
import SQLInjection from './imgs/SQLInjection.svg'
import ZeroDay from './imgs/0day.svg'
import BruteForce from './imgs/BruteForce.svg'
import React from 'react';
import './App.css';

function Shield(props) {
  return (
    <img className="Shield" src={shield} alt="Shield" />
  )
}

function Page(props) {
  let translateModifier = 1.0;
  if (props.translateModifier !== undefined) translateModifier = props.translateModifier;
  let className = props.className !== undefined ? ["Page", ...props.className.split(" ")].join(" ") : "Page";

  let style = { opacity: 1.0, zIndex: 1, transform: "" };
  var delta = props.index - props.activeIndex;
  // delta /= 2;

  style.opacity = Math.max(1 - (2 * delta) ** 2, 0);
  style.zIndex = style.opacity + 1;
  // style.opacity = 1.0;

  let translateY = 25 * translateModifier * delta;
  let scale = Math.max(1 - (.25 * delta), 0);
  style.transform = `translate(0, ${translateY}%) scale(${scale})`;

  return (
    <div id={props.id} className={className} style={style}>
      {props.children}
    </div>
  );
}

function Container(props) {
  let className = props.className ? ["Container", ...props.className.split(" ")].join(" ") : "Container";
  return (
    <div { ...props } className={ className }>
      {props.children}
    </div>
  );
}

function SubContainer(props) {
  let className = props.className ? ["SubContainer", ...props.className.split(" ")].join(" ") : "SubContainer";
  return (
    <div { ...props } className={ className }>
      {props.children}
    </div>
  );
}

class Pager extends React.Component {
  constructor(props = { scrollSnap: true }) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  handleScroll(e) {
    const element = e.currentTarget;
    let activeIndex = element.scrollTop / element.clientHeight;

    if (element.scrollHeight === element.clientHeight + element.scrollTop)
      activeIndex = Math.round(activeIndex);

    this.setState({ activeIndex });

    let approx = 0.2;
    let fraction = activeIndex % 1;
    if (fraction < approx || fraction > 1 - approx) {
      activeIndex = Math.round(activeIndex);
    }

    if (!this.props.scrollSnap) return;

    if (this.scrollingTimeOut !== undefined)
      clearTimeout(this.scrollingTimeOut);

    this.scrollingTimeOut = setTimeout(
      (element, activeIndex) => {
        let scrollTopRounded = Math.round(activeIndex) * element.clientHeight;
        element.scrollTo(0, scrollTopRounded);
      }, 150, element, activeIndex);

  }

  wrapArrayInPages(array, firstKey=0, firstIndex=0) {
    let outArray = [];
    if (!Array.isArray(array)) return array;
    array.map((child, index) => {
      if (React.isValidElement(child)) {
        outArray.push(
          <Page
            key={firstKey + outArray.length}
            activeIndex={this.state.activeIndex}
            index={firstIndex + outArray.length}
            translateModifier={this.props.translateModifier}>
            {child}
          </Page>
        );
      } else
      if (Array.isArray(child)) {
        outArray.push(...this.wrapArrayInPages(child, firstKey + outArray.length, firstIndex + outArray.length));
      } else {
        outArray.push(child);
      }
      return child;
    });
    return outArray;
  }

  children() {
    if (!this.props.children) return [];
    let children = []
    if (this.props.header) children.push(<div key={0} className="PagerHeader">{this.props.header}</div>)
    children.push(...this.wrapArrayInPages(this.props.children, children.length));
    return children;
  }

  render() {
    let className = this.props.className ? ["Pager", ...this.props.className.split(" ")].join(" ") : "Pager";
    return (
      <div id={this.props.id} className={className} onScroll={(e) => this.handleScroll(e)}>
        {this.children()}
      </div>
    );
  }
}

class AppPager extends Pager {
  render() {
    let className = this.props.className ? ["AppPager Pager", ...this.props.className.split(" ")].join(" ") : "AppPager Pager";
    return (
      <div id={this.props.id} className={ className } onScroll={(e) => this.handleScroll(e)}>
        {this.children()}
      </div>
    );
  }
}

function scrollToContainer(id) {
  let el = document.getElementById(id);
  if (el === null) return;

  do {
    if (el.classList.contains('Page') && el.offsetParent.classList.contains('Pager')) {
      let page = el, pager = el.offsetParent;
      let pageIdx = [...pager.children].filter(child => child.classList.contains('Page')).indexOf(page);
      pager.scrollTo(0, pager.clientHeight * pageIdx);
    }

    el = el.offsetParent;
  } while (el.offsetParent !== null)
}

const Pages = {
  Personal: [
    <Container id="Personal-Definition" className="flex-direction-to-orientation" key={0}>
      <img src={PersonalDataDefense} alt="Захист персональних даних"/>
      <h3>
        <span className="blue-color">Захист персональних даних</span> — процес застосування особою заходів і засобів забезпечення захищеності, конфіденційності, цілісності та доступності своїх даних у кіберпросторі
      </h3>
    </Container>,

    <Container id="Personal-Consequences" className="flex-direction-to-orientation" key={1}>
      {/* <img src={DefenseBreak} alt="Наслідки кібератаки"/> */}
      <SubContainer className="Column">
        <h3 className="pink-color">Імовірні наслідки кібератаки на особу:</h3>
        <ul>
          <li>Витік персональної інформації у глобальну мережу Інтернет</li>
          <li>Порушення цілісності даних та їх структури</li>
          <li>Втрата даних</li>
          <li>Використання персональних даних для шантажу особи</li>
          <li>Крадіжка грошей з банківського рахунку, криптовалютних активів</li>
          <li>Використання обчислювальних пристроїв особи в інтересах зловмисників</li>
        </ul>
      </SubContainer>
    </Container>,

    <Container id="Personal-Clarification" className="Column" key={2}>
      <SubContainer className="Column">
        <h4>
          Коротке пояснення того, що буде далі
        </h4>
        <h4 className="italic">
          Таргетингові атаки на певну особу майже не трапляються, але розповсюджені атаки на масового користувача, зазвичай у вигляді вірусів та іншого шкідливого програмного забезпечення
        </h4>
      </SubContainer>
    </Container>,

    <Container id="Personal-Classification-Header" key={2}>
      <h3>
        Класифікація<br/>
        <span className="red-color">зловмисного програмного забезпечення</span>
      </h3>
    </Container>,
    [
      [
        <Container id="Personal-Classification-Virus-1" className="flex-direction-to-orientation" key={1}>
          <img src={Virus} alt="Вірус"/>
          <h4>
            <span className="red-color">Вірус</span> — зловмисний програмний код, який впроваджується у встановлені програми без згоди користувача. Вірус може виконувати безліч різних завдань, спрямованих в першу чергу на принесення шкоди операційній системі
          </h4>
        </Container>,

        <Container id="Personal-Classification-Virus-2" key={2}>
          <h4>
            Віруси можна підчепити різними способами: від натискання шкідливого посилання або файлу в невідомому листі до зараження на шкідливому сайті
          </h4>
        </Container>,

        <Container id="Personal-Classification-Virus-3" key={3}>
          <h4>
            В даний час віруси досить рідкісні, так як їх розробники намагаються тримати свої програми та їх поширення під контролем, так як в іншому випадку вірус досить швидко потрапляє до антивірусних компаній
          </h4>
        </Container>,
      ],
      [
        <Container id="Personal-Classification-Worm-1" className="flex-direction-to-orientation" key={1}>
          <img src={Worm} alt="Хробак"/>
          <h4>
            <span className="red2-color">Хробак</span> — зловмисний програмний код, що самопоширюється, але, на відміну від вірусів, не може заражати існуючи файли, тому поселяється в комп'ютер окремим файлом і шукає уразливості в мережі або системі для подальшого поширення себе
          </h4>
        </Container>,

        <Container id="Personal-Classification-Worm-2" key={2}>
          <h4>
            Хробаки можуть поширюватись різними шляхами: електронна пошта, месенджери, обмін файлами, від іншого зараженого комп'ютера тощо
          </h4>
        </Container>,

        <Container id="Personal-Classification-Worm-3" key={3}>
          <h4>
            За рівнем небезпеки подібні до вірусів, проте здатні подолати всі три етапи розповсюдження самостійно і поширюватись дуже швидко
          </h4>
        </Container>,
      ],
      [
        <Container id="Personal-Classification-Trojan-1" className="flex-direction-to-orientation" key={1}>
          <img src={Trojan} alt="Троян"/>
          <h4>
            <span className="red2-color">Троян</span> — шкідливе програмне забезпечення, яке видає себе за безпечне і корисне. Трояни не самовідтворюються і не поширюються самі по собі, а встановлюються користувачами
          </h4>
        </Container>,

        <Container id="Personal-Classification-Trojan-2" key={2}>
          <h4>
            Поширюються такими шляхами: під видом корисних програм електронною поштою, приховані у неліцензійних копіях програмного забезпечення, під виглядом програм-чітів тощо
          </h4>
        </Container>,

        <Container id="Personal-Classification-Trojan-3" key={3}>
          <h4>
            З часом поширеність троянів знижується, адже “піратські” веб-ресурси, які були головними осередками троянів, все частіше пропонують перевірене і безпечне програмне забезпечення
          </h4>
        </Container>,
      ],
      [
        <Container id="Personal-Classification-RootKit-1" className="flex-direction-to-orientation" key={1}>
          <img src={RootKit} alt="Руткіт"/>
          <h4>
            <span className="red2-color">Руткіт</span> — шкідлива програма, що приховує присутність шкідливого коду та його дії від користувача і встановленого захисного програмного забезпечення за допомогою прав суперкористувача(адміністратора)
          </h4>
        </Container>,

        <Container id="Personal-Classification-RootKit-2" key={2}>
          <h4>
            Різновид руткіту – буткіт, що починає свою роботу ще до завантаження операційної системи
          </h4>
        </Container>,

        <Container id="Personal-Classification-RootKit-3" key={3}>
          <h4>
            Руткіти досить небезпечні, проте складні сучасні антивірусні програми в змозі виявити і знешкодити практично всі існуючі різновиди руткітів
          </h4>
        </Container>,
      ],
      [
        <Container id="Personal-Classification-BackDoor-1" className="flex-direction-to-orientation" key={1}>
          <img src={BackDoor} alt="Бекдор"/>
          <h4>
            <span className="red2-color">Бекдор</span> або <span className="red2-color">RAT (remote administration tool)</span>  — програма, яка дозволяє зловмисникові брати на себе дистанційний контроль за комп'ютером і інформацією жертви
          </h4>
        </Container>,

        <Container id="Personal-Classification-BackDoor-2" key={2}>
          <h4>
            Зазвичай встановлюється іншими зловмисними програмами – хробаками, троянами, руткітами, завантажувачами
          </h4>
        </Container>,

        <Container id="Personal-Classification-BackDoor-3" key={3}>
          <h4>
            Слабо поширений, проте дуже небезпечний вид шкідливого програмного забезпечення, який у багатьох випадках неможливо виявити антивірусами
          </h4>
        </Container>,
      ],
      [
        <Container id="Personal-Classification-Downloader-1" className="flex-direction-to-orientation" key={1}>
          <img src={Downloader} alt="Завантажувач"/>
          <h4>
            <span className="red2-color">Завантажувач</span> — програмний код, що використовується для подальшого завантаження і встановлення повної версії шкідливої програми
          </h4>
        </Container>,

        <Container id="Personal-Classification-Downloader-2" key={2}>
          <h4>
            Шляхи зараження завантажувачами різноманітні: електронна пошта, заражені зображення, програма, що видає себе за безпечну тощо
          </h4>
        </Container>,

        <Container id="Personal-Classification-Downloader-3" key={3}>
          <h4>
            Завантажувачі небезпечні тим, що їх легко приховати від антивірусів, адже вони є звичайними програмами, що не містять шкідливого коду, проте призначені для завантаження такого коду
          </h4>
        </Container>,
      ],
    ],

    <Container id="Personal-Advice" className="Column" key={3}>
      <SubContainer className="Column">
        <h3 className="lightblue-color">Поради користувачам для підвищення їх кібербезпеки:</h3>
        <ul>
          <li>По перше — бути обережним і усвідомлено поводитися у мережі Інтернет, а також користуватися ліцензійним програмним забезпеченням</li>
          <li>Користуватися антивірусами, адже вони зможуть виявити і знешкодити шкідливі програми у випадку необережної поведінки користувача або його оточення</li>
        </ul>
      </SubContainer>
    </Container>,
  ],
  Business: [
    <Container id="Business-Definition" className="flex-direction-to-orientation" key={0}>
      <img src={CorpDataDefense} alt="Захист організації від кібератак"/>
      <h3>
        <span className="teal-color">Захист організації від кібератак</span> — процес застосування заходів і засобів безпеки в середині організації з метою забезпечення захищеності, конфіденційності, доступності й цілісності даних та їх структури, недопущення витоків даних і зовнішнього втручання у роботу комп’ютерних систем та мережі
      </h3>
    </Container>,

    <Container id="Business-Consequences" className="flex-direction-to-orientation" key={1}>
      {/* <img src={DefenseBreak} alt="Наслідки кібератаки"/> */}
      <SubContainer className="Column">
        <h3 className="pink-color">Імовірні наслідки кібератаки на організацію:</h3>
        <ul>
          <li>Витоки конфіденційної та/або службової інформації</li>
          <li>Порушення цілісності даних та їх структури</li>
          <li>Втрата даних</li>
          <li>Простій в роботі організації</li>
          <li>Грошові збитки і втрати</li>
          <li>Погіршення ділової репутації</li>
          <li>Загроза безпеці клієнтів</li>
          <li>Втрата клієнтів</li>
        </ul>
      </SubContainer>
    </Container>,

    <Container id="Business-Classification-Header" key={2}>
      <h3>
        Види <span className="red-color">хакерських атак</span> та <span className="tealblue-color">захист</span> від них
      </h3>
    </Container>,
    [
      [
        <Container id="Business-Classification-Phishing-1" className="flex-direction-to-orientation" key={1}>
          <img src={Phishing} alt="Фішинг"/>
          <h4>
            <span className="red2-color">Фішинг</span> — метод заволодіння конфіденційною інформацією шляхом обману користувача, щоб він самостійно розкрив свої дані
          </h4>
        </Container>,

        <Container id="Business-Classification-Phishing-2" key={2} className="Column">
          <SubContainer className="Column">
            <h4>Щоб захиститися від фішингу треба:</h4>
            <ul>
              <li>Інформувати і навчати працівників</li>
              <li>Користуватися антифішинговим програмним забезпеченням</li>
              <li>Використовувати надійну аутентифікацію</li>
            </ul>
          </SubContainer>
        </Container>,

        <Container id="Business-Classification-Phishing-3" key={3}>
          <h4>
            Працівники повинні завжди перевіряти достовірність і обгрунтованість інформації, з якою працюють, щоб не допустити успішності імовірної фішингової атаки
          </h4>
        </Container>,

        <Container id="Business-Classification-Phishing-4" key={4}>
          <h4>
            Якщо атака все ж відбулася успішно для злочинців, необхідно запобігти подальшому витоку інформації, і знецінити, наскільки це можливо, інформацію, отриману зловмисниками
          </h4>
        </Container>,
      ],
      [
        <Container id="Business-Classification-Ransomware-1" className="flex-direction-to-orientation" key={1}>
          <img src={Ransomware} alt="Ransomware"/>
          <h4>
            <span className="red2-color">Здирницька атака</span> — атака з використанням шкідливого програмного забезпечення, що шифрує дані користувачів і вимагає викуп за розшифрування
          </h4>
        </Container>,

        <Container id="Business-Classification-Ransomware-2" key={2} className="Column">
          <SubContainer className="Column">
            <h4>Для захисту від таких атак потрібно:</h4>
            <ul>
              <li>Використовувати надійний антивірусний програмний комплекс</li>
              <li>Регулярно здійснювати резервне копіювання даних</li>
            </ul>
          </SubContainer>
        </Container>,

        <Container id="Business-Classification-Ransomware-3" key={3} className="Column">
          <SubContainer className="Column">
            <h4>Якщо програма-здирник вже почала свою шкідливу роботу, слід:</h4>
            <ul>
              <li>Ізолювати осередок зараження від корпоративної мережі</li>
              <li>За допомогою спеціальних засобів видалити вірус</li>
              <li>Спробувати розшифрувати дані</li>
            </ul>
          </SubContainer>
        </Container>,

        <Container id="Business-Classification-Ransomware-4" key={4}>
          <h4>
            Якщо розшифрувати дані неможливо, можна їх відновити з резервних копій
          </h4>
        </Container>,
      ],
      [
        <Container id="Business-Classification-DoS-1" className="flex-direction-to-orientation" key={1}>
          <img src={DoS} alt="DoS-атака"/>
          <h4>
            <span className="red2-color">DoS-атака</span> — напад на комп'ютерну систему з наміром зробити комп'ютерні ресурси недоступними користувачам, для яких комп'ютерна система була призначена. Така атака по суті своїй є зловмисним надмірним попитом на доступ до веб-ресурсу
          </h4>
        </Container>,

        <Container id="Business-Classification-DoS-2" key={2}>
          <h4>
            Використання серверного програмного забезпечення, здатного найбільш ефективно обробляти запити, не тільки підвищить швидкість роботи серверу, а й допоможе у разі DoS-атаки
          </h4>
        </Container>,

        <Container id="Business-Classification-DoS-3" key={3}>
          <h4>
            Якщо DoS-атака вже почалася, найкращим рішенням буде фільтрування доступу до ресурсу, увівши пасивні (не вимагають певних дій від користувача) та активні (CAPTCHA) перевірки справжності користувача-клієнта
          </h4>
        </Container>,
      ],
      [
        <Container id="Business-Classification-MitM-1" key={1}>
          <img src={MitM_H} alt="MitM-атака" className="wide-img"/>
          <h4>
            <span className="red2-color">MitM-атака (атака посередника)</span> — зловмисник встручається в канал передачі інформації і перехоплює та змінює інформацію у ньому
          </h4>
        </Container>,

        <Container id="Business-Classification-MitM-2" key={2}>
          <h4>
            Щоб запобігти атакам посередника, необхідно здійснювати шифрування інформації перед її відправленням так, щоб імовірний посередник перехопивши інформацію не зміг її використати, а отримувач інформації зміг виявити недостовірну інформацію, якщо вона була змінена посередником.
          </h4>
        </Container>,

        <Container id="Business-Classification-MitM-3" key={3}>
          <h4>
            Якщо в каналі передачі інформації помічений посередник, необхідно його якнайшвидше вилучити
          </h4>
        </Container>,

        <Container id="Business-Classification-MitM-4" key={4}>
          <h4>
            Після атаки слід вжити заходів запобігання подальшому втручанню в інформаційний канал посередників і провести необхідні заходи шифрування каналу й інформації
          </h4>
        </Container>,
      ],
      [
        <Container id="Business-Classification-SQLInjection-1" key={1}>
          <img src={SQLInjection} alt="SQL-ін'єкція" className="wide-img"/>
          <h4>
            <span className="red2-color">SQL-ін'єкція</span> — впровадження в запит довільного SQL-коду. Вона можлива за некоректної обробки вхідних даних, що використовуються в SQL-запитах
          </h4>
        </Container>,

        <Container id="Business-Classification-SQLInjection-2" key={2}>
          <h4>
            Для запобігання таким атакам створене організацією програмне забезпечення повинне здійснювати строгу валідацію вхідних параметрів запитів і не допускати до виконання некоректний SQL-код
          </h4>
        </Container>,
      ],
      [
        <Container id="Business-Classification-0day-1" className="flex-direction-to-orientation" key={1}>
          <img src={ZeroDay} alt="Вразливість нульового дня"/>
          <h4>
            <span className="red2-color">Вразливість нульового дня</span> — критична вразливість програмного забезпечення, ще не виявлена його розробниками, і яка може бути використана зловмисниками
          </h4>
        </Container>,

        <Container id="Business-Classification-0day-2" key={2}>
          <h4>
            Найкращим заходом запобігання атакам з використанням такої вразливості є використання найновіших версій програмного забезпечення
          </h4>
        </Container>,

        <Container id="Business-Classification-0day-3" key={3}>
          <h4>
            Якщо організація стала жертвою атаки, їй слід якнайшвидше повідомити розробників програмного забезпечення про критичну вразливість
          </h4>
        </Container>,

        <Container id="Business-Classification-0day-4" key={4}>
          <h4>
            З появою оновлення, що виправляє вразливість, бажано негайно оновити програмне забезпечення
          </h4>
        </Container>,
      ],
      [
        <Container id="Business-Classification-BruteForce-1" className="flex-direction-to-orientation" key={1}>
          <img src={BruteForce} alt="BruteForce" className="wide-img"/>
          <h4>
            <span className="red2-color">Атака методом "грубої сили"</span> — злам криптографічного захисту шляхом перебору всіх можливих варіантів паролю
          </h4>
        </Container>,

        <Container id="Business-Classification-BruteForce-2" key={2}>
          <h4>
            Запобігти атаці легко - використовувати довгі випадково сгенеровані паролі.
            Додатково можна використовувати 2FA (2-факторну аутентифікацію) у вигляді тимчасового 6-значного коду, що змінюється кожні 30 секунд
          </h4>
        </Container>,

        <Container id="Business-Classification-BruteForce-3" key={3}>
          <h4>
            Час повного перебору експоненційно залежить від довжини паролю. До появи повноцінних квантових комп'ютерів метод "грубої сили" залишатиметься неефективним
          </h4>
        </Container>,
      ],
    ],

    <Container id="Business-Advice" className="Column" key={3}>
      <SubContainer className="Column">
        <h3 className="lightblue-color">Шляхи зміцнення кібербезпеки корпоративної мережі:</h3>
        <ul>
          <li>По перше — проводити з працівниками навчальні бесіди, спеціальні курси свідомої поведінки в кіберпросторі</li>
          <li>Використовувати якісне ліцензійне ПЗ, найновіші його версії</li>
          <li>Користуватися кращим антивірусним програмним комплексом</li>
          <li>Чітко контролювати допуск і доступ до інформації в мережі</li>
          <li>Не допускати доступу до локальної корпоративної мережі з глобальної мережі Інтернет</li>
        </ul>
      </SubContainer>
    </Container>,
  ],
}

class NavItem extends React.Component {
  setSubject() {
    if (this.props.setSubject) this.props.setSubject();
  }

  onClick() {
    this.setSubject();
    if (this.props.target) setTimeout(() => scrollToContainer(this.props.target), 0);
  }

  render() {
    let className = this.props.className ? ["NavItem", ...this.props.className.split(" ")].join(" ") : "NavItem";
    return (
      <span id={this.props.id} className={className} target={this.props.target} onClick={() => this.onClick()}>
        {this.props.children}
      </span>
    );
  }
}

class NavSep extends React.Component {
  render() {
    let className = this.props.className ? ["NavSep", ...this.props.className.split(" ")].join(" ") : "NavSep";
    return (
      <div className={className}></div>
    )
  }
}

class NavGroup extends React.Component {
  render() {
    let className = this.props.className ? ["NavGroup", ...this.props.className.split(" ")].join(" ") : "NavGroup";
    return (
      <div className={className}>
        {this.props.children}
      </div>
    )
  }
}

class NavBtn extends React.Component {
  render() {
    let className = this.props.hidden ? "" : "hidden-path";
    return (
      <svg className="NavBtn" onClick={this.props.onClick}
           width="8" height="7" viewBox="0 0 8 7" xmlns="http://www.w3.org/2000/svg">
        <g strokeWidth="2.4495" className={className}>
          <rect className="b" x="1" y="1" width="6" height="1" />
          <rect className="c" x="1" y="3" width="6" height="1" />
          <rect className="d" x="1" y="5" width="6" height="1" />
        </g>
      </svg>
    );
  }
}

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    }
  }
  setPersonal() {
    if (this.props.setSubject) this.props.setSubject("Personal");
    this.setHidden();
  }

  setBusiness() {
    if (this.props.setSubject) this.props.setSubject("Business");
    this.setHidden();
  }
  setHidden() {
    this.setState({hidden: true});
  }

  toggle() {
    this.setState({hidden: !this.state.hidden})
  }

  render() {
    let className = "NavMenuWrapper";
    if (this.state.hidden) className += " Hidden";
    return (
      <div className={className}>
        <NavBtn onClick={() => this.toggle()} hidden={this.state.hidden}/>
        <div className="NavMenu">
          <NavBtn onClick={() => this.toggle()} hidden={this.state.hidden}/>
          <NavGroup>
            <NavItem target="Intro-Header" setSubject={() => this.setHidden()}>
              Вступ
            </NavItem>
            <NavItem target="Intro-Subject" setSubject={() => this.setHidden()}>
              Вибір суб'єкта
            </NavItem>
          </NavGroup>
          <NavSep />
          <NavGroup>
            <NavItem className="blue-color" target="Personal-Definition" setSubject={() => this.setPersonal()}>
              Захист персональних даних
            </NavItem>
            <NavItem className="blue-color" target="Personal-Consequences" setSubject={() => this.setPersonal()}>
              Імовірні наслідки кібератаки на особу
            </NavItem>
            <NavItem className="blue-color" target="Personal-Classification-Header" setSubject={() => this.setPersonal()}>
              Класифікація зловмисного програмного забезпечення
            </NavItem>
            <NavGroup className="blue-color">
              <NavItem className="blue-color" target="Personal-Classification-Virus-1" setSubject={() => this.setPersonal()}>
                Віруси
              </NavItem>
              <NavItem className="blue-color" target="Personal-Classification-Worm-1" setSubject={() => this.setPersonal()}>
                Хробаки
              </NavItem>
              <NavItem className="blue-color" target="Personal-Classification-Trojan-1" setSubject={() => this.setPersonal()}>
                Трояни
              </NavItem>
              <NavItem className="blue-color" target="Personal-Classification-RootKit-1" setSubject={() => this.setPersonal()}>
                Руткіти
              </NavItem>
              <NavItem className="blue-color" target="Personal-Classification-BackDoor-1" setSubject={() => this.setPersonal()}>
                Бекдори
              </NavItem>
              <NavItem className="blue-color" target="Personal-Classification-Downloader-1" setSubject={() => this.setPersonal()}>
                Завантажувачі
              </NavItem>
            </NavGroup>
            <NavItem className="blue-color" target="Personal-Advice" setSubject={() => this.setPersonal()}>
              Поради користувачам
            </NavItem>
          </NavGroup>

          <NavSep />
          <NavGroup>
            <NavItem className="teal-color" target="Business-Definition" setSubject={() => this.setBusiness()}>
              Захист організації від кібератак
            </NavItem>
            <NavItem className="teal-color" target="Business-Consequences" setSubject={() => this.setBusiness()}>
              Імовірні наслідки кібератаки на організацію
            </NavItem>
            <NavItem className="teal-color" target="Business-Classification-Header" setSubject={() => this.setBusiness()}>
              Види хакерських атак та захист від них
            </NavItem>
            <NavGroup className="teal-color">
              <NavItem className="teal-color" target="Business-Classification-Phishing-1" setSubject={() => this.setBusiness()}>
                Фішинг
              </NavItem>
              <NavItem className="teal-color" target="Business-Classification-Ransomware-1" setSubject={() => this.setBusiness()}>
                Здирницька атака
              </NavItem>
              <NavItem className="teal-color" target="Business-Classification-DoS-1" setSubject={() => this.setBusiness()}>
                DoS-атака
              </NavItem>
              <NavItem className="teal-color" target="Business-Classification-MitM-1" setSubject={() => this.setBusiness()}>
                MitM-атака
              </NavItem>
              <NavItem className="teal-color" target="Business-Classification-SQLInjection-1" setSubject={() => this.setBusiness()}>
                SQL-ін'єкція
              </NavItem>
              <NavItem className="teal-color" target="Business-Classification-0day-1" setSubject={() => this.setBusiness()}>
                Вразливість нульового дня
              </NavItem>
              <NavItem className="teal-color" target="Business-Classification-BruteForce-1" setSubject={() => this.setBusiness()}>
                "Brute force"-атака
              </NavItem>
            </NavGroup>
            <NavItem className="teal-color" target="Business-Advice" setSubject={() => this.setBusiness()}>
              Поради організаціям
            </NavItem>
          </NavGroup>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "Personal"
    };
  }

  setPersonal() {
    this.setState({subject: "Personal"});
  }

  setBusiness() {
    this.setState({subject: "Business"});
  }

  setSubject(subject) {
    if (subject === "Personal" || subject === "Business")  {
      this.setState({subject});
    }
  }

  render() {
    return (
      <div className="App">
        <AppPager scrollSnap={true}>
          <Container id="Intro-Header" className="JustifySpaceEvenly">
            <Shield />
            <h1 className="h1">КІБЕР БЕЗПЕКА<br />ОСОБИ І ОРГАНІЗАЦІЇ</h1>
          </Container>

          <Container id="Intro-Subject" className="JustifySpaceEvenly flex-direction-to-orientation">
            <SubContainer>
              <h1 className={"Subject h1 pointer blue-underline" + (this.state.subject === "Personal" ? " Active" : " Passive")}
                onClick={() => this.setPersonal()}>
                ЗАХИСТ<br />ПЕРСОНАЛЬНИХ<br />ДАНИХ
              </h1>
            </SubContainer>
            <SubContainer>
              <h1 className={"Subject h1 pointer teal-underline" + (this.state.subject === "Business" ? " Active" : " Passive")}
                onClick={() => this.setBusiness()}>
                ЗАХИСТ<br />ОРГАНІЗАЦІЇ<br />ВІД КІБЕРАТАК
              </h1>
            </SubContainer>
          </Container>

          {Pages[this.state.subject]}

          <Container className="flex-direction-to-orientation">
            <NavItem className="h3 pointer" target="Intro-Header">
              Повернутися до початку
            </NavItem>
          </Container>
        </AppPager>
        <NavMenu setSubject={subject => this.setSubject(subject)}/>
      </div>
    );
  }
}

export default App;
