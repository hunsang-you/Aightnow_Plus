'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import Translate from '@/assets/icons/translate.svg';
import SmallLogoLight from '@/assets/logos/small_logo_light.svg';
import { diffCreatedTime } from '@/utils/date';
import OriginNewsCard from './OriginNewsCard';
import { News } from '@/types/news';
import SkeletonNewsDetail from '../skeleton/news/SkeletonNewsDetail';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Locale } from '@/types/next-auth';
import {
  getTranslatedNews,
  hasTranslatedNews,
} from '@/utils/translate';
import { businessAPI } from '@/service/apiInstance';

type NewsDetailProps = {
  id: string;
};

export default function NewsDetail({ id }: NewsDetailProps) {
  const { locale } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<Locale>('en');
  const getNews = async () => {
    setLoading(true);
    const { news }: { news: News } = await businessAPI.getNewsDetail({
      newsId: id,
    });
    setNews(news);
    setLoading(false);
  };

  const updateView = async () => {
    await businessAPI.updateNewsView({ newsId: id });
  };

  useEffect(() => {
    getNews();
    updateView();
    setLang(locale as Locale);
  }, []);

  const translateHandler = () => {
    setLang((prev) => (prev === 'en' ? (locale as Locale) : 'en'));
  };

  const t = useTranslations('NewsDetail');
  const tDate = useTranslations('Date');
  return (
    <>
      {loading ? (
        <SkeletonNewsDetail />
      ) : (
        <>
          {news && (
            <>
              <div>
                <h1 className="h4 font-bold pb-4">
                  {getTranslatedNews(news, lang, 'title')}
                </h1>
                <div className="flex justify-between">
                  <div className="b5 font-medium text-grayscale-600 flex gap-[6px]">
                    <span>{news.publisher}</span>
                    <span>∙</span>
                    <span>
                      {tDate(
                        diffCreatedTime(news.published_at).periodType,
                        {
                          period: diffCreatedTime(news.published_at)
                            .period,
                        },
                      )}
                    </span>
                    <span>∙</span>
                    <span>
                      {t('views', {
                        view: news.view.toLocaleString(),
                      })}
                    </span>
                  </div>
                  {locale !== 'en' && (
                    <ButtonBase
                      iconSvg={<Translate className="w-6" />}
                      className="flex b5 font-medium text-grayscale-0 bg-primary-900 rounded-lg w-[176px] h-[36px] items-center justify-center gap-1"
                      onClick={translateHandler}
                    >
                      <span>{t('translate')}</span>
                    </ButtonBase>
                  )}
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-3 items-center pb-6">
                    <div className="w-6 h-6 bg-primary-900 rounded flex items-center justify-center">
                      <SmallLogoLight className="w-4" />
                    </div>
                    <span className="b4 font-bold">
                      {t('summary')}
                    </span>
                  </div>
                  <span className="text-warning-100">
                    {!hasTranslatedNews(news, locale as Locale) &&
                      t('warning')}
                  </span>
                </div>
                <div className="b4">
                  {getTranslatedNews(news, lang, 'summary')}
                </div>
              </div>
              {news.thumbnail && (
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={news.thumbnail}
                    width="800"
                    height="370"
                    alt="thumbnail"
                  />
                </div>
              )}

              <div className="b4 ">
                <h4 className="h4 font-bold pb-4">{t('article')}</h4>
                {getTranslatedNews(news, lang, 'content')
                  .split('\n')
                  .map((c, i) => (
                    <p className="pb-4 last-of-type:pb-14" key={i}>
                      {c}
                    </p>
                  ))}

                <OriginNewsCard
                  origin_url={news.origin_url}
                  content={news.content_en}
                  title={news.title_en}
                  thumbnail={news.thumbnail}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
