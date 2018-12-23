const academicProjectsData = [
    {
        title: 'Econometric Theory',
        projects: [
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/metric_2.pdf',
                description: '<p>The price observations data on two firms GE and WE are provided.</p>' +
                '<p>1. Estimate two separate regressions by OLS for WE and GE and next estimate the SUR model for the two firms by feasible GLS. Comment on the differences between the two estimators.</p>' +
                '<p>2. Test the null hypothesis that the errors are uncorrelated across the equations (i.e errors of WE are uncorrelated with errors of GE) H0 : &sigma;12 = 0</p>' +
                '<p>3. Test the null hypothesis that jointly the coefficients of both equations are identical H0 : {&beta;11 = &beta;21, &beta;12 = &beta;22, &beta;13 = &beta;23}</p>' +
                '<p>4. Estimate the SUR model with a block-diagonal variance matrix by feasible GLS and compare the results to the outcome of separate OLS regressions in 1. </p>' +
                '<p>5. Estimate the SUR model by feasible GLS under the restriction that all coefficients are identical. Compare the outcome of the joint test in 4 to the outcome of separate tests: H01 : &beta;11 = &beta;21, H02 : &beta;12 = &beta;22, H03 : &beta;13 = &beta;23.</p>' +
                '<p>6. Compare the outcomes of the two "proc print" commands in the code. What are the differences between the data matrices in the SUR and panel formats?</p>' +
                '<p>7. What model is estimated in the last part of the output: a fixed-effect model or a pooled regression? Justify your response by considering the test of fixed effects and the estimation outcome.</p>'
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/metric_3.pdf',
                description: '<p>Examine the return series from file byd.dat. </p>' +
                '<p>1. Plot the data and comment of the pattern of the returns and their volatility.</p>' +
                '<p>2. Discuss the summary statistics.</p>' +
                '<p>3. Are the returns normally distributed? Comment on the outcomes of the normality tests, the histogram and the Q-Q plot.</p>' +
                '<p>4. Estimate the mean of returns by OLS and name the residuals ehat and save them.</p>' +
                '<p>5. Perform the LM test for the ARCH effects.</p>' +
                '<p>6. Estimate an ARCH(1) model, write the formula of the model, comment on the significance of the coefficients and the fit of the model. Plot the fitted volatility.</p>' +
                '<p>7. Estimate an GARCH(1,1) model, write the formula of the model, comment on the significance of the coefficients and the fit of the model. Plot the fitted volatility.</p>' +
                '<p>8. Build a "bad news indicator" variable that takes value 1 if the ehat variable from the OLS regression is negative. Next, formulate a TARCH(1,1) model and estimate that model. Comment on the significance of the coefficients. Plot the fitted volatility</p>' +
                '<p>9. Estimate an GARCH-M(1,1) model, write the formula of the model, comment on the significance of the coefficients and the fit of the model. Plot the fitted volatility.</p>'
            }
        ]
    },
    {
        title: 'Empirical International Trade',
        projects: [
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/trade_1.pdf',
                description: '<p>In this project, we were trying to replicate and discuss the research <i>Do We Really Know That the WTO Increases Trade?</i> by <strong>Andrew K. Rose</strong> with the data collected from worldbank.org </p>' +
                '<p>This paper was published on <i>American Economic Review</i> in 2004, and was cited more than a thousand times. It was so famous because Dr. Rose didn\'t consider the fixed effect in panel data regressions and drew a conclusion that "WTO does not promote trade".</p>' +
                '<p>Emm...Just about 15 years ago...Economics...</p>'
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/trade_2.pdf',
                description: '<p>In this project, we conducted 3 researches by using firm-level data: </p>' +
                '<p>1. There are only a minor fraction of manufacturing firms that export, and their export volume is only a minor fraction of total output.</p>' +
                '<p>2. Exporting firms are better than non-exporting firms in many ways.</p>' +
                '<p>3. Is it better firms become exporters or exporting makes firms better?</p>'
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/trade_3.pdf',
                description: '<p>This project is based on 2 neoclassical trade theories: </p>' +
                '<p>Ricardian model predicts that a country will export one good if it has comparative advantage on producing that good, and comparative advantage is due to difference in production technology. </p>' +
                '<p>Heckscher-Ohlin model states that for a production factor, countries vary in factor endowment thus affecting factor supply, industries vary in factor intensity thus affecting factor demand</p>' +
                '<p>Conventional production factors (labor and capital) are well discussed, therefore in this project we examined the factors of age-dependent skills, such as arm hand steadiness.</p>'
            }
        ]
    },
    {
        title: 'North American Economic History',
        projects: [
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/history.pdf',
                description: '<p>We saw a declining fertility rates since the era of industrialization. </p>' +
                '<p>In agriculture economic, household tended to have more children to increase productivity. Industrialization promoted productivity at household level therefore fewer children are needed, which led to declining fertility rates.</p>'
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/history_presentation.pdf',
                description: '<p>This is the presentation slide prepared for paper study: </p>' +
                '<p>"Industrialization and Fertility in the Nineteenth Century: Evidence from South Carolina." Marianne Wanamaker (2012).</p>'
            }
        ]
    },
    {
        title: 'Stochastic Processes',
        projects: [
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/6602_2.pdf',
                description: ''
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/6602_3.pdf',
                description: ''
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/6602_4.pdf',
                description: ''
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/6602_5.pdf',
                description: ''
            }
        ]
    },
    {
        title: 'Applied Macroeconomics',
        projects: [
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/macro.pdf',
                description: '<p>Ramsey-Cass-Koopmans model practices.</p>'
            }
        ]
    },
    {
        title: 'Machine Learning',
        projects: [
            {
                link: '',
                description: '<p>working in progress</p>'
            }
        ]
    }
]

export default academicProjectsData;