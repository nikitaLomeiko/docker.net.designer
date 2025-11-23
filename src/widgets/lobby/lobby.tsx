import { CapabilityCard } from "./components/capability.card";
import { DocsIcon } from "./components/icons/docs.icon";
import { ImportIcon } from "./components/icons/import.icon";
import { PlusIcon } from "./components/icons/plus.icon";
import { ProtectionIcon } from "./components/icons/protection.icon";
import { StatCard } from "./components/stat.card";
import { StepItem } from "./components/step.item";

export const Lobby: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-4">
          <DocsIcon />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Docker Compose Constructor</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Визуальный конструктор для создания и редактирования docker-compose файлов
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <CapabilityCard
          color="blue"
          color_secondary="indigo"
          icon={<PlusIcon />}
          label="Начните с чистого листа и создайте docker-compose файл с помощью визуального редактора"
          sublabel="Откройте sidebar для начала работы →"
          title="Создать новую конфигурацию"
        />

        <CapabilityCard
          color="green"
          color_secondary="emerald"
          icon={<ImportIcon />}
          label="Загрузите существующий docker-compose.yml файл для визуального редактирования"
          sublabel="Поддержка YAML формата"
          title="Импорт существующего"
        />

        <CapabilityCard
          color="purple"
          color_secondary="violet"
          icon={<ProtectionIcon />}
          label="Полная поддержка services, networks, volumes, secrets и configs"
          sublabel="Визуальное управление всеми компонентами"
          title="Все возможности Docker"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Быстрый старт</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <StepItem
              count={1}
              title="Создайте конфигурацию"
              label="Нажмите `Создать конфигурацию` в sidebar или импортируйте существующий файл"
            />
            <StepItem
              count={2}
              title="Добавьте компоненты"
              label="Перетащите services, networks, volumes и другие компоненты на рабочую область"
            />
          </div>
          <div className="space-y-4">
            <StepItem
              count={3}
              title="Настройте связи"
              label="Соедините компоненты между собой для определения зависимостей"
            />
            <StepItem
              count={4}
              title="Экспортируйте результат"
              label="Скачайте готовый docker-compose.yml файл для использования в ваших проектах"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <StatCard color="blue" label="Сервисов" />
        <StatCard color="green" label="Сетей" />
        <StatCard color="purple" label="Томов" />
        <StatCard count="100%" color="orange" label="Совместимость" />
      </div>
    </div>
  );
};
