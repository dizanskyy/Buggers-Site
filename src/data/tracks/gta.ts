import { Lesson } from '../../types';

export const GTA_LESSONS: Lesson[] = [
  {
    id: 'gta-01',
    moduleId: 'gta-core-natives',
    trackId: 'gta-mp',
    title: 'GTA V Engine: Нативы, Память и Модель сущностей',
    description: 'Глубокий разбор движка RAGE: нативные вызовы C++ (Natives), пулы сущностей Peds, Vehicles, Blips и их синхронизация.',
    durationMinutes: 30,
    xpReward: 95,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Архитектура движка Rockstar Advanced Game Engine (RAGE)

Движок GTA V работает с виртуальным миром Лос-Сантоса через сотни встроенных функций на C++ — **Natives** (нативы). В мультиплеере клиентские скрипты вызывают эти нативы для управления камерами, воспроизведения анимаций, управления транспортом и наложения эффектов.

\`\`\`mermaid
graph TD
    ClientScript[Client JavaScript/Lua/C#] -->|Hash Call 0x06843DA7060A026B| NativeInvoker[RAGE Native Invoker]
    NativeInvoker --> RAGE_CORE[GTA V C++ Executable Engine]
    RAGE_CORE --> MEMORY[Entity Pool: Peds / Vehicles / Props]
\`\`\`

#### Иерархия сущностей в GTA V:
- \`Entity\` — базовый абстрактный объект с физическими координатами, поворотом (Heading/Quaternion), моделью и матрицей трансформации.
  - \`Ped\` — человек, пешеход или персонаж игрока.
  - \`Vehicle\` — автомобиль, мотоцикл, вертолет, лодка или самолет.
  - \`Object / Prop\` — статические и динамические декорации, контейнеры, двери, оружие.
  - \`Blip\` — маркер на мини-карте и глобальной GPS карте.

#### Золотое правило мультиплеера (Server-Authoritative):
Никогда не доверяйте клиенту! Спавн денег, выдача оружия и изменение инвентаря должны происходить **строго на стороне сервера**, а клиенту отправляются лишь подтверждения и визуальные инструкции.`,
    codeSnippet: `// Вызов натива для телепортации сущности в GTA V
// Native: SET_ENTITY_COORDS (0x06843DA7060A026B)
mp.game.entity.setCoords(player.handle, 100.0, 200.0, 50.0, false, false, false, false);`,
    codeTask: {
      initialCode: `// Напишите функцию safeTeleport, которая перемещает сущность игрока в указанные координаты
// и сбрасывает скорость падения сущности (setEntityVelocity)

function safeTeleport(entityHandle, x, y, z) {
  // 1. Вызовите mp.game.entity.setCoords(entityHandle, x, y, z, false, false, false, false);
  // 2. Сбросьте скорость mp.game.entity.setEntityVelocity(entityHandle, 0.0, 0.0, 0.0);
  
}`,
      solution: `function safeTeleport(entityHandle, x, y, z) {
  mp.game.entity.setCoords(entityHandle, x, y, z, false, false, false, false);
  mp.game.entity.setEntityVelocity(entityHandle, 0.0, 0.0, 0.0);
}`,
      language: 'javascript',
      hints: [
        'Используйте mp.game.entity.setCoords для координат.',
        'Используйте mp.game.entity.setEntityVelocity для сброса скорости.'
      ],
      testCases: [
        {
          description: 'Проверка вызова setCoords',
          validationRegex: 'mp\\.game\\.entity\\.setCoords'
        },
        {
          description: 'Проверка сброса скорости setEntityVelocity',
          validationRegex: 'mp\\.game\\.entity\\.setEntityVelocity'
        }
      ]
    },
    keyTakeaways: [
      'Все взаимодействия с миром GTA V выполняются через вызов хешей нативных функций.',
      'Сервер всегда авторитарен во избежание дюпа денег и инвентаря.'
    ]
  },
  {
    id: 'gta-02',
    moduleId: 'gta-ragemp',
    trackId: 'gta-mp',
    title: 'RAGE:MP: Серверная разработка на C# .NET Core',
    description: 'Создание отказоустойчивого бэкенда для RAGE:MP: серверные события [ServerEvent], команды [Command] и интеграция базы данных.',
    durationMinutes: 35,
    xpReward: 100,
    difficulty: 'advanced',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Архитектура C# скриптов в RAGE:MP

RAGE:MP запускает полноценную среду .NET Core на стороне сервера. Классы скриптов наследуются от \`GTANetworkAPI.Script\` и декорируются атрибутами:
- \`[ServerEvent(Event.PlayerConnected)]\` — вызывается при подключении игрока.
- \`[Command("name")]\` — регистрирует консольную команду чата.
- \`[RemoteEvent("eventName")]\` — принимает входящий RPC вызов с клиента.

\`\`\`csharp
using GTANetworkAPI;

public class VehicleManager : Script
{
    [Command("veh", "~y~Использование: /veh [model]")]
    public void CommandCreateVehicle(Player player, string model)
    {
        uint hash = NAPI.Util.GetHashKey(model);
        if (hash == 0)
        {
            player.SendChatMessage("~r~[Ошибка] Модель транспорта не найдена!");
            return;
        }

        Vector3 spawnPos = player.Position + new Vector3(2.0, 0, 0);
        Vehicle veh = NAPI.Vehicle.CreateVehicle(hash, spawnPos, player.Heading, 0, 0);
        player.SetIntoVehicle(veh, (int)VehicleSeat.Driver);
        player.SendChatMessage($"~g~Транспорт {model} успешно заспавнен!");
    }
}
\`\`\``,
    codeSnippet: `[Command("heal")] public void CMD_Heal(Player player) { player.Health = 100; }`,
    codeTask: {
      initialCode: `using GTANetworkAPI;

public class AdminSystem : Script
{
    [Command("setarmor")]
    public void CMD_SetArmor(Player player, int armorAmount)
    {
        // 1. Установите player.Armor = armorAmount
        // 2. Отправьте сообщение player.SendChatMessage($"Броня установлена: {armorAmount}");
        
    }
}`,
      solution: `using GTANetworkAPI;

public class AdminSystem : Script
{
    [Command("setarmor")]
    public void CMD_SetArmor(Player player, int armorAmount)
    {
        player.Armor = armorAmount;
        player.SendChatMessage($"Броня установлена: {armorAmount}");
    }
}`,
      language: 'csharp',
      hints: [
        'player.Armor = armorAmount;',
        'player.SendChatMessage($"Броня установлена: {armorAmount}");'
      ],
      testCases: [
        {
          description: 'Проверка установки брони player.Armor',
          validationRegex: 'player\\.Armor\\s*=\\s*armorAmount'
        },
        {
          description: 'Проверка отправки сообщения SendChatMessage',
          validationRegex: 'player\\.SendChatMessage'
        }
      ]
    },
    keyTakeaways: [
      'C# сервер компилируется в байт-код .NET и работает на максимальной скорости.',
      'События [RemoteEvent] позволяют безопасно принимать запросы от JS клиента.'
    ]
  },
  {
    id: 'gta-03',
    moduleId: 'gta-altv',
    trackId: 'gta-mp',
    title: 'alt:V: Модульный TypeScript, StreamSyncedMeta и Виртуальные сущности',
    description: 'Разработка на ультра-современном мультиплеере alt:V с чистым TypeScript, потокобезопасностью и радиусным стримингом.',
    durationMinutes: 35,
    xpReward: 100,
    difficulty: 'advanced',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Почему профессиональные студии выбирают alt:V?

alt:V предоставляет официальные типобезопасные модули для **TypeScript**:
- \`@altv/server\` — серверное ядро на V8.
- \`@altv/client\` — клиентский API.

#### Разделение метаданных:
- **StreamSyncedMeta**: Передает данные сущности только тем клиентам, которые находятся в радиусе стриминга (видимости). Экономит 90% сетевого трафика сервера!
- **SyncedMeta**: Синхронизирует данные на всех игроков сервера (например, глобальный статус погоды или фракции).
- **Virtual Entities**: 3D метки, интерактивные маркеры, чекпоинты без создания тяжелых физических объектов.

\`\`\`typescript
import * as alt from 'alt-server';

alt.on('playerConnect', (player: alt.Player) => {
  player.model = 'mp_m_freemode_01';
  player.spawn(new alt.Vector3(0, 0, 72), 0);
  
  // Установка метаданных для стриминга окружающим
  player.setStreamSyncedMeta('characterName', 'Alexander Stone');
  player.setStreamSyncedMeta('fraction', 'LSPD');
});
\`\`\``,
    codeSnippet: `player.setStreamSyncedMeta('role', 'police');`,
    codeTask: {
      initialCode: `import * as alt from 'alt-server';

// Напишите функцию updatePlayerHealth, которая устанавливает player.health
// и обновляет стриминговые метаданные 'isInjured', если здоровье < 20

function updatePlayerHealth(player: alt.Player, health: number) {
  player.health = health;
  // Установите streamSyncedMeta 'isInjured' в значение (health < 20)
  
}`,
      solution: `import * as alt from 'alt-server';

function updatePlayerHealth(player: alt.Player, health: number) {
  player.health = health;
  player.setStreamSyncedMeta('isInjured', health < 20);
}`,
      language: 'typescript',
      hints: [
        'player.setStreamSyncedMeta(\'isInjured\', health < 20);'
      ],
      testCases: [
        {
          description: 'Проверка установки streamSyncedMeta isInjured',
          validationRegex: 'player\\.setStreamSyncedMeta\\([\'"]isInjured[\'"],\\s*health\\s*<\\s*20\\)'
        }
      ]
    },
    keyTakeaways: [
      'StreamSyncedMeta оптимизирует сетевой трафик, передавая данные локально.',
      'alt:V полностью построен на современной модульной системе ESNext и TypeScript.'
    ]
  },
  {
    id: 'gta-04',
    moduleId: 'gta-fivem',
    trackId: 'gta-mp',
    title: 'FiveM: FXServer, Lua, State Bags и OneSync Infinity',
    description: 'Разработка ресурсов FiveM на Lua: манифест fxmanifest, работа с базой данных oxmysql и синхронизация State Bags.',
    durationMinutes: 35,
    xpReward: 95,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Архитектура ресурсов FiveM

Ресурс FiveM описывается файлом \`fxmanifest.lua\`:
\`\`\`lua
fx_version 'cerulean'
game 'gta5'

author 'Buggers Dev Team'
description 'Vehicle Engine State & Tuning'

shared_scripts {
    '@ox_lib/init.lua',
    'shared/*.lua'
}

client_scripts {
    'client/*.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/*.lua'
}
\`\`\`

#### Синхронизация через State Bags:
Вместо ручной рассылки сетевых событий \`TriggerClientEvent\` современный FiveM OneSync Infinity использует **State Bags**:
\`\`\`lua
-- Сервер: реплицирует изменение состояния на всех клиентов
Entity(veh).state:set('fuelLevel', 75, true)

-- Клиент: отслеживает изменение свойства в реальном времени
AddStateBagChangeHandler('fuelLevel', nil, function(bagName, key, value)
    print("Уровень топлива обновлен:", value)
end)
\`\`\``,
    codeSnippet: `Entity(vehicle).state:set('fuel', 100, true)`,
    codeTask: {
      initialCode: `-- Напишите серверную функцию setVehicleEngineStatus(vehicleEntity, isRunning)
-- Установите состояние 'engineOn' через State Bag с флагом репликации true

function setVehicleEngineStatus(vehicleEntity, isRunning)
  -- Entity(vehicleEntity).state:set('engineOn', isRunning, true)
  
end`,
      solution: `function setVehicleEngineStatus(vehicleEntity, isRunning)
  Entity(vehicleEntity).state:set('engineOn', isRunning, true)
end`,
      language: 'lua',
      hints: [
        'Entity(vehicleEntity).state:set(\'engineOn\', isRunning, true)'
      ],
      testCases: [
        {
          description: 'Проверка Entity state set',
          validationRegex: 'Entity\\(vehicleEntity\\)\\.state:set\\([\'"]engineOn[\'"],\\s*isRunning,\\s*true\\)'
        }
      ]
    },
    keyTakeaways: [
      'State Bags заменяют устаревший спам TriggerClientEvent.',
      'oxmysql предоставляет быстрый асинхронный доступ к базе данных с поддержкой promises.'
    ]
  },
  {
    id: 'gta-05',
    moduleId: 'gta-cef-ui',
    trackId: 'gta-mp',
    title: 'CEF / NUI: Внутриигровые меню, инвентарь и HUD на React',
    description: 'Интеграция современных веб-интерфейсов React в игровой клиент: фокус мыши, прозрачный фон и двусторонний мост сообщений.',
    durationMinutes: 35,
    xpReward: 100,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Как работает Chromium Embedded Framework (CEF / NUI) в GTA

Игровой клиент рендерит веб-страницу поверх 3D мира с полностью прозрачным фоном:
\`\`\`css
body {
  background-color: transparent !important;
  overflow: hidden;
  user-select: none;
}
\`\`\`

#### Архитектура моста (Bridge Game <-> React):
1. **Игра -> React**: Клиентский скрипт отправляет событие через \`browser.execute('window.dispatchEvent(...)')\` или \`SendNUIMessage({ action: 'OPEN_INVENTORY', items: [...] })\`.
2. **React -> Игра**: React компонент вызывает нативный триггер \`window.mp.trigger('client:useItem', itemId)\` (RAGE:MP) или \`fetch('https://resource/useItem', { method: 'POST', body: ... })\` (FiveM NUI).

\`\`\`typescript
// React Hook для приема игровых событий
import { useEffect, useState } from 'react';

export function useGameEvent(actionName: string, handler: (data: any) => void) {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data?.action === actionName) {
        handler(event.data.payload);
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [actionName, handler]);
}
\`\`\``,
    codeSnippet: `window.mp?.trigger('client:action', payload);`,
    codeTask: {
      initialCode: `// Напишите универсальную функцию sendEventToGame(eventName, payload)
// которая проверяет window.mp (RAGE:MP) и вызывает mp.trigger(eventName, JSON.stringify(payload))

function sendEventToGame(eventName, payload) {
  // Напишите проверку и вызов
  
}`,
      solution: `function sendEventToGame(eventName, payload) {
  if (window.mp && typeof window.mp.trigger === 'function') {
    window.mp.trigger(eventName, JSON.stringify(payload));
  }
}`,
      language: 'javascript',
      hints: [
        'if (window.mp) { window.mp.trigger(eventName, JSON.stringify(payload)); }'
      ],
      testCases: [
        {
          description: 'Проверка window.mp.trigger',
          validationRegex: 'window\\.mp\\.trigger'
        }
      ]
    },
    keyTakeaways: [
      'CEF позволяет создавать сложные интерфейсы на обычном React, Tailwind и TypeScript.',
      'Всегда снимайте фокус управления с персонажа при активном вводе текста в UI.'
    ]
  }
];
