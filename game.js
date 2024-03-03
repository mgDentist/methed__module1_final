'use strict';

(() => {
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const game = () => {
    const balls = {
      player: 5,
      bot: 5,
    };

    const start = () => {
      const userAction = prompt(`Ваш ход:
      введите число от 1 до ${balls.player}`);

      if (userAction === null) {
        const isStop = confirm('Вы точно хотите выйти из игры?');
        if (isStop) {
          alert(`Игра окончена! Компьютер: ${balls.bot} шариков,
          вы: ${balls.player} шариков!`);
          return;
        } else {
          start();
        }
      } else {
        const userNumber = parseInt(userAction, 10);
        if (isNaN(userNumber) || userNumber > balls.player || userNumber < 1) {
          alert(`Вы не можете загадывать число больше,
          чем количество ваших шариков (${balls.player}) или меньше 1`);
          start();
          return;
        }

        const botActionIndex = getRandomIntInclusive(1, 2);
        let computerDecision = 0;
        if (botActionIndex === 1) {
          computerDecision = 'odd';
        } else {
          computerDecision = 'even';
        }
        alert(`Компьютер выбрал:
                        ${computerDecision === 'odd' ? 'нечетное' : 'четное'}`);

        if ((computerDecision === 'odd' && userNumber % 2 !== 0) ||
          (computerDecision === 'even' && userNumber % 2 === 0)) {
          balls.player -= userNumber;
          balls.bot += userNumber;
          alert(`'Компьютер угадал! У вас осталось: ${balls.player} шариков`);
          if (balls.player <= 0) {
            alert('Игра окончена! Вы проиграли!');
            return;
          }
        } else {
          balls.player += userNumber;
          balls.bot -= userNumber;
          alert(`Компьютер не угадал! У него осталось ${balls.bot} шариков`);
          if (balls.bot <= 0) {
            alert('Игра окончена! Вы выиграли!');
            return;
          }
        }

        start();
      }
    };

    return start;
  };

  window.marbles = game;
})();
