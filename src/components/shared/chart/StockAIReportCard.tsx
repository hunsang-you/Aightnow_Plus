import { PolarAngleAxis } from 'recharts';
import StockAIReportChart from './StockAIReportChart';
import CustomTick from './rechart/CustomTick';
import Rechart from './rechart';
import { useTranslations } from 'next-intl';
import { UUID } from 'crypto';
import { useGetChartData } from '@/hooks/useGetChartData';

const radarStatus = {
  width: 189.43,
  height: 176,
  cx: 80,
  cy: 93,
  outerRadius: 84,
  polarRadius: [25, 40, 55, 70, 85],
  numberOfSides: 5,
};

/**
 * 프롬프트 작업 대기, 임시 완성
 */
export default function StockAIReportCard({
  as,
  stockId,
}: {
  as?: React.ElementType;
  stockId: UUID;
}) {
  const score = 70;
  const t = useTranslations();
  const chartData = useGetChartData(stockId);

  if (!chartData || Object.keys(chartData).length === 0) {
    console.error('Chart data is not available or empty.');
    return null;
  }

  const {
    growth,
    interestLevel,
    investmentIndex,
    profitability,
    stockPrice,
  } = chartData;

  const percentages = [
    stockPrice.percentage,
    investmentIndex.percentage,
    interestLevel.percentage,
    growth.percentage,
    profitability.percentage,
  ];

  const maxPercentage = Math.max(...percentages);

  const radarData = [
    {
      subject: t('RadarChart.stock_price'),
      percentage: Math.round(
        (stockPrice.percentage / maxPercentage) * 100,
      ),
      B: 100,
      fullMark: 100,
    },
    {
      subject: t('RadarChart.investment_index'),
      percentage: Math.round(
        (investmentIndex.percentage / maxPercentage) * 100,
      ),
      B: 100,
      fullMark: 100,
    },
    {
      subject: t('RadarChart.interest_level'),
      percentage: Math.round(
        (interestLevel.percentage / maxPercentage) * 100,
      ),
      B: 100,
      fullMark: 100,
    },
    {
      subject: t('RadarChart.growth'),
      percentage: Math.round(
        (growth.percentage / maxPercentage) * 100,
      ),
      B: 100,
      fullMark: 100,
    },
    {
      subject: t('RadarChart.profitability'),
      percentage: Math.round(
        (profitability.percentage / maxPercentage) * 100,
      ),
      B: 100,
      fullMark: 100,
    },
  ];
  return (
    <Rechart className={'min-w-[365.44px] pb-8'}>
      <div className="flex justify-between pr-[8.439px] mb-[17px]">
        <Rechart.Label
          as={as}
          className="b1 font-semibold text-primary-900"
        >
          {t('Stock.radar_chart')}
        </Rechart.Label>
        <Rechart.RadarScore className="h3 font-medium text-grayscale-700">
          {t('Stock.points', { score })}
        </Rechart.RadarScore>
      </div>
      <StockAIReportChart
        chartData={chartData}
        radarData={radarData}
        radarStatus={radarStatus}
      >
        <PolarAngleAxis
          dataKey="subject"
          tick={(props) => <CustomTick {...props} />}
        />
      </StockAIReportChart>
    </Rechart>
  );
}
