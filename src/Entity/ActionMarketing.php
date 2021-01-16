<?php

namespace App\Entity;

use App\Repository\ActionMarketingRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ActionMarketingRepository::class)
 */
class ActionMarketing
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;



    /**
     * @ORM\ManyToOne(targetEntity=Task::class, inversedBy="actionMarketings")
     */
    private $task;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $nomAction;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $impact;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $level;

    public function getId(): ?int
    {
        return $this->id;
    }



    public function getTask(): ?Task
    {
        return $this->task;
    }

    public function setTask(?Task $task): self
    {
        $this->task = $task;

        return $this;
    }

    public function getNomAction(): ?string
    {
        return $this->nomAction;
    }

    public function setNomAction(?string $nomAction): self
    {
        $this->nomAction = $nomAction;

        return $this;
    }

    public function getImpact(): ?int
    {
        return $this->impact;
    }

    public function setImpact(?int $impact): self
    {
        $this->impact = $impact;

        return $this;
    }

    public function getLevel(): ?string
    {
        return $this->level;
    }

    public function setLevel(?string $level): self
    {
        $this->level = $level;

        return $this;
    }

    public function __toString()
    {
       return strval($this->nomAction);
    }

}
