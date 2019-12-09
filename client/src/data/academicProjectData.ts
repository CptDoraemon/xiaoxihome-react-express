export interface AcademicProject {
    title: string;
    projects: Array<AcademicProjectSubProjects>

}

export interface AcademicProjectSubProjects {
    link: string;
    description: string;
}

const academicProjectsData: Array<AcademicProject> = [
    {
        title: 'Econometric Theory',
        projects: [
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/metric_2.pdf',
                description: `The price observations data on two firms GE and WE are provided. \n
                1. Estimate two separate regressions by OLS for WE and GE and next estimate the SUR model for the two firms by feasible GLS. Comment on the differences between the two estimators. \n
                2. Test the null hypothesis that the errors are uncorrelated across the equations (i.e errors of WE are uncorrelated with errors of GE) H0 : &sigma;12 = 0 \n
                3. Test the null hypothesis that jointly the coefficients of both equations are identical H0 : {&beta;11 = &beta;21, &beta;12 = &beta;22, &beta;13 = &beta;23} \n
                4. Estimate the SUR model with a block-diagonal variance matrix by feasible GLS and compare the results to the outcome of separate OLS regressions in 1. \n
                5. Estimate the SUR model by feasible GLS under the restriction that all coefficients are identical. Compare the outcome of the joint test in 4 to the outcome of separate tests: H01 : &beta;11 = &beta;21, H02 : &beta;12 = &beta;22, H03 : &beta;13 = &beta;23. \n
                6. Compare the outcomes of the two "proc print" commands in the code. What are the differences between the data matrices in the SUR and panel formats? \n
                7. What model is estimated in the last part of the output: a fixed-effect model or a pooled regression? Justify your response by considering the test of fixed effects and the estimation outcome. `
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/metric_3.pdf',
                description: `Examine the return series from file byd.dat.
                1. Plot the data and comment of the pattern of the returns and their volatility.
                2. Discuss the summary statistics.
                3. Are the returns normally distributed? Comment on the outcomes of the normality tests, the histogram and the Q-Q plot. \n
                4. Estimate the mean of returns by OLS and name the residuals ehat and save them. \n
                5. Perform the LM test for the ARCH effects. \n
                6. Estimate an ARCH(1) model, write the formula of the model, comment on the significance of the coefficients and the fit of the model. Plot the fitted volatility. \n
                7. Estimate an GARCH(1,1) model, write the formula of the model, comment on the significance of the coefficients and the fit of the model. Plot the fitted volatility. \n
                8. Build a "bad news indicator" variable that takes value 1 if the ehat variable from the OLS regression is negative. Next, formulate a TARCH(1,1) model and estimate that model. Comment on the significance of the coefficients. Plot the fitted volatility. \n
                9. Estimate an GARCH-M(1,1) model, write the formula of the model, comment on the significance of the coefficients and the fit of the model. Plot the fitted volatility. `
            }
        ]
    },
    {
        title: 'Empirical International Trade',
        projects: [
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/trade_1.pdf',
                description: `In this project, we were trying to replicate and discuss the research Do We Really Know That the WTO Increases Trade? by Andrew K. Rose with the data collected from worldbank.org \n
                This paper was published on American Economic Review in 2004, and was cited more than a thousand times. It was so famous because Dr. Rose didn't consider the fixed effect in panel data regressions and drew a conclusion that "WTO does not promote trade". \n
                Emm...Just about 15 years ago...Economics... `
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/trade_2.pdf',
                description: `In this project, we conducted 3 researches by using firm-level data: \n
                1. There are only a minor fraction of manufacturing firms that export, and their export volume is only a minor fraction of total output. \n
                2. Exporting firms are better than non-exporting firms in many ways. \n
                3. Is it better firms become exporters or exporting makes firms better?`
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/trade_3.pdf',
                description: `This project is based on 2 neoclassical trade theories: \n
                Ricardian model predicts that a country will export one good if it has comparative advantage on producing that good, and comparative advantage is due to difference in production technology. \n
                Heckscher-Ohlin model states that for a production factor, countries vary in factor endowment thus affecting factor supply, industries vary in factor intensity thus affecting factor demand\n
                Conventional production factors (labor and capital) are well discussed, therefore in this project we examined the factors of age-dependent skills, such as arm hand steadiness. `
            }
        ]
    },
    {
        title: 'North American Economic History',
        projects: [
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/history.pdf',
                description: `We saw a declining fertility rates since the era of industrialization. \n
                In agriculture economic, household tended to have more children to increase productivity. Industrialization promoted productivity at household level therefore fewer children are needed, which led to declining fertility rates.`
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/history_presentation.pdf',
                description: `This is the presentation slide prepared for paper study: \n
                "Industrialization and Fertility in the Nineteenth Century: Evidence from South Carolina." Marianne Wanamaker (2012). `
            }
        ]
    },
    {
        title: 'Stochastic Processes',
        projects: [
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/6602_2.pdf',
                description: 'Assignment 2'
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/6602_3.pdf',
                description: 'Assignment 3'
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/6602_4.pdf',
                description: 'Assignment 4'
            },
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/6602_5.pdf',
                description: 'Assignment 5'
            }
        ]
    },
    {
        title: 'Applied Macroeconomics',
        projects: [
            {
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/projects/macro.pdf',
                description: `Ramsey-Cass-Koopmans model practices. `
            }
        ]
    },
    {
        title: 'Machine Learning',
        projects: [
            {
                link: '',
                description: `working in progress`
            }
        ]
    }
];

export default academicProjectsData;