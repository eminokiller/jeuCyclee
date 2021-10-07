<?php

namespace App\Repository;

use App\Entity\Campagne;
use App\Entity\Equipe;
use App\Entity\GameSession;
use App\Entity\Joueur;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Query\Expr\Join;

/**
 * @method GameSession|null find($id, $lockMode = null, $lockVersion = null)
 * @method GameSession|null findOneBy(array $criteria, array $orderBy = null)
 * @method GameSession[]    findAll()
 * @method GameSession[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameSessionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GameSession::class);
    }

    public function getBestScoreBySession(GameSession $gameSession)
    {
        return $this->createQueryBuilder('gameSession')
            ->select('AVG(joueur.score) as moyenneScore, equipe.id')
            ->join(Campagne::class, 'campagne', Join::WITH, 'campagne.session = gameSession.id')
            ->join('campagne.equipes', 'equipe')
            ->join(Joueur::class, 'joueur', Join::WITH, 'joueur.equipe = equipe.id')
            ->where('campagne.session = :gameSession')
            ->setParameter('gameSession', $gameSession)
            ->setMaxResults(1)
            ->orderBy('moyenneScore', 'DESC')
            ->groupBy('joueur.equipe')
            ->getQuery()
            ->getArrayResult()
        ;
    }

    public function getThreeBestScoreBySession(GameSession $gameSession)
    {
        return $this->createQueryBuilder('gameSession')
            ->select('AVG(joueur.score) as moyenneScore, joueur.id')
            ->join(Campagne::class, 'campagne', Join::WITH, 'campagne.session = gameSession.id')
            ->join('campagne.equipes', 'equipe')
            ->join(Joueur::class, 'joueur', Join::WITH, 'joueur.equipe = equipe.id')
            ->where('campagne.session = :gameSession')
            ->setParameter('gameSession', $gameSession)
            ->setMaxResults(3)
            ->orderBy('moyenneScore', 'DESC')
            ->groupBy('joueur.equipe')
            ->groupBy('joueur.id')
            ->getQuery()
            ->getArrayResult();

    }

    public function getAllScoresBySession(GameSession $gameSession)
    {
        return $this->createQueryBuilder('gameSession')
            ->select('AVG(joueur.score) as moyenneScore, equipe.id')
            ->join(Campagne::class, 'campagne', Join::WITH, 'campagne.session = gameSession.id')
            ->join('campagne.equipes', 'equipe')
            ->join(Joueur::class, 'joueur', Join::WITH, 'joueur.equipe = equipe.id')
            ->where('campagne.session = :gameSession')
            ->setParameter('gameSession', $gameSession)
            ->orderBy('moyenneScore', 'DESC')
            ->groupBy('joueur.equipe')
            ->getQuery()
            ->getArrayResult()
            ;

    }

    // /**
    //  * @return GameSession[] Returns an array of GameSession objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?GameSession
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
