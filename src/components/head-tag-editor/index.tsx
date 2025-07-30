import { Helmet } from 'react-helmet-async';
import { isDarkishTheme } from '../../utils';

type HeadTagEditorProps = {
  googleAnalyticsId?: string;
  appliedTheme: string;
};

/**
 * Renders SEO, Open Graph, and analytics tags in <head>.
 */
const HeadTagEditor: React.FC<HeadTagEditorProps> = ({
  googleAnalyticsId,
  appliedTheme,
}) => {
  const title = 'Chethiya Galkaduwa | Portfolio';
  const description = 'Ph.D. researcher, software engineer, and AI enthusiast – building smart systems and solving real-world problems.';
  const siteUrl = 'https://chethiyagalkaduwa.github.io';
  const imageUrl = `${siteUrl}/preview.png`; // Make sure preview.png exists in public/

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Theme color */}
      <meta
        name="theme-color"
        content={isDarkishTheme(appliedTheme) ? '#000000' : '#ffffff'}
      />

      {/* Open Graph Meta (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card Meta */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Favicon (optional) */}
      <link rel="icon" href="/favicon.ico" />

      {/* Google Analytics */}
      {googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          ></script>
          <script>
            {`window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');
`}
          </script>
        </>
      )}
    </Helmet>
  );
};

export default HeadTagEditor;
