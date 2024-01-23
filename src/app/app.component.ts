import { IButton, ISerie } from './interfaces/interfaces';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { envSeries } from './enviroment/enviroment_series';
import { envRoot } from './enviroment/enviroment';
import axios from 'axios';
import * as cheerio from 'cheerio';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  Days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  SitieByTester = new FormControl('', Validators.required);
  SeriesCollection: ISerie[] = [];
  AnswerSitie: IButton = {
    class: '',
    visible: false,
    text: '',
  };
  Proccesing: boolean = false;
  ImgDefault: string = 'assets/img/img-default.jpg';

  ngOnInit(): void {
    this.chargeData();
  }

  /**
   * Clear field from tested URL
   */
  clearURL(): void {
    this.SitieByTester.reset();
    this.AnswerSitie.visible = false;
  }

  /**
   * Test URL inserted in field
   */
  testerURL(): void {
    let sitie = this.SitieByTester.value;
    if (sitie) {
      this.Proccesing = true;
      const context = axios.get(sitie);
      context
        .then(() => {
          this.AnswerSitie = {
            class: 'bg-success',
            text: 'Conexion establecida!',
            visible: true,
          };
        })
        .catch((err) => {
          this.AnswerSitie = {
            class: 'bg-danger',
            text: err.message,
            visible: true,
          };
        })
        .finally(() => {
          this.Proccesing = false;
          setTimeout(() => {
            this.AnswerSitie.visible = false;
          }, 5000);
        });
    }
  }

  /**
   * Load saved JSON elements as an example
   */
  async chargeData() {
    const srcBDD = await fetch('assets/file_json/bdd.json');
    const dataStorage: ISerie[] = await srcBDD.json();
    this.SeriesCollection = dataStorage;
  }

  /**
   * Search for series with registered URL
   */
  async searchSeries() {
    this.SeriesCollection = [];
    let UrlSeries = envSeries;
    for (let info of UrlSeries) {
      const context = await axios.get(info.url);
      const $ = cheerio.load(context.data);
      let serie: any = null;
      if (info.url.includes('cuevana')) {
        serie = this.buildFormatCuevana($, info.color);
      } else if (info.url.includes('animeonline')) {
        serie = this.buildFormatAnimeNinja($, info.color);
      }
      this.SeriesCollection.push(serie);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  /**
   * Construction of logic-based elements for Cuevana.
   * @param $ context<axios>
   * @param color #748987
   * @returns {
   *  name: titleName,
   *  totalChapter: allChapter,
   *  description: [],
   *  color: color,
   * }
   */
  buildFormatCuevana($: cheerio.CheerioAPI, color: string): ISerie {
    const titleName = $('header .Title').text();
    const allChapter = $('.tvshow > p').eq(1).find('span').text();
    const serie: ISerie = {
      name: titleName,
      totalChapter: allChapter,
      description: [],
      color: color,
    };
    for (let i = 0; i < 5; i++) {
      const element = $('section > ul > li').eq(i);
      const chapter = <string>element.find('h2').text();
      const image = <string>element.find('img').attr('src');
      const link = <string>element.find('a').attr('href');
      const day = new Date(element.find('p').text()).getDay();
      serie.description.push({
        chapter: this.getChapter(chapter),
        image: !(image.indexOf('data:image') > 1) ? image : this.ImgDefault,
        link: `${envRoot.UrlBaseCuevana}${link}`,
        day: this.Days[day],
      });
    }
    return serie;
  }

  /**
   * Construction of logic-based elements for Anime Online Ninja.
   * @param $ context<axios>
   * @param color #748987
   * @returns {
   *  name: titleName,
   *  totalChapter: allChapter,
   *  description: [],
   *  color: color,
   * }
   */
  buildFormatAnimeNinja($: cheerio.CheerioAPI, color: string): ISerie {
    const titleName = $('.sheader .data h1').text();
    const allChapter = $('#seasons .se-c .se-a > ul > li').length;
    const serie: ISerie = {
      name: titleName,
      totalChapter: allChapter.toString(),
      description: [],
      color: color,
    };
    for (let i = allChapter; i > allChapter - 5; i--) {
      const element = $('#seasons .se-c .se-a > ul > li').eq(i);
      if (element.html()) {
        const chapter = <string>element.find('.numerando').text();
        const image = <string>element.find('img').attr('src');
        const link = <string>element.find('.episodiotitle a').attr('href');
        const day = new Date(
          element.find('.episodiotitle .date').text()
        ).getDay();
        serie.description.push({
          chapter: chapter,
          image: image ? image : '',
          link: link,
          day: this.Days[day],
        });
      }
    }
    return serie;
  }

  /**
   * Extract the full name and return only the episode and season.
   * @param chapter EpisodioName 1x5
   * @returns 0 - 0
   */
  getChapter(chapter: string): string {
    let match = chapter.match(/(\d+)x(\d+)/);
    let result = '0 - 0';
    if (match) result = match[0].toString().replace('x', ' - ');
    return result;
  }

  /*
    Add logic depending on the site and its structure.
    ...
  */
}
